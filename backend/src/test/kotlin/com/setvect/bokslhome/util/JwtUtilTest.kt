package com.setvect.bokslhome.util

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class JwtUtilTest {
    @Autowired
    private lateinit var jwtUtil: JwtUtil

    @Test
    fun `토큰 생성 및 파싱 테스트`() {
        // given
        val userId = "myid"

        // when
        val token = jwtUtil.generateToken(userId)
        val claims = jwtUtil.parseToken(token)

        // then
        assertThat(token).isNotNull()
        assertThat(claims).isNotNull()
        claims?.let { actualClaims ->
            assertThat(actualClaims.subject).isNotNull()
            assertThat(actualClaims.expiration).isNotNull()
        }
    }

    @Test
    fun `토큰 아이디 파싱 테스트`() {
        // given
        val userId = "myid"
        val token = jwtUtil.generateToken(userId)

        // when
        val userIdFromToken = jwtUtil.getUserIdFromToken(token)

        // then
        assertThat(userId).isEqualTo(userIdFromToken)
    }
}
