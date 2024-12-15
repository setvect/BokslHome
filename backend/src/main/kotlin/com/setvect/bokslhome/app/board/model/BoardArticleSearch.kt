package com.setvect.bokslhome.app.board.model

data class BoardArticleSearch(
    val boardCode: String,
    val title: String? = null,
    val content: String? = null,
)
