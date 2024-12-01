package com.setvect.bokslhome.app.attach.entity

import com.setvect.bokslhome.app.attach.model.AttachFileModule
import jakarta.persistence.*
import java.util.*

/**
 * 첨부파일
 */
@Entity
@Table(name = "TBYA_ATTACH_FILE")
class AttachFileEntity {
    /**
     * 일련번호
     */
    @Id
    @Column(name = "ATTACH_FIlE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var attachFileSeq = 0

    /**
     * 모듈이름
     */
    @Column(name = "MODULE_NAME", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private var moduleName: AttachFileModule? = null

    /**
     * 모듈내 항목 번호
     */
    @Column(name = "MODULE_ID", nullable = false, length = 50)
    private var moduleId: String? = null

    /**
     * 원본파일명
     */
    @Column(name = "ORIGINAL_NAME", nullable = false, length = 250)
    private var originalName: String? = null

    /**
     * 저장파일명
     */
    @Column(name = "SAVE_NAME", nullable = false, length = 250)
    private var saveName: String? = null

    /**
     * 파일 사이즈
     */
    @Column(name = "SIZE", nullable = false)
    private var size = 0

    /**
     * 등록일
     */
    @Column(name = "REG_DATE", nullable = false)
    private var regDate: Date? = null
}
