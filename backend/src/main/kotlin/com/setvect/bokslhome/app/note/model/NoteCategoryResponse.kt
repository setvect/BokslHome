package com.setvect.bokslhome.app.note.model

import com.setvect.bokslhome.app.note.entity.NoteCategoryEntity
import com.setvect.bokslhome.util.hierarchy.HierarchyItem

data class NoteCategoryResponse(
    override val id: Int,
    override val parentId: Int?,
    val name: String,
) : HierarchyItem {
    companion object {
        fun from(noteCategoryEntity: NoteCategoryEntity) = NoteCategoryResponse(
            id = noteCategoryEntity.noteCategorySeq,
            parentId = noteCategoryEntity.parent?.noteCategorySeq?.takeIf { it != noteCategoryEntity.noteCategorySeq },
            name = noteCategoryEntity.name,
        )
    }
}
