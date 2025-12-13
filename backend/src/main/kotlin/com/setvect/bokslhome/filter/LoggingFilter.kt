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
            val size = response.contentAsByteArray.size

            // Body 로깅을 막고 상태/타입/크기만 남긴다.
            log.info("Response: status=$status, contentType=$contentType, size=${size}bytes")
        } catch (e: Exception) {
            log.warn("Failed to log response: ${e.message}", e)
        }
    }
}
