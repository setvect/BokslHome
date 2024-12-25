package com.setvect.bokslhome.app.comment.model

import jakarta.validation.constraints.Size

data class CommentRequest(
    @field:Size(min = 1, max = 2000, message = "댓글은 최소 1자 이상, 최대 2000자까지 작성 가능합니다.")
    val content: String
)

