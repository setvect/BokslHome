package com.setvect.bokslhome.app.note.controller

import com.setvect.bokslhome.app.attach.service.AttachFileHelper
import com.setvect.bokslhome.app.note.model.NoteCreateRequest
import com.setvect.bokslhome.app.note.model.NoteModifyRequest
import com.setvect.bokslhome.app.note.model.NoteResponse
import com.setvect.bokslhome.app.note.service.NoteService
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
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/note")
class NoteController(private val noteService: NoteService) {
    private val log = LoggerFactory.getLogger(NoteController::class.java)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(
        @RequestPart("request") request: NoteCreateRequest,
        @RequestPart("attachFileList", required = false) attachFileList: List<MultipartFile>?,
    ): NoteResponse {
        val attachFileTransferDaoList = AttachFileHelper.toAttachFileDaoList(attachFileList)
        return noteService.create(request, attachFileTransferDaoList)
    }

    @PutMapping("/{noteSeq}")
    fun update(
        @PathVariable noteSeq: Int,
        @RequestPart("request") request: NoteModifyRequest,
        @RequestPart("attachFileList", required = false) attachFileList: List<MultipartFile>?,
    ): NoteResponse {
        val attachFileTransferDaoList = AttachFileHelper.toAttachFileDaoList(attachFileList)
        return noteService.update(noteSeq, request, attachFileTransferDaoList)
    }

    @DeleteMapping("/{noteSeq}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(
        @PathVariable noteSeq: Int,
        @AuthenticationPrincipal userDetails: UserDetails
    ) {
        noteService.delete(noteSeq, userDetails)
    }

    @GetMapping("/{noteSeq}")
    fun get(@PathVariable noteSeq: Int): NoteResponse {
        return noteService.get(noteSeq)
    }

    @GetMapping("/page")
    fun page(
        @RequestParam("noteCategorySeq", required = false) noteCategorySeq: Int?,
        @RequestParam("title", required = false) title: String?,
        @RequestParam("content", required = false) content: String?,
        pageable: Pageable
    ): PagedModel<NoteResponse> {
        return noteService.page(pageable, noteCategorySeq, title, content)
    }

    @GetMapping("/download/{noteSeq}/{attachFileSeq}")
    fun download(
        @PathVariable noteSeq: Int,
        @PathVariable attachFileSeq: Int,
        response: HttpServletResponse
    ) {
        val attachFile = noteService.getAttachFile(noteSeq, attachFileSeq)
        AttachFileHelper.prepareFileDownload(response, attachFile)
    }
}
