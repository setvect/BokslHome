package com.setvect.bokslhome.app.code.service

import com.setvect.bokslhome.app.code.entity.CodeEntity
import com.setvect.bokslhome.app.code.model.CodeMajorGroupResponse
import com.setvect.bokslhome.app.code.model.CodeRequest
import com.setvect.bokslhome.app.code.model.CodeResponse
import com.setvect.bokslhome.app.code.repository.CodeRepository
import com.setvect.bokslhome.util.CommonUtil
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CodeService(
    private val codeRepository: CodeRepository
) {
    private val log = LoggerFactory.getLogger(CodeService::class.java)

    @Transactional
    fun create(request: CodeRequest): CodeResponse {
        val codeEntity = CodeEntity(
            majorCode = request.majorCode,
            minorCode = request.minorCode,
            codeValue = request.codeValue,
            orderNo = request.orderNo
        )
        val savedEntity = codeRepository.save(codeEntity)
        return CodeResponse.from(savedEntity)
    }

    @Transactional
    fun update(codeSeq: Int, request: CodeRequest): CodeResponse {
        val existingCode = getCodeById(codeSeq)
        val updatedCode = existingCode.copy(
            majorCode = request.majorCode,
            minorCode = request.minorCode,
            codeValue = request.codeValue,
            orderNo = request.orderNo
        )
        val savedEntity = codeRepository.save(updatedCode)
        return CodeResponse.from(savedEntity)
    }

    @Transactional
    fun delete(codeSeq: Int) {
        codeRepository.deleteById(codeSeq)
    }

    fun get(codeSeq: Int): CodeResponse {
        val codeEntity = getCodeById(codeSeq)
        return CodeResponse.from(codeEntity)
    }

    fun page(pageable: Pageable, majorCode: String?): PagedModel<CodeResponse> {
        val codePage = codeRepository.findBySearch(pageable, CommonUtil.emptyStringNull(majorCode))
        val responsePage = codePage.map { CodeResponse.from(it) }
        return PagedModel(responsePage)
    }

    fun majorCode(): List<CodeMajorGroupResponse> {
        return codeRepository.groupByMajorCode()
    }

    private fun getCodeById(codeSeq: Int): CodeEntity {
        return codeRepository.findById(codeSeq).get()
    }
}
