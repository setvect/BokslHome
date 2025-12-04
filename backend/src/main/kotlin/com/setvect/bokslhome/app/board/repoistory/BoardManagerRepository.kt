package com.setvect.bokslhome.app.board.repoistory

import com.setvect.bokslhome.app.board.entity.BoardManagerEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.jpa.repository.Modifying
import org.springframework.transaction.annotation.Transactional

/**
 * 게시판 관리
 */
interface BoardManagerRepository : JpaRepository<BoardManagerEntity, String> {
    @Query(
        """
        SELECT b
        FROM BoardManagerEntity b
        WHERE (:boardCode IS NULL OR LOWER(b.boardCode) LIKE LOWER(CONCAT('%', :boardCode, '%')))
        AND (:name IS NULL OR LOWER(b.name) LIKE LOWER(CONCAT('%', :name, '%')))
        AND b.deleteF = false
    """,
    )
    fun findBySearch(
        pageable: Pageable,
        boardCode: String?,
        name: String?,
    ): Page<BoardManagerEntity>

    @Modifying
    @Transactional
    @Query("update BoardManagerEntity set deleteF = 'Y' where boardCode = :boardCode")
    fun deleteUpdate(boardCode: String)
}
