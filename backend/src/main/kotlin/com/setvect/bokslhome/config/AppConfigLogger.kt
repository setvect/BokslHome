package com.setvect.bokslhome.config

import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component
import org.springframework.boot.context.event.ApplicationReadyEvent

/**
 * 애플리케이션 부팅 시 주요 설정을 로깅한다.
 * 비밀 키는 전체 값을 노출하지 않고 마스킹한다.
 */
@Component
class AppConfigLogger(
    private val env: Environment,
    private val bokslProperties: BokslProperties
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @EventListener(ApplicationReadyEvent::class)
    fun logConfig() {
        val activeProfiles = env.activeProfiles.toList()
        val additionalLocation = env.getProperty("spring.config.additional-location")
            ?: System.getenv("SPRING_CONFIG_ADDITIONAL_LOCATION")

        log.info(
            "Config loaded | profiles={}, additionalConfigLocation={}",
            if (activeProfiles.isEmpty()) listOf("default") else activeProfiles,
            additionalLocation ?: "not set"
        )

        val jwt = bokslProperties.jwt
        log.info(
            "JWT config | issuer={}, audience={}, expirationTime={}, clockSkewSeconds={}, secretKey={}, encryptionKey={}",
            jwt.issuer,
            jwt.audience,
            jwt.expirationTime,
            jwt.clockSkewSeconds,
            maskSecret(jwt.secretKey),
            maskSecret(jwt.encryptionKey)
        )
    }

    private fun maskSecret(value: String?): String {
        if (value.isNullOrBlank()) return "empty"
        if (value.length <= 8) return "****(len=${value.length})"
        return "${value.take(4)}***${value.takeLast(4)}(len=${value.length})"
    }
}
