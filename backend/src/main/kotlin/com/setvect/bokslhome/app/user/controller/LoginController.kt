package com.setvect.bokslhome.app.user.controller

import com.setvect.bokslhome.app.user.model.UserInfo
import com.setvect.bokslhome.app.user.service.LoginService
import com.setvect.bokslhome.app.user.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

data class LoginRequest(val username: String, val password: String) {
    constructor() : this("", "")
}

data class LoginResponse(val token: String)

@RestController
class LoginController(
    private val loginService: LoginService,
    private val userService: UserService
) {
    @PostMapping("/api/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<LoginResponse> {
        val token = loginService.authenticate(request.username, request.password)
        return ResponseEntity(LoginResponse(token), HttpStatus.OK)
    }

    @GetMapping("/api/auth/me")
    fun me(@AuthenticationPrincipal user: UserDetails): ResponseEntity<UserInfo> {
        val userInfo = userService.getUser(user.username)
        return ResponseEntity.ok(userInfo)
    }
}
