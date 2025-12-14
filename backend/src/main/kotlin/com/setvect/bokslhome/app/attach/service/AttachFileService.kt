package com.setvect.bokslhome.app.attach.service

import com.setvect.bokslhome.app.attach.entity.AttachFileEntity
import com.setvect.bokslhome.app.attach.model.AttachFileDto
import com.setvect.bokslhome.app.attach.model.AttachFileModule
import com.setvect.bokslhome.app.attach.model.AttachFileResponse
import com.setvect.bokslhome.app.attach.repository.AttachRepository
import com.setvect.bokslhome.app.attach.model.AttachFileTransferDao
import com.setvect.bokslhome.app.user.exception.UserGuideCode
import com.setvect.bokslhome.app.user.exception.UserGuideException
import com.setvect.bokslhome.config.BokslProperties
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.UUID
import org.apache.commons.io.FilenameUtils
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.File

@Service
class AttachFileService(
    private val bokslProperties: BokslProperties,
    private val attachRepository: AttachRepository
) {
    private val log = LoggerFactory.getLogger(AttachFileService::class.java)
    fun storeAttach(
        attachFileTransferDaoList: List<AttachFileTransferDao>,
        attachFileModule: AttachFileModule,
        moduleId: String
    ): List<AttachFileEntity> {
        val today = LocalDate.now()
        val datePath = today.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"))

        val fileList = attachFileTransferDaoList.map { fileData ->
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

    fun getAttachFileList(moduleName: AttachFileModule, moduleId: String): List<AttachFileResponse> {
        val attachFileList = attachRepository.findByModuleNameAndModuleId(moduleName, moduleId)
        return attachFileList.map { AttachFileResponse.from(it) }
    }

    fun getAttachFileList(moduleName: AttachFileModule, moduleIdList: List<String>): Map<String, List<AttachFileResponse>> {
        val attachFileList = attachRepository.findByModuleNameAndModuleIdIn(moduleName, moduleIdList)
        return attachFileList.groupBy { it.moduleId }.mapValues { it.value.map { AttachFileResponse.from(it) } }
    }

    fun getAttachFile(attachFileSeq: Int, module: AttachFileModule, moduleId: String): AttachFileDto {
        val attachFile = attachRepository.findById(attachFileSeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        if (attachFile.moduleName != module || attachFile.moduleId != moduleId) {
            throw UserGuideException(UserGuideException.FORBIDDEN, UserGuideCode.PermissionDenied)
        }
        val file = File(bokslProperties.getAttachFilePath(), attachFile.saveName)
        if (!file.exists()) {
            log.warn("파일이 없음: {}", file.absolutePath)
            throw UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund)
        }
        return AttachFileDto.from(attachFile, file)
    }


    fun deleteAttachFileList(attachFileSeqList: List<Int>, module: AttachFileModule, moduleId: String) {
        val attachFile = attachRepository.findByAttachFileSeqIsIn(attachFileSeqList)

        attachFile.forEach {
            if (it.moduleId != moduleId || it.moduleName != module) {
                throw UserGuideException(UserGuideException.FORBIDDEN, UserGuideCode.PermissionDenied)
            }
        }

        attachFile.forEach {
            val file = File(bokslProperties.getAttachFilePath(), it.saveName)
            log.info("첨부파일 삭제: ${file.absolutePath}")
            file.delete()
        }

        attachRepository.deleteAllById(attachFileSeqList)
    }

    /**
     * IMAGE 모듈 전용 파일 조회 (moduleId 검증 없이 IMAGE 모듈만 확인)
     */
    fun getImageFile(attachFileSeq: Int): AttachFileDto {
        val attachFile = attachRepository.findById(attachFileSeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }

        // IMAGE 모듈인지만 확인
        if (attachFile.moduleName != AttachFileModule.IMAGE) {
            throw UserGuideException(UserGuideException.FORBIDDEN, UserGuideCode.PermissionDenied)
        }

        val file = File(bokslProperties.getAttachFilePath(), attachFile.saveName)
        if (!file.exists()) {
            log.warn("파일이 없음: {}", file.absolutePath)
            throw UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund)
        }
        return AttachFileDto.from(attachFile, file)
    }
}
