package com.setvect.bokslhome.app.code.repository

import com.setvect.bokslhome.app.code.entity.CodeEntity
import com.setvect.bokslhome.app.code.model.CodeMajorGroupResponse
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface CodeRepository : JpaRepository<CodeEntity, Int> {
    @Query(
        """
        SELECT a
        FROM CodeEntity a
        WHERE (:majorCode IS NULL OR ( a.majorCode = :majorCode ) )
        ORDER BY a.majorCode, a.orderNo, a.minorCode
    """,
    )
    fun findBySearch(
        pageable: Pageable,
        @Param("majorCode") title: String?,
    ): Page<CodeEntity>

    @Query(
        """
    SELECT new com.setvect.bokslhome.app.code.model.CodeMajorGroupResponse(a.majorCode, COUNT(a))
    FROM CodeEntity a
    GROUP BY a.majorCode
    order by a.majorCode
    """
    )
    fun groupByMajorCode(): List<CodeMajorGroupResponse>
}
