package com.setvect.bokslhome.util

import java.nio.ByteBuffer
import java.security.SecureRandom
import java.security.spec.KeySpec
import java.util.Base64
import javax.crypto.Cipher
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.PBEKeySpec
import javax.crypto.spec.SecretKeySpec

/**
 * AES-256-GCM 기반 양방향 암호화 유틸리티
 *
 * - 알고리즘: AES-256-GCM (Galois/Counter Mode)
 * - 키 유도: PBKDF2WithHmacSHA256
 * - 인증 태그: 128bit
 * - IV: 12 bytes (96 bits) - GCM 표준 권장 크기
 */
object AesGcmEncrypt {
    private const val ALGORITHM = "AES/GCM/NoPadding"
    private const val KEY_ALGORITHM = "AES"
    private const val KEY_DERIVATION_ALGORITHM = "PBKDF2WithHmacSHA256"

    private const val KEY_SIZE = 256 // AES-256
    private const val IV_SIZE = 12 // 12 bytes (96 bits) - GCM standard
    private const val TAG_SIZE = 128 // 128 bits authentication tag
    private const val SALT_SIZE = 16 // 16 bytes salt
    private const val ITERATION_COUNT = 65536 // PBKDF2 iterations

    /**
     * 문자열을 암호화합니다.
     *
     * @param plainText 암호화할 원본 문자열
     * @param password 암호화에 사용할 비밀번호
     * @return Base64로 인코딩된 암호화 문자열 (salt + IV + ciphertext)
     */
    fun encrypt(plainText: String, password: String): String {
        // 1. Salt 생성
        val salt = ByteArray(SALT_SIZE)
        SecureRandom().nextBytes(salt)

        // 2. 비밀번호로부터 키 유도
        val secretKey = deriveKey(password, salt)

        // 3. IV(Initialization Vector) 생성
        val iv = ByteArray(IV_SIZE)
        SecureRandom().nextBytes(iv)

        // 4. 암호화
        val cipher = Cipher.getInstance(ALGORITHM)
        val gcmParameterSpec = GCMParameterSpec(TAG_SIZE, iv)
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, gcmParameterSpec)

        val cipherText = cipher.doFinal(plainText.toByteArray(Charsets.UTF_8))

        // 5. salt + IV + ciphertext를 결합하여 Base64 인코딩
        val combined = ByteBuffer.allocate(SALT_SIZE + IV_SIZE + cipherText.size)
            .put(salt)
            .put(iv)
            .put(cipherText)
            .array()

        return Base64.getEncoder().encodeToString(combined)
    }

    /**
     * 암호화된 문자열을 복호화합니다.
     *
     * @param encryptedText Base64로 인코딩된 암호화 문자열
     * @param password 복호화에 사용할 비밀번호
     * @return 복호화된 원본 문자열
     * @throws Exception 복호화 실패 시 (잘못된 비밀번호, 변조된 데이터 등)
     */
    fun decrypt(encryptedText: String, password: String): String {
        // 1. Base64 디코딩
        val combined = Base64.getDecoder().decode(encryptedText)
        val buffer = ByteBuffer.wrap(combined)

        // 2. salt, IV, ciphertext 분리
        val salt = ByteArray(SALT_SIZE)
        buffer.get(salt)

        val iv = ByteArray(IV_SIZE)
        buffer.get(iv)

        val cipherText = ByteArray(buffer.remaining())
        buffer.get(cipherText)

        // 3. 비밀번호로부터 키 유도
        val secretKey = deriveKey(password, salt)

        // 4. 복호화
        val cipher = Cipher.getInstance(ALGORITHM)
        val gcmParameterSpec = GCMParameterSpec(TAG_SIZE, iv)
        cipher.init(Cipher.DECRYPT_MODE, secretKey, gcmParameterSpec)

        val plainText = cipher.doFinal(cipherText)

        return String(plainText, Charsets.UTF_8)
    }

    /**
     * PBKDF2를 사용하여 비밀번호로부터 암호화 키를 유도합니다.
     *
     * @param password 사용자 비밀번호
     * @param salt Salt 값
     * @return 유도된 SecretKey
     */
    private fun deriveKey(password: String, salt: ByteArray): SecretKeySpec {
        val factory = SecretKeyFactory.getInstance(KEY_DERIVATION_ALGORITHM)
        val spec: KeySpec = PBEKeySpec(password.toCharArray(), salt, ITERATION_COUNT, KEY_SIZE)
        val tmp = factory.generateSecret(spec)
        return SecretKeySpec(tmp.encoded, KEY_ALGORITHM)
    }
}
