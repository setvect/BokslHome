package com.setvect.bokslhome.app.board.controller

import com.setvect.bokslhome.app.board.model.BoardArticleCreateRequest
import com.setvect.bokslhome.app.board.model.BoardArticleDto
import com.setvect.bokslhome.app.board.model.BoardArticleSearch
import com.setvect.bokslhome.app.board.service.BoardArticleService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/board-article")
class BoardArticleController(
    private val boardArticleService: BoardArticleService
) {
    /**
     * 게시물 생성
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(
        @RequestBody request: BoardArticleCreateRequest,
        httpRequest: HttpServletRequest
    ): BoardArticleDto {
        val clientIp = httpRequest.remoteAddr
        return boardArticleService.create(request, clientIp, "setvect")
    }

    /**
     * 게시물 수정
     */
    @PutMapping("/{boardArticleSeq}")
    fun update(
        @PathVariable boardArticleSeq: Int,
        @RequestBody request: BoardArticleCreateRequest,
        httpRequest: HttpServletRequest,
        @AuthenticationPrincipal userDetails: UserDetails
    ): BoardArticleDto {
        val clientIp = httpRequest.getRemoteAddr()
        return boardArticleService.update(boardArticleSeq, request, userDetails.username, clientIp)
    }

    /**
     * 게시물 삭제
     */
    @DeleteMapping("/{boardArticleSeq}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable boardArticleSeq: Int) {
        boardArticleService.delete(boardArticleSeq)
    }

    /**
     * 게시물 단건 조회
     */
    @GetMapping("/{boardArticleSeq}")
    fun get(@PathVariable boardArticleSeq: Int): BoardArticleDto {
        return boardArticleService.get(boardArticleSeq)
    }

    /**
     * 게시물 페이징 목록 조회
     */
    @GetMapping("/list")
    fun list(
        search: BoardArticleSearch,
        pageable: Pageable
    ): Page<BoardArticleDto> {
        return boardArticleService.list(search, pageable)
    }
}
