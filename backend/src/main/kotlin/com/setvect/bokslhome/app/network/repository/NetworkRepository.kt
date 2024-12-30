package com.setvect.bokslhome.app.network.repository

import com.setvect.bokslhome.app.network.entity.NetworkEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface NetworkRepository : JpaRepository<NetworkEntity, Int> {

    @Query(
        """
        SELECT a
        FROM NetworkEntity a
        WHERE (:title IS NULL OR ( lower(a.title) LIKE CONCAT('%', lower(:title), '%') ) )
        AND a.deleteF = false
        ORDER BY a.editDate desc
    """,
    )
    fun findBySearch(
        pageable: Pageable,
        @Param("title") title: String?,
    ): Page<NetworkEntity>

    @Modifying
    @Transactional
    @Query("UPDATE NetworkEntity m SET m.deleteF = true WHERE m.networkSeq = :networkSeq")
    fun deleteUpdate(@Param("networkSeq") networkSeq: Int): Int
}
