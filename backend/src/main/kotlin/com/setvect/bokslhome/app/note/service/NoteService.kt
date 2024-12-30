package com.setvect.bokslhome.app.note.service

import com.setvect.bokslhome.app.attach.model.AttachFileDto
import com.setvect.bokslhome.app.attach.model.AttachFileModule
import com.setvect.bokslhome.app.attach.model.AttachFileTransferDao
import com.setvect.bokslhome.app.attach.service.AttachFileService
import com.setvect.bokslhome.app.note.entity.NoteCategoryEntity
import com.setvect.bokslhome.app.note.entity.NoteEntity
import com.setvect.bokslhome.app.note.model.NoteCreateRequest
import com.setvect.bokslhome.app.note.model.NoteModifyRequest
import com.setvect.bokslhome.app.note.model.NoteResponse
import com.setvect.bokslhome.app.note.repository.NoteCategoryRepository
import com.setvect.bokslhome.app.note.repository.NoteRepository
import com.setvect.bokslhome.app.user.exception.UserGuideCode
import com.setvect.bokslhome.app.user.exception.UserGuideException
import com.setvect.bokslhome.util.CommonUtil
import java.time.LocalDateTime
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class NoteService(
    private val noteRepository: NoteRepository,
    private val noteCategoryRepository: NoteCategoryRepository,
    private val attachFileService: AttachFileService
) {
    private val log = LoggerFactory.getLogger(NoteService::class.java)

    @Transactional
    fun create(request: NoteCreateRequest, attachFileTransferDaoList: List<AttachFileTransferDao>): NoteResponse {
        val noteEntity = NoteEntity(
            noteCategorySeq = request.noteCategorySeq,
            category = getNoteCategoryById(request.noteCategorySeq),
            title = request.title,
            content = request.content,
            markdownF = request.markdownF,
            regDate = LocalDateTime.now(),
            editDate = LocalDateTime.now(),
            deleteF = false
        )

        val savedEntity = noteRepository.save(noteEntity)
        attachFileService.storeAttach(attachFileTransferDaoList, AttachFileModule.NOTE, savedEntity.noteSeq.toString())

        val attachFileList = attachFileService.getAttachFileList(AttachFileModule.NOTE, savedEntity.noteSeq.toString())
        return NoteResponse.from(savedEntity, attachFileList)
    }

    @Transactional
    fun update(
        noteSeq: Int,
        request: NoteModifyRequest,
        attachFileTransferDaoList: List<AttachFileTransferDao>
    ): NoteResponse {
        val existingNote = getNoteById(noteSeq)

        val updatedNote = existingNote.copy(
            title = request.title,
            content = request.content,
            markdownF = request.markdownF
        )

        val savedEntity = noteRepository.save(updatedNote)
        attachFileService.deleteAttachFileList(request.deleteAttachFileSeqList ?: emptyList(), AttachFileModule.NOTE, noteSeq.toString())
        attachFileService.storeAttach(attachFileTransferDaoList, AttachFileModule.NOTE, noteSeq.toString())
        val attachFileList = attachFileService.getAttachFileList(AttachFileModule.NOTE, noteSeq.toString())

        return NoteResponse.from(savedEntity, attachFileList)
    }

    fun delete(noteSeq: Int, userDetails: UserDetails) {
        noteRepository.deleteUpdate(noteSeq)
    }

    fun get(noteSeq: Int): NoteResponse {
        val noteEntity = getNoteById(noteSeq)
        val attachFileList = attachFileService.getAttachFileList(AttachFileModule.NOTE, noteSeq.toString())
        return NoteResponse.from(noteEntity, attachFileList)
    }

    fun page(pageable: Pageable, categorySeq: Int, title: String?, content: String?): PagedModel<NoteResponse> {
        val notePage =
            noteRepository.findBySearch(pageable, categorySeq, CommonUtil.emptyStringNull(title), CommonUtil.emptyStringNull(content))

        val attachFileListMap = attachFileService.getAttachFileList(
            AttachFileModule.NOTE,
            notePage.content.map { it.noteSeq.toString() }
        )

        val responsePage = notePage.map {
            NoteResponse.from(it, attachFileListMap[it.noteSeq.toString()] ?: emptyList())
        }
        return PagedModel(responsePage)
    }

    private fun getNoteById(noteSeq: Int): NoteEntity {
        return noteRepository.findById(noteSeq).get()
    }

    private fun getNoteCategoryById(noteCategorySeq: Int): NoteCategoryEntity {
        return noteCategoryRepository.findById(noteCategorySeq).get()
    }

    fun getAttachFile(noteSeq: Int, attachFileSeq: Int): AttachFileDto {
        noteRepository.findById(noteSeq)
            .orElseThrow { UserGuideException(UserGuideException.RESOURCE_NOT_FOUND, UserGuideCode.NotFund) }
        return attachFileService.getAttachFile(attachFileSeq, AttachFileModule.NOTE, noteSeq.toString())
    }
}
