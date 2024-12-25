package com.setvect.bokslhome.app.comment.controller

import com.setvect.bokslhome.app.comment.model.CommentModule
import com.setvect.bokslhome.app.comment.model.CommentRequest
import com.setvect.bokslhome.app.comment.model.CommentResponse
import com.setvect.bokslhome.app.comment.service.CommentService
import jakarta.validation.Valid
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/comments")
class CommentController(
    private val commentService: CommentService,
) {

    @PostMapping
    fun createComment(
        @RequestBody @Valid commentRequest: CommentRequest,
        @AuthenticationPrincipal userDetails: UserDetails,
        @RequestParam("module") module: CommentModule,
        @RequestParam("moduleId") moduleId: String
    ): ResponseEntity<CommentResponse> {
        val comment = commentService.create(commentRequest, userDetails, module, moduleId)
        return ResponseEntity.ok(comment)
    }

    @PutMapping("/{commentId}")
    fun updateComment(
        @PathVariable commentId: Int,
        @RequestBody @Valid commentRequest: CommentRequest,
        @AuthenticationPrincipal userDetails: UserDetails
    ): ResponseEntity<CommentResponse> {
        val comment = commentService.update(commentId, commentRequest, userDetails)
        return ResponseEntity.ok(comment)
    }

    @DeleteMapping("/{commentId}")
    fun deleteComment(
        @PathVariable commentId: Int,
        @AuthenticationPrincipal userDetails: UserDetails
    ): ResponseEntity<Void> {
        commentService.delete(commentId, userDetails)
        return ResponseEntity.noContent().build()
    }

    @GetMapping
    fun getComments(
        pageable: Pageable,
        @RequestParam("module") module: CommentModule,
        @RequestParam("moduleId") moduleId: String
    ): ResponseEntity<PagedModel<CommentResponse>> {
        val pagedComments = commentService.page(pageable, module, moduleId)
        return ResponseEntity.ok(pagedComments)
    }
}
