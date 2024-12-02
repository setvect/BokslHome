package com.setvect.bokslhome.app.board.entity

import com.setvect.bokslhome.app.user.entity.UserEntity
import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import java.sql.Types
import java.util.*

/**
 * 게시물 VO
 */
@Entity
@Table(name = "TBBB_BOARD_ARTICLE")
data class BoardArticleEntity(
    @Id
    @Column(name = "ARTICLE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    val boardArticleSeq: Int = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_CODE", nullable = false)
    val boardManager: BoardManagerEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    val user: UserEntity,

    /**
     * 제목
     */
    @Column(name = "TITLE", nullable = false, length = 200)
    val title: String,

    /**
     * 본문
     */
    @Column(name = "CONTENT", nullable = false)
    @Lob
    val content: String,

    /**
     * 아이피
     */
    @Column(name = "IP", nullable = false, length = 20)
    val ip: String,

    /**
     * 조회수
     */
    @Column(name = "HIT_COUNT", nullable = false)
    val hitCount: Int = 0,

    /**
     * 암호화된 글 여부
     */
    @Column(name = "ENCRYPT_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val encryptF: Boolean = false,

    /**
     * 등록일
     */
    @Column(name = "REG_DATE", nullable = false)
    val regDate: Date = Date(),

    /**
     * 게시물 삭제 여부
     */
    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false
) {
    // JPA를 위한 no-args 생성자
    protected constructor() : this(
        boardManager = BoardManagerEntity("", ""),
        user = UserEntity("","",""),
        title = "",
        content = "",
        ip = ""
    )
}
