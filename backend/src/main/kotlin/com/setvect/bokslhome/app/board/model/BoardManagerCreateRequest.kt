package com.setvect.bokslhome.app.board.model

import com.setvect.bokslhome.app.board.entity.BoardManagerEntity

data class BoardManagerCreateRequest(
    val boardCode: String,
    val name: String,
    val uploadLimit: Int = 0,
    val replyF: Boolean = false,
    val commentF: Boolean = false,
    val attachF: Boolean = false,
    val encryptF: Boolean = false,
    val deleteF: Boolean = false,
) {
    fun toEntity(): BoardManagerEntity {
        return BoardManagerEntity(
            boardCode = boardCode,
            name = name,
            uploadLimit = uploadLimit,
            replyF = replyF,
            commentF = commentF,
            attachF = attachF,
            encryptF = encryptF,
            deleteF = deleteF
        )
    }
} 