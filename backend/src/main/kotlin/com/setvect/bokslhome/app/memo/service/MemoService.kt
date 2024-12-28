package com.setvect.bokslhome.app.memo.service

import com.setvect.bokslhome.app.memo.entity.MemoEntity
import com.setvect.bokslhome.app.memo.model.MemoRequest
import com.setvect.bokslhome.app.memo.model.MemoResponse
import com.setvect.bokslhome.app.memo.repository.MemoCategoryRepository
import com.setvect.bokslhome.app.memo.repository.MemoRepository
import java.time.LocalDateTime
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class MemoService(
    private val memoRepository: MemoRepository,
    private val memoCategoryRepository: MemoCategoryRepository
) {
    private val log = LoggerFactory.getLogger(MemoService::class.java)

    fun create(memoRequest: MemoRequest): MemoResponse {

        val category = memoCategoryRepository.findById(memoRequest.memoCategorySeq).get()

        val entity = MemoEntity(
            content = memoRequest.content,
            fontCss = "",
            bgCss = "",
            category = category,
        )
        val savedEntity = memoRepository.save(entity)
        return MemoResponse.from(savedEntity)
    }

    fun update(memoSeq: Int, memoRequest: MemoRequest): MemoResponse {
        val existingEntity = memoRepository.findById(memoSeq).get()
        val category = memoCategoryRepository.findById(memoRequest.memoCategorySeq).get()

        val updatedEntity = existingEntity.copy(
            content = memoRequest.content,
            category = category,
            editDate = LocalDateTime.now()
        )
        memoRepository.save(updatedEntity)
        return MemoResponse.from(updatedEntity)
    }

    fun delete(memoSeq: Int) {
        memoRepository.deleteUpdate(memoSeq)
    }

    fun get(memoSeq: Int): MemoResponse {
        val memoEntity = memoRepository.findById(memoSeq).get()
        return MemoResponse.from(memoEntity)
    }

    fun listByCategory(categorySeq: Int): List<MemoResponse> {
        val memoList = memoRepository.findByCategory(categorySeq)
        return memoList.map { MemoResponse.from(it) }
    }
}
