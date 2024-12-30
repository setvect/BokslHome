package com.setvect.bokslhome.app.knowledge.repository

import com.setvect.bokslhome.app.knowledge.entity.KnowledgeEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface KnowledgeRepository : JpaRepository<KnowledgeEntity, Int> {

    @Query(
        """
        SELECT a
        FROM KnowledgeEntity a
        WHERE a.classifyC = :classifyC
        AND (:content IS NULL OR ( a.problem LIKE CONCAT('%', :content, '%') OR a.solution LIKE CONCAT('%', :content, '%')) )
        AND a.deleteF = false
        ORDER BY a.knowledgeSeq desc
    """,
    )
    fun findBySearch(
        pageable: Pageable,
        @Param("classifyC") classifyC: String,
        @Param("content") content: String?,
    ): Page<KnowledgeEntity>

    @Modifying
    @Transactional
    @Query("UPDATE KnowledgeEntity m SET m.deleteF = true WHERE m.knowledgeSeq = :knowledgeSeq")
    fun deleteUpdate(@Param("knowledgeSeq") knowledgeSeq: Int): Int
}
