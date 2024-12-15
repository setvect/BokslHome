package com.setvect.bokslhome.app.board.service

import com.setvect.bokslhome.app.board.model.BoardArticleCreateRequest
import com.setvect.bokslhome.app.board.model.BoardArticleDto
import com.setvect.bokslhome.app.board.model.BoardArticleSearch
import com.setvect.bokslhome.app.board.repoistory.BoardArticleRepository
import com.setvect.bokslhome.app.board.repoistory.BoardManagerRepository
import com.setvect.bokslhome.app.user.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class BoardArticleService(
    private val boardArticleRepository: BoardArticleRepository,
    private val boardManagerRepository: BoardManagerRepository,
    private val userRepository: UserRepository
) {
    /**
     * 게시물 생성
     */
    @Transactional
    fun create(request: BoardArticleCreateRequest): BoardArticleDto {
        val boardManager = boardManagerRepository.findById(request.boardCode)
            .orElseThrow { IllegalArgumentException("게시판을 찾을 수 없습니다: ${request.boardCode}") }
        val user = userRepository.findById(request.userId)
            .orElseThrow { IllegalArgumentException("사용자를 찾을 수 없습니다: ${request.userId}") }
        
        val entity = request.toEntity(boardManager, user)
        val savedEntity = boardArticleRepository.save(entity)
        return BoardArticleDto.from(savedEntity)
    }

    /**
     * 게시물 조회
     */
    fun get(boardArticleSeq: Int): BoardArticleDto {
        val entity = boardArticleRepository.findById(boardArticleSeq)
            .orElseThrow { IllegalArgumentException("게시물을 찾을 수 없습니다: $boardArticleSeq") }
        return BoardArticleDto.from(entity)
    }

    /**
     * 게시물 수정
     */
    @Transactional
    fun update(boardArticleSeq: Int, request: BoardArticleCreateRequest): BoardArticleDto {
        val existingArticle = get(boardArticleSeq)
        val boardManager = boardManagerRepository.findById(request.boardCode)
            .orElseThrow { IllegalArgumentException("게시판을 찾을 수 없습니다: ${request.boardCode}") }
        val user = userRepository.findById(request.userId)
            .orElseThrow { IllegalArgumentException("사용자를 찾을 수 없습니다: ${request.userId}") }

        val entity = request.toEntity(boardManager, user)
        val savedEntity = boardArticleRepository.save(entity)
        return BoardArticleDto.from(savedEntity)
    }

    /**
     * 게시물 삭제
     */
    @Transactional
    fun delete(boardArticleSeq: Int) {
        boardArticleRepository.deleteById(boardArticleSeq)
    }

    /**
     * 검색 조건에 따른 게시물 목록 조회
     */
    fun list(search: BoardArticleSearch, pageable: Pageable): Page<BoardArticleDto> {
        return boardArticleRepository.findBySearch(
            boardCode = search.boardCode,
            title = search.title,
            content = search.content,
            pageable = pageable
        ).map { BoardArticleDto.from(it) }
    }
} 