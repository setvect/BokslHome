package com.setvect.bokslhome.app.memo.repository

import com.setvect.bokslhome.app.memo.entity.MemoEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface MemoRepository : JpaRepository<MemoEntity, Int> {
    @Query(
        """
        SELECT m FROM MemoEntity m
        WHERE m.deleteF = false
        AND (:categorySeq IS NULL OR m.category.memoCategorySeq = :categorySeq)
        AND (:word IS NULL OR LOWER(m.content) LIKE LOWER(CONCAT('%', :word, '%')))
        ORDER BY m.editDate DESC
        """,
    )
    fun findBySearch(
        pageable: Pageable,
        @Param("categorySeq") categorySeq: Int?,
        @Param("word") word: String?,
    ): Page<MemoEntity>

    @Query("SELECT m FROM MemoEntity m WHERE m.category.memoCategorySeq = :id AND m.deleteF = false ORDER BY m.editDate DESC")
    fun findByCategory(@Param("id") categorySeq: Int): List<MemoEntity>

    @Query("SELECT m FROM MemoEntity m WHERE m.deleteF = false ORDER BY m.editDate DESC")
    fun findAllActive(): List<MemoEntity>

    @Query("SELECT COUNT(m) FROM MemoEntity m WHERE m.category.memoCategorySeq = :categorySeq AND m.deleteF = false")
    fun countByCategory(@Param("categorySeq") categorySeq: Int): Int

    @Modifying
    @Transactional
    @Query("UPDATE MemoEntity m SET m.deleteF = true WHERE m.memoSeq = :memoSeq")
    fun deleteUpdate(@Param("memoSeq") memoSeq: Int): Int

    @Modifying
    @Transactional
    @Query("UPDATE MemoEntity m SET m.deleteF = true WHERE m.category.memoCategorySeq = :categorySeq")
    fun deleteByCategory(@Param("categorySeq") categorySeq: Int): Int
}
