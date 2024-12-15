package com.setvect.bokslhome.app.board.model

import com.setvect.bokslhome.app.board.entity.BoardArticleEntity
import java.util.*

data class BoardArticleDto(
    val boardArticleSeq: Int,
    val boardCode: String,
    val userId: String,
    val title: String,
    val content: String,
    val ip: String,
    val hitCount: Int,
    val encryptF: Boolean,
    val regDate: Date,
    val deleteF: Boolean
) {
    companion object {
        fun from(entity: BoardArticleEntity) = BoardArticleDto(
            boardArticleSeq = entity.boardArticleSeq,
            boardCode = entity.boardManager.boardCode,
            userId = entity.user.userId,
            title = entity.title,
            content = entity.content,
            ip = entity.ip,
            hitCount = entity.hitCount,
            encryptF = entity.encryptF,
            regDate = entity.regDate,
            deleteF = entity.deleteF
        )
    }
}
