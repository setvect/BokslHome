package com.setvect.bokslhome.app.attach.controller

import com.setvect.bokslhome.app.attach.service.AttachFileService
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * 기존 시스템 호환성을 위한 레거시 이미지 조회 컨트롤러
 * 기존 경로: /attach/image?attachFileSeq=8761
 */
@RestController
@RequestMapping("/attach")
class AttachController(
    private val imageUploadController: ImageUploadController
) {
    private val log = LoggerFactory.getLogger(AttachController::class.java)

    @GetMapping("/image")
    fun getImage(@RequestParam("attachFileSeq") attachFileSeq: Int, response: HttpServletResponse) {
        log.info("이미지 조회 요청 (레거시 경로): attachFileSeq=$attachFileSeq")
        // ImageUploadController의 viewImage 메서드 재사용
        imageUploadController.viewImage(attachFileSeq, response)
    }
}
