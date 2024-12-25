package com.setvect.bokslhome.app.comment.model

import com.setvect.bokslhome.app.comment.entity.CommentEntity
import java.time.LocalDateTime

data class CommentResponse(
    val commentSeq: Int,
    val content: String,
    val regDate: LocalDateTime,
    val name: String,
) {
    companion object {
        fun from(commentEntity: CommentEntity) =
            CommentResponse(commentEntity.commentSeq, commentEntity.content, commentEntity.regDate, commentEntity.user.name)
    }
}


