package com.setvect.bokslhome.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.bind.ConstructorBinding
import org.springframework.validation.annotation.Validated
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Positive

@ConfigurationProperties(prefix = "bokslhome")
@Validated
class BokslProperties @ConstructorBinding constructor(
    @field:NotEmpty
    val home: String,
    val jwt: JwtProperties
) {
    class JwtProperties @ConstructorBinding constructor(
        @field:NotEmpty
        val secretKey: String,
        @field:Positive
        val expirationTime: Long,
        @field:NotEmpty
        val encryptionKey: String
    )
}
