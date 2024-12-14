package com.setvect.bokslhome.app.board.repoistory

import com.setvect.bokslhome.app.board.entity.BoardManagerEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

/**
 * 게시판 관리
 */
interface BoardManagerRepository : JpaRepository<BoardManagerEntity, String> {
    @Query("""
        SELECT b 
        FROM BoardManagerEntity b
        WHERE (:boardCode IS NULL OR LOWER(b.boardCode) LIKE LOWER(CONCAT('%', :boardCode, '%')))
        AND (:name IS NULL OR LOWER(b.name) LIKE LOWER(CONCAT('%', :name, '%')))
    """)
    fun findBySearch(
        boardCode: String?,
        name: String?,
        pageable: Pageable
    ): Page<BoardManagerEntity>
}
