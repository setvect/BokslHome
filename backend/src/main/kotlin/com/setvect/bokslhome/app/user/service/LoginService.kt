package com.setvect.bokslhome.app.user.service

import com.setvect.bokslhome.app.user.exception.UserGuideException
import com.setvect.bokslhome.app.user.repository.UserRepository
import com.setvect.bokslhome.util.JwtUtil
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class LoginService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtUtil: JwtUtil,
) {
    fun authenticate(username: String, password: String): String {
        val user = userRepository.findByUserId(username) ?: throw UserGuideException("로그인 실패")

        return if (passwordEncoder.matches(password, user.password)) {
            jwtUtil.generateToken(username)
        } else {
            throw UserGuideException("로그인 실패")
        }
    }
}
