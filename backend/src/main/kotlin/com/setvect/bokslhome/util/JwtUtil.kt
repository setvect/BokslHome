package com.setvect.bokslhome.util

import com.setvect.bokslhome.config.BokslProperties
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.security.Key
import java.util.Date
import javax.crypto.spec.SecretKeySpec
import org.springframework.stereotype.Component

@Component
class JwtUtil(
    private val bokslProperties: BokslProperties
) {
    private val key: Key = SecretKeySpec(bokslProperties.jwt.secretKey.toByteArray(), SignatureAlgorithm.HS512.jcaName)

    fun generateToken(userId: String): String {
        val encryptedUserId = AesGcmEncrypt.encrypt(userId, bokslProperties.jwt.encryptionKey)

        return Jwts.builder()
            .setSubject(encryptedUserId)
            .setIssuer(bokslProperties.jwt.issuer)
            .setAudience(bokslProperties.jwt.audience)
            .setIssuedAt(Date())
            .setNotBefore(Date())
            .setExpiration(Date(System.currentTimeMillis() + bokslProperties.jwt.expirationTime))
            .signWith(key)
            .compact()
    }

    fun getUserIdFromToken(token: String): String? {
        return try {
            val claims = parseToken(token)
            claims?.subject?.let { AesGcmEncrypt.decrypt(it, bokslProperties.jwt.encryptionKey) }
        } catch (e: Exception) {
            null
        }
    }

    fun parseToken(token: String): Claims? {
        return try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .setAllowedClockSkewSeconds(bokslProperties.jwt.clockSkewSeconds)
                .requireIssuer(bokslProperties.jwt.issuer)
                .requireAudience(bokslProperties.jwt.audience)
                .build()
                .parseClaimsJws(token)
                .body
        } catch (e: Exception) {
            null
        }
    }
}
