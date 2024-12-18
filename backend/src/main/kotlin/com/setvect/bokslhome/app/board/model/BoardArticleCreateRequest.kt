package com.setvect.bokslhome.app.board.model

import com.setvect.bokslhome.app.board.entity.BoardArticleEntity
import com.setvect.bokslhome.app.board.entity.BoardManagerEntity
import com.setvect.bokslhome.app.user.entity.UserEntity

data class BoardArticleCreateRequest(
    val boardCode: String,
    val title: String,
    val content: String,
    val encryptF: Boolean = false
) {
    fun toEntity(boardManager: BoardManagerEntity, ip: String, user: UserEntity) = BoardArticleEntity(
        boardManager = boardManager,
        user = user,
        title = title,
        content = content,
        ip = ip,
        encryptF = encryptF
    )
}
