package com.setvect.bokslhome.app.note.model

import com.setvect.bokslhome.app.attach.model.AttachFileResponse
import com.setvect.bokslhome.app.note.entity.NoteEntity
import java.time.LocalDateTime

data class NoteResponse(
    val noteSeq: Int = 0,
    val noteCategorySeq: Int,
    val title: String,
    val content: String,
    val markdownF: Boolean,
    val editDate: LocalDateTime?,
    val regDate: LocalDateTime,
    val attachFileList: List<AttachFileResponse>
) {
    companion object {
        fun from(entity: NoteEntity, attachFileList: List<AttachFileResponse>) =
            NoteResponse(
                noteSeq = entity.noteSeq,
                noteCategorySeq = entity.category.noteCategorySeq,
                title = entity.title,
                content = entity.content,
                markdownF = entity.markdownF,
                editDate = entity.editDate,
                regDate = entity.regDate,
                attachFileList = attachFileList
            )
    }
}
