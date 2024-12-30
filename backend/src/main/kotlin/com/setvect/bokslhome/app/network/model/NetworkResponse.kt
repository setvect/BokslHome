package com.setvect.bokslhome.app.network.model

import com.setvect.bokslhome.app.network.entity.NetworkEntity
import java.time.LocalDateTime

data class NetworkResponse(
    val networkSeq: Int,
    val title: String,
    val content: String,
    val regDate: LocalDateTime,
    val editDate: LocalDateTime,
) {
    companion object {
        fun from(networkEntity: NetworkEntity) = NetworkResponse(
            networkSeq = networkEntity.networkSeq,
            title = networkEntity.title,
            content = networkEntity.content,
            regDate = networkEntity.regDate,
            editDate = networkEntity.editDate,
        )
    }
}
