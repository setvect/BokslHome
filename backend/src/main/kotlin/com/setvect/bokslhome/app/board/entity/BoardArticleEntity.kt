package com.setvect.bokslhome.app.board.entity

import com.setvect.bokslhome.app.board.model.ContentType
import com.setvect.bokslhome.app.board.model.EncryptType
import com.setvect.bokslhome.app.user.entity.UserEntity
import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.Lob
import jakarta.persistence.ManyToOne
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table
import java.sql.Types
import java.time.LocalDateTime
import org.hibernate.annotations.JdbcTypeCode

/**
 * 게시물 VO
 */
@Entity
@Table(name = "TBBB_BOARD_ARTICLE")
data class BoardArticleEntity(
    @Id
    @Column(name = "ARTICLE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "board_article_seq")
    @SequenceGenerator(
        name = "board_article_seq",
        sequenceName = "TBBB_BOARD_ARTICLE_SEQ",
        initialValue = 10000,
        allocationSize = 50
    )
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
     * 본문 유형
     */
    @Column(name = "CONTENT_TYPE", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    val contentType: ContentType = ContentType.HTML,
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
     * 암호화 유형 (암호화되지 않은 경우 null, 암호화된 경우 HEX 또는 AES_GCM)
     */
    @Column(name = "ENCRYPT_TYPE", nullable = true, length = 20)
    @Enumerated(EnumType.STRING)
    val encryptType: EncryptType? = null,
    /**
     * 등록일
     */
    @Column(name = "REG_DATE", nullable = false)
    val regDate: LocalDateTime = LocalDateTime.now(),
    /**
     * 게시물 삭제 여부
     */
    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false,
) {
    // JPA를 위한 no-args 생성자
    constructor() : this(
        boardManager = BoardManagerEntity("", ""),
        user = UserEntity("", "", ""),
        title = "",
        content = "",
        ip = "",
    )
}
