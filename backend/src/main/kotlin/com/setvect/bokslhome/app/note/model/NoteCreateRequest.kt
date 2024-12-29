package com.setvect.bokslhome.app.note.model

data class NoteCreateRequest(
    val noteCategorySeq: Int,
    val title: String,
    val content: String,
    val markdownF: Boolean,
)
