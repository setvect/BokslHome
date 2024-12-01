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
class BoardArticleEntity {
    @Id
    @Column(name = "ARTICLE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var boardArticleSeq = 0

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_CODE", nullable = false)
    private val boardManager: BoardManagerEntity? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private val user: UserEntity? = null

    /**
     * 제목
     */
    @Column(name = "TITLE", nullable = false, length = 200)
    private var title: String? = null

    /**
     * 본문
     */
    @Column(name = "CONTENT", nullable = false)
    @Lob
    private var content: String? = null

    /**
     * 아이피
     */
    @Column(name = "IP", nullable = false, length = 20)
    private var ip: String? = null

    /**
     * 조회수
     */
    @Column(name = "HIT_COUNT", nullable = false)
    private var hitCount = 0

    /**
     * 암호화된 글 여부
     */
    @Column(name = "ENCRYPT_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    private var encryptF = false

    /**
     *
     */
    @Column(name = "REG_DATE", nullable = false)
    private var regDate: Date? = null

    /**
     * 게시물 삭제 여부
     */
    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    private var deleteF = false

}
