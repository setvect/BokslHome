package com.setvect.bokslhome.app.board.service

import com.setvect.bokslhome.app.board.entity.BoardManagerEntity
import com.setvect.bokslhome.app.board.repoistory.BoardManagerRepository
import org.springframework.stereotype.Service

@Service
class BoardManagerService(
    private val boardManagerRepository: BoardManagerRepository
) {
    /**
     * 게시판 생성
     */
    fun create(boardManager: BoardManagerEntity): BoardManagerEntity {
        return boardManagerRepository.save(boardManager)
    }

    /**
     * 게시판 조회
     */
    fun get(boardCode: String): BoardManagerEntity {
        return boardManagerRepository.findById(boardCode)
            .orElseThrow { IllegalArgumentException("게시판을 찾을 수 없습니다: $boardCode") }
    }

    /**
     * 모든 게시판 목록 조회
     */
    fun getAll(): List<BoardManagerEntity> {
        return boardManagerRepository.findAll()
    }

    /**
     * 게시판 수정
     */
    fun update(boardManager: BoardManagerEntity): BoardManagerEntity {
        get(boardManager.boardCode!!)
        return boardManagerRepository.save(boardManager)
    }

    /**
     * 게시판 삭제
     */
    fun delete(boardCode: String) {
        boardManagerRepository.deleteById(boardCode)
    }
}
