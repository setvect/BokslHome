package com.setvect.bokslhome.app.attach.service

import com.setvect.bokslhome.app.attach.model.AttachFileDto
import com.setvect.bokslhome.app.attach.model.AttachFileTransferDao
import jakarta.servlet.http.HttpServletResponse
import java.net.URLConnection
import java.net.URLEncoder
import org.springframework.web.multipart.MultipartFile

class AttachFileHelper() {
    companion object {
        /** MultipartFile 목록을 AttachFileDao 목록으로 변환 */
        fun toAttachFileDaoList(attachFileList: List<MultipartFile>?): List<AttachFileTransferDao> {
            return attachFileList?.map { file ->
                AttachFileTransferDao(
                    originalName = file.originalFilename ?: "",
                    contentType = file.contentType ?: "",
                    inputStream = file.inputStream,
                    size = file.size.toInt()
                )
            } ?: emptyList()
        }

        fun prepareFileDownload(response: HttpServletResponse, attachFile: AttachFileDto) {
            val encodedFilename = URLEncoder.encode(attachFile.originalName, "UTF-8").replace("+", "%20")
            response.contentType = URLConnection.guessContentTypeFromName(attachFile.originalName)
            response.setContentLength(attachFile.file.length().toInt())
            response.setHeader(
                "Content-Disposition",
                "attachment; filename=\"$encodedFilename\"; filename*=UTF-8''$encodedFilename"
            )
            attachFile.file.inputStream().use { input ->
                response.outputStream.use { output ->
                    input.copyTo(output)
                }
            }
        }
    }
}
