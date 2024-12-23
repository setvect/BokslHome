package com.setvect.bokslhome.app.board.model

import java.io.InputStream

data class FileDataDto(
    val originalName: String,
    val contentType: String,
    val inputStream: InputStream,
    val size: Int
) {
    // InputStream은 equals/hashCode에서 제외
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as FileDataDto

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
