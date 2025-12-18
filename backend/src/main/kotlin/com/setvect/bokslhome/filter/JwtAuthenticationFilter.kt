package com.setvect.bokslhome.filter

import com.setvect.bokslhome.app.user.service.UserService
import com.setvect.bokslhome.util.JwtUtil
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val jwtUtil: JwtUtil,
    private val userService: UserService
) : OncePerRequestFilter() {
    private val log = LoggerFactory.getLogger(javaClass)

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        val token = extractToken(request)

        if (token != null) {
            val userId = jwtUtil.getUserIdFromToken(token)
            if (userId != null) {
                val user = userService.getUser(userId)
                val authorities = user.role.map { SimpleGrantedAuthority(it.name) }

                val userDetails = org.springframework.security.core.userdetails.User
                    .withUsername(user.userId)
                    .authorities(authorities)
                    .password("")
                    .build()

                val authentication = UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    authorities
                )

                SecurityContextHolder.getContext().authentication = authentication
            }
        }

        filterChain.doFilter(request, response)
    }

    private fun extractToken(request: HttpServletRequest): String? {
        val bearerToken = request.getHeader("Authorization")
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7)
        }

        val cookieToken = request.cookies
            ?.firstOrNull { it.name == "auth_token" }
            ?.value
            ?.takeIf { it.isNotBlank() }

        return cookieToken
    }
}
