package com.setvect.bokslhome.app.board.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.sql.Types
import org.hibernate.annotations.JdbcTypeCode

/**
 * 게시판 설정
 */
@Entity
@Table(name = "TBBA_BOARD_MANAGER")
data class BoardManagerEntity(
    @Id
    @Column(name = "BOARD_CODE", nullable = false, length = 20)
    val boardCode: String,

    @Column(name = "NAME", nullable = false, length = 50)
    val name: String,

    @Column(name = "UPLOAD_LIMIT", nullable = false)
    val uploadLimit: Int = 0,

    @Column(name = "REPLY_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val replyF: Boolean = false,

    @Column(name = "COMMENT_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val commentF: Boolean = false,

    @Column(name = "ATTACH_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val attachF: Boolean = false,

    @Column(name = "ENCRYPT_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val encryptF: Boolean = false,

    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false,

) {
    // JPA를 위한 no-args 생성자
    protected constructor() : this(
        boardCode = "",
        name = "",
    )
}
