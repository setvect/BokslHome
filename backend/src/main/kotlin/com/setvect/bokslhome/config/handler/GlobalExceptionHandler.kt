package com.setvect.bokslhome.config.handler

import com.setvect.bokslhome.app.user.exception.UserGuideException
import jakarta.validation.ConstraintViolationException
import java.time.LocalDateTime
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

@RestControllerAdvice
class GlobalExceptionHandler {
    private val log = LoggerFactory.getLogger(javaClass)

    @ExceptionHandler(UserGuideException::class)
    fun handleAuthenticationException(ex: UserGuideException): ResponseEntity<ErrorResponse> {
        log.warn("AuthenticationException 발생", ex)
        val errorResponse = ErrorResponse(
            timestamp = LocalDateTime.now(),
            status = ex.code.httpStatus.value(),
            error = ex.code.httpStatus.reasonPhrase,
            message = ex.message,
            path = getCurrentRequestPath()
        )
        return ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(Exception::class)
    fun handleAllExceptions(ex: Exception): ResponseEntity<ErrorResponse> {
        log.error("Exception 발생: ${ex.message}", ex)
        val errorResponse = ErrorResponse(
            timestamp = LocalDateTime.now(),
            status = HttpStatus.INTERNAL_SERVER_ERROR.value(),
            error = HttpStatus.INTERNAL_SERVER_ERROR.reasonPhrase,
            message = "서버 오류가 발생했습니다",
            path = getCurrentRequestPath()
        )
        return ResponseEntity(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR)
    }


    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationException(ex: MethodArgumentNotValidException): ResponseEntity<ErrorResponse> {
        log.warn("Validation 실패", ex)

        val fieldErrors = ex.bindingResult.fieldErrors.joinToString(", ") {
            "${it.field}: ${it.defaultMessage}"
        }

        val errorResponse = ErrorResponse(
            timestamp = LocalDateTime.now(),
            status = HttpStatus.BAD_REQUEST.value(),
            error = HttpStatus.BAD_REQUEST.reasonPhrase,
            message = "유효성 검사 실패: $fieldErrors",
            path = getCurrentRequestPath()
        )
        return ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(ConstraintViolationException::class)
    fun handleConstraintViolationException(ex: ConstraintViolationException): ResponseEntity<ErrorResponse> {
        log.warn("ConstraintViolationException 발생", ex)

        val violations = ex.constraintViolations.joinToString(", ") {
            "${it.propertyPath}: ${it.message}"
        }

        val errorResponse = ErrorResponse(
            timestamp = LocalDateTime.now(),
            status = HttpStatus.BAD_REQUEST.value(),
            error = HttpStatus.BAD_REQUEST.reasonPhrase,
            message = "제약 조건 위반: $violations",
            path = getCurrentRequestPath()
        )
        return ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST)
    }

    private fun getCurrentRequestPath(): String {
        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
        return request.requestURI
    }
}

data class ErrorResponse(
    val timestamp: LocalDateTime,
    val status: Int,
    val error: String,
    val message: String,
    val path: String
)
