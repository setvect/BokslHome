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
data class CommentEntity(
    @Id
    @Column(name = "COMMENT_SEQ")
    @GeneratedValue(strategy = GenerationType.AUTO)
    val commentSeq: Int = 0,

    @Column(name = "MODULE_NAME", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    val moduleName: CommentModule,

    @Column(name = "MODULE_ID", nullable = false, length = 50)
    val moduleId: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER", nullable = false)
    val user: UserEntity,

    @Column(name = "CONTENT", nullable = false, length = 4000)
    val content: String,

    @Column(name = "REG_DATE", nullable = false)
    val regDate: Date = Date()
) {
    protected constructor() : this(
        moduleName = CommentModule.BOARD,
        moduleId = "",
        user = UserEntity("","",""),
        content = ""
    )
}
