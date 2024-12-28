package com.setvect.bokslhome.app.note.service

import com.setvect.bokslhome.app.note.entity.NoteCategoryEntity
import com.setvect.bokslhome.app.note.model.NoteCategoryRequest
import com.setvect.bokslhome.app.note.model.NoteCategoryResponse
import com.setvect.bokslhome.app.note.repository.NoteCategoryRepository
import com.setvect.bokslhome.util.hierarchy.HierarchyUtil
import com.setvect.bokslhome.util.hierarchy.TreeNode
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class NoteCategoryService(
    private val noteCategoryRepository: NoteCategoryRepository
) {
    private val log = LoggerFactory.getLogger(NoteCategoryService::class.java)

    fun create(noteCategoryRequest: NoteCategoryRequest): NoteCategoryResponse {
        val parentEntity = noteCategoryRepository.findById(noteCategoryRequest.parentCategorySeq).get()

        val entity = noteCategoryRepository.save(
            NoteCategoryEntity(
                name = noteCategoryRequest.name,
                parent = parentEntity
            )
        )
        return NoteCategoryResponse.from(entity)
    }

    fun update(noteCategorySeq: Int, noteCategoryRequest: NoteCategoryRequest): NoteCategoryResponse {
        val existingEntity = noteCategoryRepository.findById(noteCategorySeq).get()

        val parentEntity = noteCategoryRepository.findById(noteCategoryRequest.parentCategorySeq).get()

        val updatedEntity = existingEntity.copy(
            name = noteCategoryRequest.name,
            parent = parentEntity,
        )
        noteCategoryRepository.save(updatedEntity)

        return NoteCategoryResponse.from(updatedEntity)
    }

    fun delete(categorySeq: Int) {
        noteCategoryRepository.deleteUpdate(categorySeq)
    }

    fun get(categorySeq: Int): NoteCategoryResponse {
        val noteCategoryEntity = noteCategoryRepository.findById(categorySeq).get()
        return NoteCategoryResponse.from(noteCategoryEntity)
    }

    fun list(): List<NoteCategoryResponse> {
        val list = noteCategoryRepository.findActiveList()
        return list.map { NoteCategoryResponse.from(it) }
    }

    fun tree(): List<TreeNode<NoteCategoryResponse>> {
        val list = list()
        val tree = HierarchyUtil.buildTree(list)
        return tree
    }
}
