package com.setvect.bokslhome.app.board.model

data class BoardArticleCreateRequest(
    val boardCode: String,
    val title: String,
    val content: String,
    val contentType: ContentType = ContentType.HTML,
    val encryptF: Boolean = false,
    val password: String? = null,  // 암호화 시 사용할 비밀번호
    var ip: String?,
)
