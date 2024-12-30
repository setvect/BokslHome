package com.setvect.bokslhome.app.knowledge.service

import com.setvect.bokslhome.app.knowledge.entity.KnowledgeEntity
import com.setvect.bokslhome.app.knowledge.model.KnowledgeRequest
import com.setvect.bokslhome.app.knowledge.model.KnowledgeResponse
import com.setvect.bokslhome.app.knowledge.repository.KnowledgeRepository
import com.setvect.bokslhome.app.user.exception.UserGuideCode
import com.setvect.bokslhome.app.user.exception.UserGuideException
import com.setvect.bokslhome.util.CommonUtil
import java.time.LocalDateTime
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class KnowledgeService(
    private val knowledgeRepository: KnowledgeRepository
) {
    private val log = LoggerFactory.getLogger(KnowledgeService::class.java)

    @Transactional
    fun create(request: KnowledgeRequest): KnowledgeResponse {
        val knowledgeEntity = KnowledgeEntity(
            classifyC = request.classifyC,
            problem = request.problem,
            solution = request.solution,
            regDate = LocalDateTime.now(),
            deleteF = false
        )
        val savedEntity = knowledgeRepository.save(knowledgeEntity)
        return KnowledgeResponse.from(savedEntity)
    }

    @Transactional
    fun update(knowledgeSeq: Int, request: KnowledgeRequest): KnowledgeResponse {
        val existingKnowledge = getKnowledgeById(knowledgeSeq)
        val updatedKnowledge = existingKnowledge.copy(
            classifyC = request.classifyC,
            problem = request.problem,
            solution = request.solution
        )
        val savedEntity = knowledgeRepository.save(updatedKnowledge)
        return KnowledgeResponse.from(savedEntity)
    }

    fun delete(knowledgeSeq: Int) {
        knowledgeRepository.deleteUpdate(knowledgeSeq)
    }

    fun get(knowledgeSeq: Int): KnowledgeResponse {
        val knowledgeEntity = getKnowledgeById(knowledgeSeq)
        return KnowledgeResponse.from(knowledgeEntity)
    }

    fun page(pageable: Pageable, classifyC: String, content: String?): PagedModel<KnowledgeResponse> {
        val knowledgePage = knowledgeRepository.findBySearch(pageable, classifyC, CommonUtil.emptyStringNull(content))
        val responsePage = knowledgePage.map { KnowledgeResponse.from(it) }
        return PagedModel(responsePage)
    }

    private fun getKnowledgeById(knowledgeSeq: Int): KnowledgeEntity {
        return knowledgeRepository.findById(knowledgeSeq).get()
    }
}
