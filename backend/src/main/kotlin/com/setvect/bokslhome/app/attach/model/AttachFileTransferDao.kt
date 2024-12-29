package com.setvect.bokslhome.app.attach.model

import java.io.InputStream

data class AttachFileTransferDao(
    val originalName: String,
    val contentType: String,
    val inputStream: InputStream,
    val size: Int
) {
    // InputStream은 equals/hashCode에서 제외
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as AttachFileTransferDao

        if (originalName != other.originalName) return false
        if (contentType != other.contentType) return false

        return true
    }

    override fun hashCode(): Int {
        var result = originalName.hashCode()
        result = 31 * result + contentType.hashCode()
        return result
    }
}
