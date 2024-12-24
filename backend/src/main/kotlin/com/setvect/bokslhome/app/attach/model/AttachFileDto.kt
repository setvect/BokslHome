package com.setvect.bokslhome.app.attach.model

import com.setvect.bokslhome.app.attach.entity.AttachFileEntity
import java.io.File

data class AttachFileDto(
    val attachFileSeq: Int,
    val originalName: String,
    val file: File
) {
    companion object {
        fun from(entity: AttachFileEntity, file: File) =
            AttachFileDto(
                attachFileSeq = entity.attachFileSeq,
                originalName = entity.originalName,
                file = file
            )
    }
}

