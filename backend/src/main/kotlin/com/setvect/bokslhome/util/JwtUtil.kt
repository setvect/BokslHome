package com.setvect.bokslhome.util

import com.setvect.bokslhome.config.BokslProperties
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.security.Key
import java.util.Base64
import java.util.Date
import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec
import org.springframework.stereotype.Component

@Component
class JwtUtil(
    private val bokslProperties: BokslProperties
) {
    private val key: Key = SecretKeySpec(bokslProperties.jwt.secretKey.toByteArray(), SignatureAlgorithm.HS512.jcaName)
    private val encryptionKeySpec = SecretKeySpec(bokslProperties.jwt.encryptionKey.toByteArray(), "AES")

    fun generateToken(userId: String): String {
        val encryptedUserId = encryptUserId(userId)

        return Jwts.builder()
            .setSubject(encryptedUserId)
            .setExpiration(Date(System.currentTimeMillis() + bokslProperties.jwt.expirationTime))
            .signWith(key)
            .compact()
    }

    private fun encryptUserId(userId: String): String {
        val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
        cipher.init(Cipher.ENCRYPT_MODE, encryptionKeySpec)
        val encryptedBytes = cipher.doFinal(userId.toByteArray())
        return Base64.getEncoder().encodeToString(encryptedBytes)
    }

    private fun decryptUserId(encryptedUserId: String): String {
        val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
        cipher.init(Cipher.DECRYPT_MODE, encryptionKeySpec)
        val decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedUserId))
        return String(decryptedBytes)
    }

    fun getUserIdFromToken(token: String): String? {
        return try {
            val claims = parseToken(token)
            val encryptedUserId = claims?.subject
            encryptedUserId?.let { decryptUserId(it) }
        } catch (e: Exception) {
            null
        }
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
