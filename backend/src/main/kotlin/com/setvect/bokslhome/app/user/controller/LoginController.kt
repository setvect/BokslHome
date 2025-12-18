package com.setvect.bokslhome.app.user.controller

import com.setvect.bokslhome.app.user.service.LoginService
import com.setvect.bokslhome.config.BokslProperties
import jakarta.servlet.http.HttpServletRequest
import java.time.Duration
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseCookie
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

data class LoginRequest(val username: String, val password: String) {
    constructor() : this("", "")
}

data class LoginResponse(val token: String)
data class AuthStatusResponse(val authenticated: Boolean = true)

@RestController
class LoginController(
    private val loginService: LoginService,
    private val bokslProperties: BokslProperties,
) {
    @PostMapping("/api/login")
    fun login(@RequestBody request: LoginRequest, httpRequest: HttpServletRequest): ResponseEntity<LoginResponse> {
        val token = loginService.authenticate(request.username, request.password)

        val cookie = ResponseCookie.from("auth_token", token)
            .httpOnly(true)
            .secure(isSecureRequest(httpRequest))
            .sameSite("Lax")
            .path("/")
            .maxAge(Duration.ofMillis(bokslProperties.jwt.expirationTime))
            .build()

        return ResponseEntity
            .status(HttpStatus.OK)
            .header("Set-Cookie", cookie.toString())
            .body(LoginResponse(token))
    }

    @PostMapping("/api/logout")
    fun logout(httpRequest: HttpServletRequest): ResponseEntity<Void> {
        val cookie = ResponseCookie.from("auth_token", "")
            .httpOnly(true)
            .secure(isSecureRequest(httpRequest))
            .sameSite("Lax")
            .path("/")
            .maxAge(0)
            .build()

        return ResponseEntity
            .noContent()
            .header("Set-Cookie", cookie.toString())
            .build()
    }

    @GetMapping("/api/auth/me")
    fun me(): ResponseEntity<AuthStatusResponse> {
        return ResponseEntity.ok(AuthStatusResponse())
    }

    private fun isSecureRequest(request: HttpServletRequest): Boolean {
        if (request.isSecure) return true
        val forwardedProto = request.getHeader("X-Forwarded-Proto")
        return forwardedProto != null && forwardedProto.equals("https", ignoreCase = true)
    }
}
