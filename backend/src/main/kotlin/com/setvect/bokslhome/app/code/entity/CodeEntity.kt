package com.setvect.bokslhome.app.code.entity

import jakarta.persistence.*

/**
 * 코드
 */
@Entity
@Table(name = "TBYC_CODE")
class CodeEntity {
    /**
     * 일련번호
     */
    @Id
    @Column(name = "CODE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var codeSeq = 0

    /**
     * 메인코드
     */
    @Column(name = "MAJOR_CODE", nullable = false, length = 20)
    private var majorCode: String? = null

    /**
     * 코드
     */
    @Column(name = "MINOR_CODE", nullable = false, length = 20)
    private var minorCode: String? = null

    /**
     * 코드값
     */
    @Column(name = "CODE_VALUE", nullable = false, length = 100)
    private var codeValue: String? = null

    /**
     * 순서
     */
    @Column(name = "ORDER_NO", nullable = false)
    private var orderNo = 0
}
