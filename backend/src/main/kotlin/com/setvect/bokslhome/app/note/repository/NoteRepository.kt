package com.setvect.bokslhome.app.note.repository

import com.setvect.bokslhome.app.note.entity.NoteEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface NoteRepository : JpaRepository<NoteEntity, Int> {

    @Query(
        """
        SELECT a
        FROM NoteEntity a
        WHERE (:noteCategorySeq IS NULL OR a.category.noteCategorySeq = :noteCategorySeq)
        AND (:title IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :title, '%')))
        AND (:content IS NULL OR a.content LIKE CONCAT('%', :content, '%'))
        AND a.deleteF = false
        ORDER BY a.noteSeq desc
    """,
    )
    fun findBySearch(
        pageable: Pageable,
        noteCategorySeq: Int?,
        title: String?,
        content: String?,
    ): Page<NoteEntity>

    @Modifying
    @Transactional
    @Query("UPDATE NoteEntity m SET m.deleteF = true WHERE m.noteSeq = :id")
    fun deleteUpdate(@Param("id") noteSeq: Int): Int
}
