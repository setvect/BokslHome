package com.setvect.bokslhome.app.comment.service

import com.setvect.bokslhome.app.comment.entity.CommentEntity
import com.setvect.bokslhome.app.comment.model.CommentModule
import com.setvect.bokslhome.app.comment.model.CommentRequest
import com.setvect.bokslhome.app.comment.model.CommentResponse
import com.setvect.bokslhome.app.comment.repository.CommentRepository
import com.setvect.bokslhome.app.user.exception.UserGuideException
import com.setvect.bokslhome.app.user.service.UserService
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service

@Service
class CommentService(
    private val commentRepository: CommentRepository,
    private val userService: UserService
) {
    private val log = LoggerFactory.getLogger(CommentService::class.java)

    fun create(commentRequest: CommentRequest, userDetails: UserDetails, commentModule: CommentModule, moduleId: String): CommentResponse {
        val userEntity = userService.findById(userDetails.username)
        val commentEntity = CommentEntity(
            moduleName = commentModule,
            moduleId = moduleId,
            user = userEntity,
            content = commentRequest.content
        )
        val comment = commentRepository.save(commentEntity)
        return CommentResponse.from(comment)
    }

    fun update(commandSeq: Int, commentRequest: CommentRequest, userDetails: UserDetails): CommentResponse {
        val userEntity = userService.findById(userDetails.username)
        val commentEntity =
            commentRepository.findById(commandSeq).orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND) }

        if (commentEntity.user.userId != userEntity.userId) {
            throw UserGuideException(UserGuideException.FORBIDDEN)
        }

        val updatedCommentEntity = commentEntity.copy(content = commentRequest.content)
        val comment = commentRepository.save(updatedCommentEntity)
        return CommentResponse.from(comment)
    }

    fun delete(commentId: Int, userDetails: UserDetails) {
        val userEntity = userService.findById(userDetails.username)
        val commentEntity = commentRepository.findById(commentId)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND) }

        if (commentEntity.user.userId != userEntity.userId) {
            throw UserGuideException(UserGuideException.FORBIDDEN)
        }

        commentRepository.delete(commentEntity)
    }

    fun page(pageable: Pageable, moduleName: CommentModule, moduleId: String): PagedModel<CommentResponse> {
        val comments = commentRepository.findByModuleNameAndModuleIdOrderByCommentSeqDesc(pageable, moduleName, moduleId)
        val page = comments.map { CommentResponse.from(it) }
        return PagedModel(page)
    }
}
