package com.setvect.bokslhome.app.knowledge.model

import com.setvect.bokslhome.app.knowledge.entity.KnowledgeEntity
import java.time.LocalDateTime

data class KnowledgeResponse(
    val knowledgeSeq: Int ,
    val classifyC: String,
    val problem: String,
    val solution: String?,
    val regDate: LocalDateTime
) {
    companion object {
        fun from(knowledgeEntity: KnowledgeEntity) = KnowledgeResponse(
            knowledgeSeq = knowledgeEntity.knowledgeSeq,
            classifyC = knowledgeEntity.classifyC,
            problem = knowledgeEntity.problem,
            solution = knowledgeEntity.solution,
            regDate = knowledgeEntity.regDate,
        )
    }
}
