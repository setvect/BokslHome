package com.setvect.bokslhome.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig {
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .authorizeHttpRequests {
                it.requestMatchers("/api/login").permitAll()
                it.anyRequest().permitAll()  // URL 기반 권한체크는 하지 않음
            }
            .formLogin {
                it.loginProcessingUrl("/api/login")
                it.usernameParameter("username")
                it.passwordParameter("password")
                it.successHandler { _, response, _ ->
                    response.contentType = "application/json"
                    response.characterEncoding = "UTF-8"
                    response.writer.write("{\"message\": \"로그인 성공\"}")
                }
                it.failureHandler { _, response, _ ->
                    response.contentType = "application/json"
                    response.characterEncoding = "UTF-8"
                    response.status = HttpStatus.UNAUTHORIZED.value()
                    response.writer.write("{\"message\": \"로그인 실패\"}")
                }
            }

        return http.build()
    }
}
