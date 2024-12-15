package com.setvect.bokslhome.app.board.service

import com.setvect.bokslhome.app.board.model.BoardManagerCreateRequest
import com.setvect.bokslhome.app.board.model.BoardManagerDto
import com.setvect.bokslhome.app.board.model.BoardManagerSearch
import com.setvect.bokslhome.app.board.repoistory.BoardManagerRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class BoardManagerService(
    private val boardManagerRepository: BoardManagerRepository
) {
    /**
     * 게시판 생성
     */
    fun create(request: BoardManagerCreateRequest): BoardManagerDto {
        val entity = request.toEntity()
        val savedEntity = boardManagerRepository.save(entity)
        return BoardManagerDto.from(savedEntity)
    }

    /**
     * 게시판 조회
     */
    fun get(boardCode: String): BoardManagerDto {
        val entity = boardManagerRepository.findById(boardCode)
            .orElseThrow { IllegalArgumentException("게시판을 찾을 수 없습니다: $boardCode") }
        return BoardManagerDto.from(entity)
    }

    /**
     * 모든 게시판 목록 조회
     */
    fun getAll(): List<BoardManagerDto> {
        return boardManagerRepository.findAll()
            .map { BoardManagerDto.from(it) }
    }

    /**
     * 게시판 수정
     */
    fun update(request: BoardManagerCreateRequest): BoardManagerDto {
        get(request.boardCode) // 존재 여부 확인
        val entity = request.toEntity()
        val savedEntity = boardManagerRepository.save(entity)
        return BoardManagerDto.from(savedEntity)
    }

    /**
     * 게시판 삭제
     */
    fun delete(boardCode: String) {
        boardManagerRepository.deleteById(boardCode)
    }

    /**
     * 검색 조건에 따른 게시판 목록 조회
     */
    fun list(search: BoardManagerSearch, pageable: Pageable): Page<BoardManagerDto> {
        return boardManagerRepository.findBySearch(
            boardCode = search.boardCode,
            name = search.name,
            pageable = pageable
        ).map { BoardManagerDto.from(it) }
    }
}
