package com.setvect.bokslhome.app.board.repoistory

import com.setvect.bokslhome.app.board.entity.BoardArticleEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional

interface BoardArticleRepository : JpaRepository<BoardArticleEntity, Int> {
    @Query(
        """
        SELECT a
        FROM BoardArticleEntity a
        WHERE a.boardManager.boardCode = :boardCode
        AND (:title IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :title, '%')))
        AND (:content IS NULL OR a.content LIKE CONCAT('%', :content, '%'))
        AND a.deleteF = false
        ORDER BY a.boardArticleSeq desc
    """,
    )
    fun findBySearch(
        pageable: Pageable,
        boardCode: String,
        title: String?,
        content: String?,
    ): Page<BoardArticleEntity>

    @Modifying
    @Transactional
    @Query("update BoardArticleEntity set deleteF = 'Y' where boardArticleSeq = :boardArticleSeq")
    fun deleteUpdate(boardArticleSeq: Int)
}
