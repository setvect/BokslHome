package com.setvect.bokslhome.app.board.repoistory

import com.setvect.bokslhome.app.board.entity.BoardManagerEntity
import org.springframework.data.jpa.repository.JpaRepository

/**
 * 게시판 관리
 */
interface BoardManagerRepository : JpaRepository<BoardManagerEntity, String>
