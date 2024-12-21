package com.setvect.bokslhome.app.user.controller

import com.setvect.bokslhome.util.JwtUtil
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

data class LoginRequest(val username: String, val password: String)
data class LoginResponse(val token: String)

@RestController
class LoginController(private val jwtUtil: JwtUtil) {
    private val hardcodedUsername = "admin"
    private val hardcodedPassword = "password"

    @PostMapping("/api/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<Any> {
        return if (request.username == hardcodedUsername && request.password == hardcodedPassword) {
            val token = jwtUtil.generateToken(request.username)
            ResponseEntity(LoginResponse(token), HttpStatus.OK)
        } else {
            ResponseEntity(mapOf("message" to "로그인 실패"), HttpStatus.UNAUTHORIZED)
        }
    }
}
