package com.setvect.bokslhome.app.board.repoistory

import com.setvect.bokslhome.app.board.entity.BoardArticleEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

/**
 * 게시물 관리
 */
interface BoardArticleRepository : JpaRepository<BoardArticleEntity, Int> {
    @Query(
        """
        SELECT a 
        FROM BoardArticleEntity a
        WHERE a.boardManager.boardCode = :boardCode
        AND (:title IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :title, '%')))
        AND (:content IS NULL OR a.content LIKE CONCAT('%', :content, '%'))
        AND a.deleteF = false
    """,
    )
    fun findBySearch(
        boardCode: String,
        title: String?,
        content: String?,
        pageable: Pageable,
    ): Page<BoardArticleEntity>

    @Query(
        """
        SELECT a 
        FROM BoardArticleEntity a
        WHERE a.boardManager.boardCode = :boardCode
        AND a.user.userId = :userId
        AND a.deleteF = false
    """,
    )
    fun findByBoardCodeAndUserId(
        boardCode: String,
        userId: String,
        pageable: Pageable,
    ): Page<BoardArticleEntity>

    @Query(
        """
        SELECT COUNT(a) 
        FROM BoardArticleEntity a
        WHERE a.boardManager.boardCode = :boardCode
        AND a.deleteF = false
    """,
    )
    fun countByBoardCode(boardCode: String): Long
}
