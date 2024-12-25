package com.setvect.bokslhome.app.code.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.persistence.SequenceGenerator

/**
 * 코드
 */
@Entity
@Table(name = "TBYC_CODE")
data class CodeEntity(
    @Id
    @Column(name = "CODE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "code_seq")
    @SequenceGenerator(
        name = "code_seq",
        sequenceName = "TBYC_CODE_SEQ",
        initialValue = 10000,
        allocationSize = 50
    )
    val codeSeq: Int = 0,

    @Column(name = "MAJOR_CODE", nullable = false, length = 20)
    val majorCode: String,

    @Column(name = "MINOR_CODE", nullable = false, length = 20)
    val minorCode: String,

    @Column(name = "CODE_VALUE", nullable = false, length = 100)
    val codeValue: String,

    @Column(name = "ORDER_NO", nullable = false)
    val orderNo: Int = 0,

) {
    protected constructor() : this(
        majorCode = "",
        minorCode = "",
        codeValue = "",
    )
}
