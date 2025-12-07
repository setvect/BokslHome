package com.setvect.bokslhome.app.attach.controller

import com.setvect.bokslhome.app.attach.model.AttachFileModule
import com.setvect.bokslhome.app.attach.model.ImageUploadResponse
import com.setvect.bokslhome.app.attach.service.AttachFileHelper
import com.setvect.bokslhome.app.attach.service.AttachFileService
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/image")
class ImageUploadController(
    private val attachFileService: AttachFileService
) {
    private val log = LoggerFactory.getLogger(ImageUploadController::class.java)

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    fun uploadImage(@RequestPart("file") file: MultipartFile): ImageUploadResponse {
        // 타임스탬프 기반 고유 moduleId 생성
        val moduleId = "clipboard_${System.currentTimeMillis()}"

        log.info("클립보드 이미지 업로드 시작: ${file.originalFilename}, moduleId: $moduleId")

        // 파일 저장
        val attachFileTransferDaoList = AttachFileHelper.toAttachFileDaoList(listOf(file))
        val savedFiles = attachFileService.storeAttach(
            attachFileTransferDaoList,
            AttachFileModule.IMAGE,
            moduleId
        )

        val savedFile = savedFiles.first()
        val url = "/api/image/view/${savedFile.attachFileSeq}"

        log.info("클립보드 이미지 업로드 완료: attachFileSeq=${savedFile.attachFileSeq}, url=$url")

        return ImageUploadResponse(
            attachFileSeq = savedFile.attachFileSeq,
            url = url,
            originalName = savedFile.originalName
        )
    }

    @GetMapping("/view/{attachFileSeq}")
    fun viewImage(@PathVariable attachFileSeq: Int, response: HttpServletResponse) {
        log.info("이미지 조회 요청: attachFileSeq=$attachFileSeq")

        // IMAGE 모듈 파일 조회 (moduleId 검증 없음)
        val attachFile = attachFileService.getImageFile(attachFileSeq)

        // 이미지를 inline으로 표시 (다운로드가 아닌 브라우저에서 직접 표시)
        response.contentType = attachFile.file.let { file ->
            when (file.extension.lowercase()) {
                "jpg", "jpeg" -> "image/jpeg"
                "png" -> "image/png"
                "gif" -> "image/gif"
                "webp" -> "image/webp"
                else -> "application/octet-stream"
            }
        }
        response.setContentLength(attachFile.file.length().toInt())
        response.setHeader("Content-Disposition", "inline; filename=\"${attachFile.originalName}\"")

        attachFile.file.inputStream().use { input ->
            response.outputStream.use { output ->
                input.copyTo(output)
            }
        }
    }
}
