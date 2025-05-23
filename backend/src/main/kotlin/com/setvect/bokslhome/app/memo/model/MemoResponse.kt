package com.setvect.bokslhome.app.memo.model

import com.setvect.bokslhome.app.memo.entity.MemoEntity
import java.time.LocalDateTime

data class MemoResponse(
    val memoSeq: Int,
    val categorySeq: Int,
    val content: String,
    val editDate: LocalDateTime,
    val regDate: LocalDateTime,
) {
    companion object {
        fun from(memoEntity: MemoEntity) = MemoResponse(
            memoSeq = memoEntity.memoSeq,
            categorySeq = memoEntity.category.memoCategorySeq,
            content = memoEntity.content,
            regDate = memoEntity.regDate,
            editDate = memoEntity.editDate,
        )
    }
}
