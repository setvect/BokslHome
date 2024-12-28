package com.setvect.bokslhome.app.note.model

data class NoteCategoryRequest(
    val name: String,
    val parentCategorySeq: Int,
)
