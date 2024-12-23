package com.setvect.bokslhome.app.attach.model

import com.setvect.bokslhome.app.attach.entity.AttachFileEntity

data class AttachFileResponse(
    val attachFileSeq: Int,
    val originalName: String,
    val size: Int
) {
    companion object {
        fun from(entity: AttachFileEntity) =
            AttachFileResponse(
                attachFileSeq = entity.attachFileSeq,
                originalName = entity.originalName,
                size = entity.size
            )
    }
}

