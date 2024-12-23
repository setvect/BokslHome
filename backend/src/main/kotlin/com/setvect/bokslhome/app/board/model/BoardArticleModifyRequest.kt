package com.setvect.bokslhome.app.board.model

data class BoardArticleModifyRequest(
    val title: String,
    val content: String,
    val encryptF: Boolean = false,
)
