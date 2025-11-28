package com.setvect.bokslhome.app.memo.repository

import com.setvect.bokslhome.app.memo.entity.MemoEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface MemoRepository : JpaRepository<MemoEntity, Int> {
    @Query("SELECT m FROM MemoEntity m WHERE m.category.memoCategorySeq = :id AND m.deleteF = false ORDER BY m.editDate DESC")
    fun findByCategory(@Param("id") categorySeq: Int): List<MemoEntity>

    @Query("SELECT m FROM MemoEntity m WHERE m.deleteF = false ORDER BY m.editDate DESC")
    fun findAllActive(): List<MemoEntity>

    @Modifying
    @Transactional
    @Query("UPDATE MemoEntity m SET m.deleteF = true WHERE m.memoSeq = :memoSeq")
    fun deleteUpdate(@Param("memoSeq") memoSeq: Int): Int
}
