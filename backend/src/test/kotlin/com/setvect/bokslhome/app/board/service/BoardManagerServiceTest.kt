package com.setvect.bokslhome.app.board.service

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.slf4j.LoggerFactory
import org.springframework.test.context.ActiveProfiles

@SpringBootTest
@ActiveProfiles("test") // 테스트 프로파일 사용 (선택사항)
class BoardManagerServiceTest {
    private val log = LoggerFactory.getLogger(javaClass)

    @Autowired
    private lateinit var boardManagerService: BoardManagerService

    @Test
    fun getAll() {
        // when
        val list = boardManagerService.getAll()

        // then
        log.info("게시판 목록 조회 결과:")
        list.forEach { board ->
            log.info("게시판 코드: ${board.boardCode}")
        }
    }
}
