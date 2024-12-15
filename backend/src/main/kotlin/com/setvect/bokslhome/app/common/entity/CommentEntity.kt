package com.setvect.bokslhome.app.common.entity

import com.setvect.bokslhome.app.common.model.CommentModule
import com.setvect.bokslhome.app.user.entity.UserEntity
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.util.Date

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
    val regDate: Date = Date(),
) {
    protected constructor() : this(
        moduleName = CommentModule.BOARD,
        moduleId = "",
        user = UserEntity("", "", ""),
        content = "",
    )
}
