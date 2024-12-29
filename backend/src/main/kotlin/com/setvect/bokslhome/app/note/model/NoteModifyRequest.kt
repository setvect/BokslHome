package com.setvect.bokslhome.app.note.model

data class NoteModifyRequest(
    val noteCategorySeq: Int,
    val title: String,
    val content: String,
    val markdownF: Boolean,
    val deleteAttachFileSeqList: List<Int>? = emptyList(),
)
