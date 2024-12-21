package com.setvect.bokslhome.util

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.password.PasswordEncoder

@SpringBootTest
class GeneratorPasswdTest {
    @Autowired
    private lateinit var passwordEncoder: PasswordEncoder

    @Test
    fun `비밀번호 생성`() {
        val password = "1234"
        val encodedPassword = passwordEncoder.encode(password)
        println(encodedPassword)
    }
}
