package com.setvect.bokslhome.app.board.controller

import com.setvect.bokslhome.app.board.model.AttachFileDao
import com.setvect.bokslhome.app.board.model.BoardArticleCreateRequest
import com.setvect.bokslhome.app.board.model.BoardArticleModifyRequest
import com.setvect.bokslhome.app.board.model.BoardArticleResponse
import com.setvect.bokslhome.app.board.model.BoardArticleSearch
import com.setvect.bokslhome.app.board.service.BoardArticleService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
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
    /** 게시물 생성 */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(
        @RequestPart("request") request: BoardArticleCreateRequest,
        @RequestPart("attachFileList", required = false) attachFileList: List<MultipartFile>?,
        httpRequest: HttpServletRequest,
        @AuthenticationPrincipal userDetails: UserDetails
    ): BoardArticleResponse {
        val clientIp = httpRequest.remoteAddr

        // 스트림으로 파일 처리
        val attachFileDaoList = attachFileList?.map { file ->
            AttachFileDao(
                originalName = file.originalFilename ?: "",
                contentType = file.contentType ?: "",
                inputStream = file.inputStream,
                size = file.size.toInt()
            )
        } ?: emptyList()

        return boardArticleService.create(request, attachFileDaoList, clientIp, userDetails)
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
        val clientIp = httpRequest.remoteAddr
        val attachFileDaoList = attachFileList?.map { file ->
            AttachFileDao(
                originalName = file.originalFilename ?: "",
                contentType = file.contentType ?: "",
                inputStream = file.inputStream,
                size = file.size.toInt()
            )
        } ?: emptyList()
        return boardArticleService.update(boardArticleSeq, request, attachFileDaoList, clientIp, userDetails)
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
    ): BoardArticleResponse =
        boardArticleService.get(boardArticleSeq)

    /** 게시물 페이징 목록 조회 */
    @GetMapping("/list")
    fun list(
        search: BoardArticleSearch, pageable: Pageable,
        @AuthenticationPrincipal userDetails: UserDetails?
    ): Page<BoardArticleResponse> {
        return boardArticleService.list(search, pageable, userDetails)
    }
}
