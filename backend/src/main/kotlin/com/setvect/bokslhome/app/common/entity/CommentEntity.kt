package com.setvect.bokslhome.app.common.entity

import com.setvect.bokslhome.app.common.model.CommentModule
import com.setvect.bokslhome.app.user.entity.UserEntity
import jakarta.persistence.*
import java.util.*

/**
 * 코멘트
 */
@Entity
@Table(name = "TBYB_COMMENT")
class CommentEntity {
    /**
     * 일련번호
     */
    @Id
    @Column(name = "COMMENT_SEQ")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var commentSeq = 0

    /**
     * 모듈이름
     */
    @Column(name = "MODULE_NAME", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private var moduleName: CommentModule? = null

    /**
     * 모듈 아이디
     */
    @Column(name = "MODULE_ID", nullable = false, length = 50)
    private var moduleId: String? = null

    /**
     * 아이디
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER", nullable = false)
    private val user: UserEntity? = null

    /**
     * 내용
     */
    @Column(name = "CONTENT", nullable = false, length = 4000)
    private var content: String? = null

    /**
     * 등록일
     */
    @Column(name = "REG_DATE", nullable = false)
    private var regDate: Date? = null
}
