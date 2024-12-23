package com.setvect.bokslhome.app.attach.service

import com.setvect.bokslhome.app.attach.entity.AttachFileEntity
import com.setvect.bokslhome.app.attach.model.AttachFileModule
import com.setvect.bokslhome.app.attach.model.AttachFileResponse
import com.setvect.bokslhome.app.attach.repository.AttachRepository
import com.setvect.bokslhome.app.board.model.FileData
import com.setvect.bokslhome.config.BokslProperties
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.UUID
import org.apache.commons.io.FilenameUtils
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class AttachFileService(
    private val bokslProperties: BokslProperties,
    private val attachRepository: AttachRepository
) {
    private val log = LoggerFactory.getLogger(AttachFileService::class.java)
    fun storeAttach(fileDataList: List<FileData>, attachFileModule: AttachFileModule, moduleId: String): List<AttachFileEntity> {
        val today = LocalDate.now()
        val datePath = today.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"))

        val fileList = fileDataList.map { fileData ->
            val extension = FilenameUtils.getExtension(fileData.originalName)
            val uniqueFileName = if (extension.isEmpty()) {
                UUID.randomUUID().toString()
            } else {
                "${UUID.randomUUID()}.$extension"
            }
            val file = bokslProperties.getAttachFilePath().resolve(datePath).resolve(uniqueFileName)
            file.parentFile.mkdirs()
            file.outputStream().use { fileData.inputStream.copyTo(it) }

            log.info("파일 저장 경로: ${file.absolutePath}, 사이즈: ${fileData.size}")

            AttachFileEntity(
                moduleName = attachFileModule,
                moduleId = moduleId,
                originalName = fileData.originalName,
                saveName = "$datePath/$uniqueFileName",
                size = fileData.size
            )
        }
        return attachRepository.saveAll(fileList)
    }

    fun getAttachFile(moduleName: AttachFileModule, moduleId: String): List<AttachFileResponse> {
        val attachFileList = attachRepository.findByModuleNameAndModuleId(moduleName, moduleId)
        return attachFileList.map { AttachFileResponse.from(it) }
    }

    /**
     * 모듈별 첨부파일 조회
     * @param moduleName 모듈명
     * @param moduleIdList 모듈ID 리스트
     * @return 모듈ID별 첨부파일 리스트
     */
    fun getAttachFileByModuleId(moduleName: AttachFileModule, moduleIdList: List<String>): Map<String, List<AttachFileResponse>> {
        val attachFileList = attachRepository.findByModuleNameAndModuleIdIn(moduleName, moduleIdList)
        return attachFileList.groupBy { it.moduleId }.mapValues { it.value.map { AttachFileResponse.from(it) } }
    }
}
