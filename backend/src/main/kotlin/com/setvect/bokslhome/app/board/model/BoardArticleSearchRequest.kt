package com.setvect.bokslhome.app.board.model

enum class BoardSearchType {
    TITLE,      // 제목 검색
    CONTENT     // 내용 검색
}

data class BoardArticleSearchRequest(
    val boardCode: String,
    val searchType: BoardSearchType? = null,
    val word: String? = null,
) {
    // 검색 타입에 따라 title 파라미터 반환
    fun getTitle(): String? = when (searchType) {
        BoardSearchType.TITLE -> word
        else -> null
    }

    // 검색 타입에 따라 content 파라미터 반환
    fun getContent(): String? = when (searchType) {
        BoardSearchType.CONTENT -> word
        else -> null
    }
}
