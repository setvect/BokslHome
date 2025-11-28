package com.setvect.bokslhome.app.memo.repository

import com.setvect.bokslhome.app.memo.entity.MemoCategoryEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface MemoCategoryRepository : JpaRepository<MemoCategoryEntity, Int> {
    
    /**
     * 카테고리 목록과 각 카테고리의 메모 갯수를 한 번의 쿼리로 조회
     * @return [categorySeq, name, memoCount] 형태의 배열 리스트
     */
    @Query("""
        SELECT c.memoCategorySeq, c.name, COUNT(m.memoSeq)
        FROM MemoCategoryEntity c
        LEFT JOIN MemoEntity m ON m.category = c AND m.deleteF = false
        GROUP BY c.memoCategorySeq, c.name
        ORDER BY c.name
    """)
    fun findAllWithMemoCount(): List<Array<Any>>
}
