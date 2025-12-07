package com.setvect.bokslhome.filter

import com.setvect.bokslhome.config.BokslProperties
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.util.ContentCachingRequestWrapper
import org.springframework.web.util.ContentCachingResponseWrapper

@Component
class LoggingFilter(private val bokslProperties: BokslProperties) : OncePerRequestFilter() {
    private val log = LoggerFactory.getLogger(javaClass)

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        if (!bokslProperties.httpLogging) {
            filterChain.doFilter(request, response)
            return
        }

        val isSensitivePath = request.requestURI.startsWith("/api/login")

        // Multipart 요청은 로깅 스킵
        if (request.contentType?.startsWith("multipart/") == true) {
            filterChain.doFilter(request, response)
            return
        }

        val cachedRequest = ContentCachingRequestWrapper(request)
        val responseWrapper = ContentCachingResponseWrapper(response)

        try {
            filterChain.doFilter(cachedRequest, responseWrapper)
            logRequest(cachedRequest, isSensitivePath)
            logResponse(responseWrapper)
        } finally {
            // 래핑된 응답을 실제 응답으로 복사
            responseWrapper.copyBodyToResponse()
        }
    }

    private fun logRequest(request: ContentCachingRequestWrapper, isSensitivePath: Boolean) {
        try {
            val method = request.method
            val uri = request.requestURI
            val query = request.queryString
            val body = if (isSensitivePath) {
                "SKIPPED(body contains credentials)"
            } else {
                request.contentAsByteArray.let {
                    if (it.isNotEmpty()) String(it, Charsets.UTF_8) else "EMPTY BODY"
                }
            }

            log.info("Request: $method $uri${if (query != null) "?$query" else ""}")
            if (body.isNotBlank()) {
                log.info("Request Body: $body")
            }
        } catch (e: Exception) {
            log.warn("Failed to log request: ${e.message}", e)
        }
    }

    private fun logResponse(response: ContentCachingResponseWrapper) {
        try {
            val contentType = response.contentType ?: ""
            val status = response.status
            val bytes = response.contentAsByteArray

            val isTextLike = contentType.startsWith("text/") ||
                contentType.contains("json", ignoreCase = true) ||
                contentType.contains("xml", ignoreCase = true) ||
                contentType.contains("html", ignoreCase = true) ||
                contentType.contains("plain", ignoreCase = true)

            val maxLogBytes = 5_000

            if (!isTextLike) {
                log.info("Response: status=$status, contentType=$contentType, body=SKIPPED(binary, ${bytes.size} bytes)")
                return
            }

            val responseBody = bytes.let {
                if (it.isNotEmpty()) {
                    val truncated = if (it.size > maxLogBytes) it.copyOfRange(0, maxLogBytes) else it
                    val suffix = if (it.size > maxLogBytes) "...(truncated)" else ""
                    "${String(truncated, Charsets.UTF_8)}$suffix"
                } else {
                    "EMPTY BODY"
                }
            }

            log.info("Response: status=$status, contentType=$contentType, body=$responseBody")
        } catch (e: Exception) {
            log.warn("Failed to log response: ${e.message}", e)
        }
    }
}
