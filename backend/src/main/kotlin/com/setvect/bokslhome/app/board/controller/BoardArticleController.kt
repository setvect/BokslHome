package com.setvect.bokslhome.app.board.controller

import com.setvect.bokslhome.app.attach.service.AttachFileHelper
import com.setvect.bokslhome.app.board.model.BoardArticleCreateRequest
import com.setvect.bokslhome.app.board.model.BoardArticleModifyRequest
import com.setvect.bokslhome.app.board.model.BoardArticleResponse
import com.setvect.bokslhome.app.board.model.BoardArticleSearchRequest
import com.setvect.bokslhome.app.board.service.BoardArticleService
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/board-article")
class BoardArticleController(private val boardArticleService: BoardArticleService) {
    private val log = LoggerFactory.getLogger(BoardArticleController::class.java)

    /** 게시물 생성 */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(
        @RequestPart("request") request: BoardArticleCreateRequest,
        @RequestPart("attachFileList", required = false) attachFileList: List<MultipartFile>?,
        httpRequest: HttpServletRequest,
        @AuthenticationPrincipal userDetails: UserDetails
    ): BoardArticleResponse {
        request.ip = httpRequest.remoteAddr
        val attachFileDaoList = AttachFileHelper.toAttachFileDaoList(attachFileList)
        return boardArticleService.create(request, attachFileDaoList, userDetails)
    }

    /** 게시물 수정 */
    @PutMapping("/{boardArticleSeq}")
    fun update(
        @PathVariable boardArticleSeq: Int,
        @RequestPart request: BoardArticleModifyRequest,
        @RequestPart("attachFileList", required = false) attachFileList: List<MultipartFile>?,
        httpRequest: HttpServletRequest,
        @AuthenticationPrincipal userDetails: UserDetails
    ): BoardArticleResponse {
        request.boardArticleSeq = boardArticleSeq
        request.ip = httpRequest.remoteAddr
        val attachFileDaoList = AttachFileHelper.toAttachFileDaoList(attachFileList)
        return boardArticleService.update(request, attachFileDaoList, userDetails)
    }

    /** 게시물 삭제 */
    @DeleteMapping("/{boardArticleSeq}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(
        @PathVariable boardArticleSeq: Int,
        @AuthenticationPrincipal userDetails: UserDetails
    ) =
        boardArticleService.delete(boardArticleSeq, userDetails)

    /** 게시물 단건 조회 */
    @GetMapping("/{boardArticleSeq}")
    fun get(
        @PathVariable boardArticleSeq: Int,
        @AuthenticationPrincipal userDetails: UserDetails?
    ): BoardArticleResponse {
        return boardArticleService.get(boardArticleSeq)
    }

    /** 게시물 페이징 목록 조회 */
    @GetMapping("/page")
    fun page(
        search: BoardArticleSearchRequest, pageable: Pageable,
        @AuthenticationPrincipal userDetails: UserDetails?
    ): PagedModel<BoardArticleResponse> = boardArticleService.page(pageable, search, userDetails)

    @GetMapping("/download/{boardArticleSeq}/{attachFileSeq}")
    fun download(@PathVariable boardArticleSeq: Int, @PathVariable attachFileSeq: Int, response: HttpServletResponse) {
        val attachFile = boardArticleService.getAttachFile(boardArticleSeq, attachFileSeq)
        AttachFileHelper.prepareFileDownload(response, attachFile)
    }
}
