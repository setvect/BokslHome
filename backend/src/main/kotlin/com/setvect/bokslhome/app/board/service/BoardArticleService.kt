package com.setvect.bokslhome.app.board.service

import com.setvect.bokslhome.app.board.entity.BoardArticleEntity
import com.setvect.bokslhome.app.board.model.BoardArticleCreateRequest
import com.setvect.bokslhome.app.board.model.BoardArticleDto
import com.setvect.bokslhome.app.board.model.BoardArticleSearch
import com.setvect.bokslhome.app.board.repoistory.BoardArticleRepository
import com.setvect.bokslhome.app.board.repoistory.BoardManagerRepository
import com.setvect.bokslhome.app.user.repository.UserRepository
import java.util.Optional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class BoardArticleService(
    private val boardArticleRepository: BoardArticleRepository,
    private val boardManagerRepository: BoardManagerRepository,
    private val userRepository: UserRepository,
) {

    fun create(request: BoardArticleCreateRequest, ip: String, userId: String): BoardArticleDto {
        val boardManager = boardManagerRepository.findById(request.boardCode)
            .orElseThrow { IllegalArgumentException("게시판을 찾을 수 없습니다: ${request.boardCode}") }
        val user = Optional.ofNullable(userId)
            .map { userRepository.findById(it).orElseThrow { IllegalArgumentException("사용자를 찾을 수 없습니다: $it") } }.get()
        val boardArticleEntity = request.toEntity(boardManager, ip, user)
        val savedEntity = boardArticleRepository.save(boardArticleEntity)
        return BoardArticleDto.from(savedEntity)
    }

    fun get(boardArticleSeq: Int): BoardArticleDto {
        val entity = boardArticleRepository.findById(boardArticleSeq)
            .orElseThrow { IllegalArgumentException("게시물을 찾을 수 없습니다: $boardArticleSeq") }
        return BoardArticleDto.from(entity)
    }

    fun update(
        boardArticleSeq: Int,
        request: BoardArticleCreateRequest,
        userId: String,
        ip: String,
    ): BoardArticleDto {
        val existingArticle = boardArticleRepository.findById(boardArticleSeq)
            .orElseThrow { IllegalArgumentException("게시물을 찾을 수 없습니다: $boardArticleSeq") }
        val boardManager = boardManagerRepository.findById(request.boardCode)
            .orElseThrow { IllegalArgumentException("게시판을 찾을 수 없습니다: ${request.boardCode}") }
        val user = userRepository.findById(userId).orElseThrow { IllegalArgumentException("사용자를 찾을 수 없습니다: $userId") }
        val entity = BoardArticleEntity(
            boardArticleSeq = existingArticle.boardArticleSeq,
            boardManager = boardManager,
            user = user,
            title = request.title,
            content = request.content,
            ip = ip,
            encryptF = request.encryptF
        )
        val savedEntity = boardArticleRepository.save(entity)
        return BoardArticleDto.from(savedEntity)
    }

    fun delete(boardArticleSeq: Int) {
        boardArticleRepository.deleteUpdate(boardArticleSeq)
    }

    fun list(search: BoardArticleSearch, pageable: Pageable): Page<BoardArticleDto> =
        boardArticleRepository.findBySearch(
            boardCode = search.boardCode,
            title = search.title,
            content = search.content,
            pageable = pageable
        ).map { BoardArticleDto.from(it) }
}
