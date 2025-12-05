package com.setvect.bokslhome.app.board.model

data class BoardArticleCreateRequest(
    val boardCode: String,
    val title: String,
    val content: String,
    val contentType: ContentType = ContentType.HTML,
    val encryptF: Boolean = false,
    var ip: String?,
)
