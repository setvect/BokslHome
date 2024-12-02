package com.setvect.bokslhome.app.attach.entity

import com.setvect.bokslhome.app.attach.model.AttachFileModule
import jakarta.persistence.*
import java.util.*

/**
 * 첨부파일
 */
@Entity
@Table(name = "TBYA_ATTACH_FILE")
data class AttachFileEntity(
    @Id
    @Column(name = "ATTACH_FIlE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    val attachFileSeq: Int = 0,

    @Column(name = "MODULE_NAME", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    val moduleName: AttachFileModule,

    @Column(name = "MODULE_ID", nullable = false, length = 50)
    val moduleId: String,

    @Column(name = "ORIGINAL_NAME", nullable = false, length = 250)
    val originalName: String,

    @Column(name = "SAVE_NAME", nullable = false, length = 250)
    val saveName: String,

    @Column(name = "SIZE", nullable = false)
    val size: Int = 0,

    @Column(name = "REG_DATE", nullable = false)
    val regDate: Date = Date()
) {
    protected constructor() : this(
        moduleName = AttachFileModule.BOARD,
        moduleId = "",
        originalName = "",
        saveName = ""
    )
}
