package com.setvect.bokslhome.app.board.service

import com.setvect.bokslhome.app.attach.model.AttachFileModule
import com.setvect.bokslhome.app.attach.service.AttachFileService
import com.setvect.bokslhome.app.board.entity.BoardArticleEntity
import com.setvect.bokslhome.app.board.model.BoardArticleCreateRequest
import com.setvect.bokslhome.app.board.model.BoardArticleResponse
import com.setvect.bokslhome.app.board.model.BoardArticleSearch
import com.setvect.bokslhome.app.board.model.AttachFileDao
import com.setvect.bokslhome.app.board.model.BoardArticleModifyRequest
import com.setvect.bokslhome.app.board.repoistory.BoardArticleRepository
import com.setvect.bokslhome.app.board.repoistory.BoardManagerRepository
import com.setvect.bokslhome.app.user.exception.UserGuideException
import com.setvect.bokslhome.app.user.repository.UserRepository
import java.util.Optional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service

@Service
class BoardArticleService(
    private val boardArticleRepository: BoardArticleRepository,
    private val boardManagerRepository: BoardManagerRepository,
    private val userRepository: UserRepository,
    private val attachFileService: AttachFileService
) {
    fun create(request: BoardArticleCreateRequest, attachFileDaoList: List<AttachFileDao>, ip: String, userDetails: UserDetails): BoardArticleResponse {
        val boardManager = boardManagerRepository.findById(request.boardCode)
            .orElseThrow { IllegalArgumentException("게시판을 찾을 수 없습니다: ${request.boardCode}") }
        val user = Optional.ofNullable(userDetails)
            .map { userRepository.findById(it.username).orElseThrow { IllegalArgumentException("사용자를 찾을 수 없습니다: $it") } }.get()
        val boardArticleEntity = request.toEntity(boardManager, ip, user)
        val savedEntity = boardArticleRepository.save(boardArticleEntity)
        attachFileService.storeAttach(attachFileDaoList, AttachFileModule.BOARD, boardArticleEntity.boardArticleSeq.toString())
        val attachFileList = attachFileService.getAttachFile(AttachFileModule.BOARD, savedEntity.boardArticleSeq.toString())
        return BoardArticleResponse.from(savedEntity, attachFileList)
    }

    fun update(
        boardArticleSeq: Int,
        request: BoardArticleModifyRequest,
        attachFileDaoList: List<AttachFileDao>,
        ip: String,
        userDetails: UserDetails,
    ): BoardArticleResponse {
        val existingArticle = boardArticleRepository.findById(boardArticleSeq)
            .orElseThrow { UserGuideException("게시물을 찾을 수 없습니다") }
        if (existingArticle.deleteF) {
            throw UserGuideException("삭제된 게시물입니다")
        }
        val user = userRepository.findById(userDetails.username).orElseThrow { UserGuideException("로그인정보가 없습니다.") }
        val entity = BoardArticleEntity(
                boardArticleSeq = existingArticle.boardArticleSeq,
                boardManager = existingArticle.boardManager,
                user = user,
                title = request.title,
                content = request.content,
                ip = ip,
            encryptF = request.encryptF
        )
        val savedEntity = boardArticleRepository.save(entity)
        attachFileService.storeAttach(attachFileDaoList, AttachFileModule.BOARD, boardArticleSeq.toString())
        val attachFileList = attachFileService.getAttachFile(AttachFileModule.BOARD, savedEntity.boardArticleSeq.toString())
        return BoardArticleResponse.from(savedEntity, attachFileList)
    }

    fun delete(boardArticleSeq: Int, userDetails: UserDetails) {
        boardArticleRepository.deleteUpdate(boardArticleSeq)
    }

    fun get(boardArticleSeq: Int): BoardArticleResponse {
        val boardArticle = boardArticleRepository.findById(boardArticleSeq)
            .orElseThrow { UserGuideException("게시물을 찾을 수 없습니다") }

        if (boardArticle.deleteF) {
            throw UserGuideException("삭제된 게시물입니다")
        }

        val attachFileList = attachFileService.getAttachFile(AttachFileModule.BOARD, boardArticleSeq.toString())
        return BoardArticleResponse.from(boardArticle, attachFileList)
    }

    fun list(search: BoardArticleSearch, pageable: Pageable, userDetails: UserDetails?): Page<BoardArticleResponse> {
        val boardArticlePage = boardArticleRepository.findBySearch(
            boardCode = search.boardCode,
            title = search.title,
            content = search.content,
            pageable = pageable
        )
        val attachFileList =
            attachFileService.getAttachFileByModuleId(
                AttachFileModule.BOARD,
                boardArticlePage.content.map { it.boardArticleSeq.toString() })
        return boardArticlePage.map { BoardArticleResponse.from(it, attachFileList[it.boardArticleSeq.toString()] ?: emptyList()) }
    }
}
