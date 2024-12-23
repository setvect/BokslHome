package com.setvect.bokslhome.app.board.service

import com.setvect.bokslhome.app.board.model.BoardManagerCreateRequest
import com.setvect.bokslhome.app.board.model.BoardManagerResponse
import com.setvect.bokslhome.app.board.model.BoardManagerSearchRequest
import com.setvect.bokslhome.app.board.repoistory.BoardManagerRepository
import com.setvect.bokslhome.app.user.exception.UserGuideException
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class BoardManagerService(private val boardManagerRepository: BoardManagerRepository) {

    fun create(request: BoardManagerCreateRequest): BoardManagerResponse {
        val entity = request.toEntity()
        val savedEntity = boardManagerRepository.save(entity)
        return BoardManagerResponse.from(savedEntity)
    }

    fun get(boardCode: String): BoardManagerResponse {
        val entity = boardManagerRepository.findById(boardCode)
            .orElseThrow { UserGuideException("게시판을 찾을 수 없습니다: $boardCode") }
        return BoardManagerResponse.from(entity)
    }

    fun getAll(): List<BoardManagerResponse> =
        boardManagerRepository.findAll().map { BoardManagerResponse.from(it) }

    fun update(request: BoardManagerCreateRequest): BoardManagerResponse {
        get(request.boardCode)
        /* 존재 여부 확인 */
        val entity = request.toEntity()
        val savedEntity = boardManagerRepository.save(entity)
        return BoardManagerResponse.from(savedEntity)
    }

    fun delete(boardCode: String) =
        boardManagerRepository.deleteUpdate(boardCode)

    fun list(search: BoardManagerSearchRequest, pageable: Pageable): Page<BoardManagerResponse> =
        boardManagerRepository.findBySearch(boardCode = search.boardCode, name = search.name, pageable = pageable)
            .map { BoardManagerResponse.from(it) }
}
