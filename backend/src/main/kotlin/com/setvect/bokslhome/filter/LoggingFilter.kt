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

        // Multipart 요청 로깅 비활성화
        if (request.contentType?.startsWith("multipart/") == true) {
            filterChain.doFilter(request, response)
            return
        }

        val cachedRequest = ContentCachingRequestWrapper(request)
        val responseWrapper = ContentCachingResponseWrapper(response)

        try {
            filterChain.doFilter(cachedRequest, responseWrapper)
            logRequest(cachedRequest)
            logResponse(responseWrapper)
        } finally {
            // 반드시 응답 데이터를 클라이언트에 복사
            responseWrapper.copyBodyToResponse()
        }
    }

    private fun logRequest(request: ContentCachingRequestWrapper) {
        try {
            val method = request.method
            val uri = request.requestURI
            val query = request.queryString
            val body = request.contentAsByteArray.let {
                if (it.isNotEmpty()) String(it, Charsets.UTF_8) else "EMPTY BODY"
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
            val responseBody = response.contentAsByteArray.let {
                if (it.isNotEmpty()) String(it, Charsets.UTF_8) else "EMPTY BODY"
            }

            log.info("Response: $responseBody")
        } catch (e: Exception) {
            log.warn("Failed to log response: ${e.message}", e)
        }
    }
}
