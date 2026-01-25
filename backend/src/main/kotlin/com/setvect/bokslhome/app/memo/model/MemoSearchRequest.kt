package com.setvect.bokslhome.app.memo.model

data class MemoSearchRequest(
    val categorySeq: Int? = null,    // null이면 전체 카테고리
    val word: String? = null,        // content 검색어
)
