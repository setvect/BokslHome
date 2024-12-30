package com.setvect.bokslhome.app.board.service

import com.setvect.bokslhome.app.attach.model.AttachFileDto
import com.setvect.bokslhome.app.attach.model.AttachFileModule
import com.setvect.bokslhome.app.attach.model.AttachFileTransferDao
import com.setvect.bokslhome.app.attach.service.AttachFileService
import com.setvect.bokslhome.app.board.entity.BoardArticleEntity
import com.setvect.bokslhome.app.board.model.BoardArticleCreateRequest
import com.setvect.bokslhome.app.board.model.BoardArticleModifyRequest
import com.setvect.bokslhome.app.board.model.BoardArticleResponse
import com.setvect.bokslhome.app.board.model.BoardArticleSearchRequest
import com.setvect.bokslhome.app.board.repoistory.BoardArticleRepository
import com.setvect.bokslhome.app.board.repoistory.BoardManagerRepository
import com.setvect.bokslhome.app.user.exception.UserGuideCode
import com.setvect.bokslhome.app.user.exception.UserGuideException
import com.setvect.bokslhome.app.user.repository.UserRepository
import com.setvect.bokslhome.app.user.service.UserService
import com.setvect.bokslhome.util.CommonUtil
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class BoardArticleService(
    private val boardArticleRepository: BoardArticleRepository,
    private val boardManagerRepository: BoardManagerRepository,
    private val userRepository: UserRepository,
    private val attachFileService: AttachFileService,
    private val userService: UserService
) {
    private val log = LoggerFactory.getLogger(BoardArticleService::class.java)

    @Transactional
    fun create(
        request: BoardArticleCreateRequest,
        attachFileTransferDaoList: List<AttachFileTransferDao>,
        userDetails: UserDetails
    ): BoardArticleResponse {
        val boardManager = boardManagerRepository.findById(request.boardCode)
            .orElseThrow {
                log.warn("게시판을 찾을 수 없습니다: ${request.boardCode}")
                UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund)
            }
        val user = userService.findById(userDetails.username)
        val boardArticleEntity = BoardArticleEntity(
            boardManager = boardManager,
            user = user,
            title = request.title,
            content = request.content,
            ip = request.ip!!,
            encryptF = request.encryptF,
        )

        val savedEntity = boardArticleRepository.save(boardArticleEntity)
        attachFileService.storeAttach(attachFileTransferDaoList, AttachFileModule.BOARD, boardArticleEntity.boardArticleSeq.toString())
        val attachFileList = attachFileService.getAttachFileList(AttachFileModule.BOARD, savedEntity.boardArticleSeq.toString())
        return BoardArticleResponse.from(savedEntity, attachFileList)
    }

    @Transactional
    fun update(
        request: BoardArticleModifyRequest,
        attachFileTransferDaoList: List<AttachFileTransferDao>,
        userDetails: UserDetails
    ): BoardArticleResponse {
        val existingArticle = boardArticleRepository.findById(request.boardArticleSeq!!)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        if (existingArticle.deleteF) {
            throw UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund)
        }
        val user = userRepository.findById(userDetails.username)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        if (existingArticle.user.userId != user.userId && !user.isAdmin()) {
            throw UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund)
        }

        val modifiedArticle = BoardArticleEntity(
            boardArticleSeq = existingArticle.boardArticleSeq,
            boardManager = existingArticle.boardManager,
            user = user,
            title = request.title,
            content = request.content,
            ip = request.ip!!,
            encryptF = request.encryptF
        )
        val boardArticleEntity = boardArticleRepository.save(modifiedArticle)
        attachFileService.deleteAttachFileList(
            request.deleteAttachFileSeqList ?: emptyList(),
            AttachFileModule.BOARD,
            request.boardArticleSeq.toString()
        )

        attachFileService.storeAttach(attachFileTransferDaoList, AttachFileModule.BOARD, request.boardArticleSeq.toString())
        val attachFileList = attachFileService.getAttachFileList(AttachFileModule.BOARD, request.boardArticleSeq.toString())

        return BoardArticleResponse.from(boardArticleEntity, attachFileList)
    }

    fun delete(boardArticleSeq: Int, userDetails: UserDetails) {
        boardArticleRepository.deleteUpdate(boardArticleSeq)
    }

    fun get(boardArticleSeq: Int): BoardArticleResponse {
        val boardArticle = boardArticleRepository.findById(boardArticleSeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }

        if (boardArticle.deleteF) {
            log.info("삭제된 게시물 {}", boardArticleSeq)
            throw UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund)
        }

        val attachFileList = attachFileService.getAttachFileList(AttachFileModule.BOARD, boardArticleSeq.toString())
        return BoardArticleResponse.from(boardArticle, attachFileList)
    }

    fun page(pageable: Pageable, search: BoardArticleSearchRequest, userDetails: UserDetails?): PagedModel<BoardArticleResponse> {
        val boardArticlePage = boardArticleRepository.findBySearch(
            pageable = pageable,
            boardCode = search.boardCode,
            title = CommonUtil.emptyStringNull(search.title),
            content = CommonUtil.emptyStringNull(search.content)
        )
        val attachFileList =
            attachFileService.getAttachFileList(
                AttachFileModule.BOARD,
                boardArticlePage.content.map { it.boardArticleSeq.toString() })
        val page = boardArticlePage.map { BoardArticleResponse.from(it, attachFileList[it.boardArticleSeq.toString()] ?: emptyList()) }
        return PagedModel(page)
    }

    fun getAttachFile(boardArticleSeq: Int, attachFileSeq: Int): AttachFileDto {
        boardArticleRepository.findById(boardArticleSeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        return attachFileService.getAttachFile(attachFileSeq, AttachFileModule.BOARD, boardArticleSeq.toString())
    }
}
