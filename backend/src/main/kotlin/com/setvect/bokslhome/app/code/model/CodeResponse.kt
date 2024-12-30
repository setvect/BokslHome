package com.setvect.bokslhome.app.code.model

import com.setvect.bokslhome.app.code.entity.CodeEntity

data class CodeResponse(
    val codeSeq: Int = 0,
    val majorCode: String,
    val minorCode: String,
    val codeValue: String,
    val orderNo: Int = 0,
) {
    companion object {
        fun from(codeEntity: CodeEntity) = CodeResponse(
            codeSeq = codeEntity.codeSeq,
            majorCode = codeEntity.majorCode,
            minorCode = codeEntity.minorCode,
            codeValue = codeEntity.codeValue,
            orderNo = codeEntity.orderNo,
        )
    }
}
