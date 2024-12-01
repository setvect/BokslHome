package com.setvect.bokslhome.app.board.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import java.sql.Types

/**
 * 게시판 설정
 */
@Entity
@Table(name = "TBBA_BOARD_MANAGER")
class BoardManagerEntity(
    @Id
    @Column(name = "BOARD_CODE", nullable = false, length = 20)
    var boardCode: String? = null,

    @Column(name = "NAME", nullable = false, length = 50)
    var name: String? = null,

    @Column(name = "UPLOAD_LIMIT", nullable = false)
    var uploadLimit: Int = 0,

    @Column(name = "REPLY_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    var replyF: Boolean = false,

    @Column(name = "COMMENT_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    var commentF: Boolean = false,

    @Column(name = "ATTACH_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    var attachF: Boolean = false,

    @Column(name = "ENCRYPT_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    var encryptF: Boolean = false,

    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    var deleteF: Boolean = false,
) {
    // 기본 생성자 (JPA를 위해 필요)
    constructor() : this(
        boardCode = null,
        name = null,
        uploadLimit = 0,
        replyF = false,
        commentF = false,
        attachF = false,
        encryptF = false,
        deleteF = false
    )

    companion object {
        // 팩토리 메서드
        fun create(
            boardCode: String,
            name: String,
            uploadLimit: Int = 0,
            replyF: Boolean = false,
            commentF: Boolean = false,
            attachF: Boolean = false,
            encryptF: Boolean = false,
            deleteF: Boolean = false
        ) = BoardManagerEntity(
            boardCode = boardCode,
            name = name,
            uploadLimit = uploadLimit,
            replyF = replyF,
            commentF = commentF,
            attachF = attachF,
            encryptF = encryptF,
            deleteF = deleteF
        )
    }
}
