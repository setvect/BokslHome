package com.setvect.bokslhome.util

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.security.Key
import java.util.Date
import javax.crypto.spec.SecretKeySpec

object JwtUtil {
    private const val SECRET_KEY = "vR3ck9ZwXy1aB2cD4eF5gH7iJ8kL0mN3pQ6sT8uV2wY4z"
    private const val EXPIRATION_TIME = 86400000 // 1 day in milliseconds
    private val key: Key = SecretKeySpec(SECRET_KEY.toByteArray(), SignatureAlgorithm.HS512.jcaName)

    fun generateToken(username: String): String {
        return Jwts.builder()
            .setSubject(username)
            .setExpiration(Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(key)
            .compact()
    }

    fun parseToken(token: String): Claims? {
        return try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
        } catch (e: Exception) {
            null
        }
    }
}
