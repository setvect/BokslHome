package com.setvect.bokslhome.app.board.service

import com.setvect.bokslhome.app.board.model.BoardManagerCreateRequest
import com.setvect.bokslhome.app.board.model.BoardManagerDto
import com.setvect.bokslhome.app.board.model.BoardManagerSearch
import com.setvect.bokslhome.app.board.repoistory.BoardManagerRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class BoardManagerService(private val boardManagerRepository: BoardManagerRepository) {

    fun create(request: BoardManagerCreateRequest): BoardManagerDto {
        val entity = request.toEntity()
        val savedEntity = boardManagerRepository.save(entity)
        return BoardManagerDto.from(savedEntity)
    }

    fun get(boardCode: String): BoardManagerDto {
        val entity = boardManagerRepository.findById(boardCode)
            .orElseThrow { IllegalArgumentException("게시판을 찾을 수 없습니다: $boardCode") }
        return BoardManagerDto.from(entity)
    }

    fun getAll(): List<BoardManagerDto> =
        boardManagerRepository.findAll().map { BoardManagerDto.from(it) }

    fun update(request: BoardManagerCreateRequest): BoardManagerDto {
        get(request.boardCode)
        /* 존재 여부 확인 */
        val entity = request.toEntity()
        val savedEntity = boardManagerRepository.save(entity)
        return BoardManagerDto.from(savedEntity)
    }

    fun delete(boardCode: String) =
        boardManagerRepository.deleteUpdate(boardCode)

    fun list(search: BoardManagerSearch, pageable: Pageable): Page<BoardManagerDto> =
        boardManagerRepository.findBySearch(boardCode = search.boardCode, name = search.name, pageable = pageable)
            .map { BoardManagerDto.from(it) }
}
