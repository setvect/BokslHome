package com.setvect.bokslhome.app.board.service

import com.setvect.bokslhome.app.board.model.BoardManagerCreateRequest
import com.setvect.bokslhome.app.board.model.BoardManagerResponse
import com.setvect.bokslhome.app.board.model.BoardManagerSearchRequest
import com.setvect.bokslhome.app.board.repoistory.BoardManagerRepository
import com.setvect.bokslhome.app.user.exception.UserGuideCode
import com.setvect.bokslhome.app.user.exception.UserGuideException
import com.setvect.bokslhome.util.CommonUtil
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.stereotype.Service

@Service
class BoardManagerService(private val boardManagerRepository: BoardManagerRepository) {

    private val log = LoggerFactory.getLogger(BoardManagerService::class.java)

    fun create(request: BoardManagerCreateRequest): BoardManagerResponse {
        val entity = request.toEntity()
        val savedEntity = boardManagerRepository.save(entity)
        return BoardManagerResponse.from(savedEntity)
    }

    fun get(boardCode: String): BoardManagerResponse {
        val entity = boardManagerRepository.findById(boardCode)
            .orElseThrow {
                log.warn("게시판을 찾을 수 없습니다: $boardCode")
                UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund)
            }
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

    fun page(search: BoardManagerSearchRequest, pageable: Pageable): PagedModel<BoardManagerResponse> {
        val page = boardManagerRepository.findBySearch(
            pageable,
            CommonUtil.emptyStringNull(search.boardCode),
            CommonUtil.emptyStringNull(search.name)
        )
            .map { BoardManagerResponse.from(it) }
        return PagedModel(page)
    }
}
