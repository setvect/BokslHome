package com.setvect.bokslhome.app.comment.repository

import com.setvect.bokslhome.app.comment.entity.CommentEntity
import com.setvect.bokslhome.app.comment.model.CommentModule
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface CommentRepository : JpaRepository<CommentEntity, Int> {
    fun findByModuleNameAndModuleIdOrderByCommentSeqDesc(pageable: Pageable, moduleName: CommentModule, moduleId: String): Page<CommentEntity>

    fun findByCommentSeqIn(commentSeqList: List<Int>): List<CommentEntity>
}
