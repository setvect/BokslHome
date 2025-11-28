package com.setvect.bokslhome.app.memo.service

import com.setvect.bokslhome.app.memo.entity.MemoCategoryEntity
import com.setvect.bokslhome.app.memo.model.MemoCategoryRequest
import com.setvect.bokslhome.app.memo.model.MemoCategoryResponse
import com.setvect.bokslhome.app.memo.repository.MemoCategoryRepository
import com.setvect.bokslhome.app.memo.repository.MemoRepository
import com.setvect.bokslhome.app.user.exception.UserGuideCode
import com.setvect.bokslhome.app.user.exception.UserGuideException
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class MemoCategoryService(
    private val memoCategoryRepository: MemoCategoryRepository,
    private val memoRepository: MemoRepository,
) {
    private val log = LoggerFactory.getLogger(MemoCategoryService::class.java)

    fun create(memoCategoryRequest: MemoCategoryRequest): MemoCategoryResponse {
        val entity = memoCategoryRepository.save(MemoCategoryEntity(name = memoCategoryRequest.name))
        return MemoCategoryResponse(name = entity.name, categorySeq = entity.memoCategorySeq, memoCount = 0)
    }

    fun update(memoCategorySeq: Int, memoCategoryRequest: MemoCategoryRequest): MemoCategoryResponse {
        val existingEntity = memoCategoryRepository.findById(memoCategorySeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        val updatedEntity = existingEntity.copy(name = memoCategoryRequest.name)
        memoCategoryRepository.save(updatedEntity)
        val memoCount = memoRepository.countByCategory(memoCategorySeq)
        return MemoCategoryResponse(name = updatedEntity.name, categorySeq = updatedEntity.memoCategorySeq, memoCount = memoCount)
    }

    @Transactional
    fun delete(memoCategorySeq: Int) {
        val entity = memoCategoryRepository.findById(memoCategorySeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        // 카테고리에 속한 메모들을 논리적 삭제
        memoRepository.deleteByCategory(memoCategorySeq)
        // 카테고리 삭제
        memoCategoryRepository.delete(entity)
    }

    fun get(memoCategorySeq: Int): MemoCategoryResponse {
        val memoCategoryEntity = memoCategoryRepository.findById(memoCategorySeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        val memoCount = memoRepository.countByCategory(memoCategorySeq)
        return MemoCategoryResponse(name = memoCategoryEntity.name, categorySeq = memoCategoryEntity.memoCategorySeq, memoCount = memoCount)
    }

    fun list(): List<MemoCategoryResponse> {
        // 한 번의 쿼리로 카테고리와 메모 갯수를 함께 조회 (N+1 문제 해결)
        return memoCategoryRepository.findAllWithMemoCount().map { row ->
            MemoCategoryResponse(
                categorySeq = row[0] as Int,
                name = row[1] as String,
                memoCount = (row[2] as Long).toInt()
            )
        }
    }
}
