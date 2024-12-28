package com.setvect.bokslhome.app.memo.service

import com.setvect.bokslhome.app.memo.entity.MemoCategoryEntity
import com.setvect.bokslhome.app.memo.model.MemoCategoryRequest
import com.setvect.bokslhome.app.memo.model.MemoCategoryResponse
import com.setvect.bokslhome.app.memo.repository.MemoCategoryRepository
import com.setvect.bokslhome.app.user.exception.UserGuideCode
import com.setvect.bokslhome.app.user.exception.UserGuideException
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class MemoCategoryService(
    private val memoCategoryRepository: MemoCategoryRepository,
) {
    private val log = LoggerFactory.getLogger(MemoCategoryService::class.java)

    fun create(memoCategoryRequest: MemoCategoryRequest): MemoCategoryResponse {
        val entity = memoCategoryRepository.save(MemoCategoryEntity(name = memoCategoryRequest.name))
        return MemoCategoryResponse(name = entity.name, categorySeq = entity.memoCategorySeq)
    }

    fun update(memoCategorySeq: Int, memoCategoryRequest: MemoCategoryRequest): MemoCategoryResponse {
        val existingEntity = memoCategoryRepository.findById(memoCategorySeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        val updatedEntity = existingEntity.copy(name = memoCategoryRequest.name)
        memoCategoryRepository.save(updatedEntity)
        return MemoCategoryResponse(name = updatedEntity.name, categorySeq = updatedEntity.memoCategorySeq)
    }

    fun delete(memoCategorySeq: Int) {
        val entity = memoCategoryRepository.findById(memoCategorySeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        memoCategoryRepository.delete(entity)
    }

    fun get(memoCategorySeq: Int): MemoCategoryResponse {
        val memoCategoryEntity = memoCategoryRepository.findById(memoCategorySeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        return MemoCategoryResponse(name = memoCategoryEntity.name, categorySeq = memoCategoryEntity.memoCategorySeq)
    }

    fun list(): List<MemoCategoryResponse> {
        val list = memoCategoryRepository.findAll()
        return list.map { memoCategory -> MemoCategoryResponse(name = memoCategory.name, categorySeq = memoCategory.memoCategorySeq) }
    }
}
