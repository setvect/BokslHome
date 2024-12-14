package com.setvect.bokslhome.app.board.controller

import com.setvect.bokslhome.app.board.model.BoardManagerCreateRequest
import com.setvect.bokslhome.app.board.model.BoardManagerDto
import com.setvect.bokslhome.app.board.model.BoardManagerSearch
import com.setvect.bokslhome.app.board.service.BoardManagerService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/board-manager")
class BoardManagerController(
    private val boardManagerService: BoardManagerService
) {
    /**
     * 게시판 생성
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody request: BoardManagerCreateRequest): BoardManagerDto {
        return boardManagerService.create(request)
    }

    /**
     * 게시판 수정
     */
    @PutMapping("/{boardCode}")
    fun update(
        @PathVariable boardCode: String,
        @RequestBody request: BoardManagerCreateRequest
    ): BoardManagerDto {
        require(boardCode == request.boardCode) { "게시판 코드가 일치하지 않습니다." }
        return boardManagerService.update(request)
    }

    /**
     * 게시판 삭제
     */
    @DeleteMapping("/{boardCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable boardCode: String) {
        boardManagerService.delete(boardCode)
    }

    /**
     * 게시판 단건 조회
     */
    @GetMapping("/{boardCode}")
    fun get(@PathVariable boardCode: String): BoardManagerDto {
        return boardManagerService.get(boardCode)
    }

    /**
     * 게시판 전체 목록
     */
    @GetMapping("/list")
    fun getAll(): List<BoardManagerDto> {
        return boardManagerService.getAll()
    }

    /**
     * 게시판 페이징 목록 조회
     */
    @GetMapping("/page")
    fun getPageList(
        search: BoardManagerSearch,
        pageable: Pageable
    ): Page<BoardManagerDto> {
        return boardManagerService.getPageList(search, pageable)
    }
} 