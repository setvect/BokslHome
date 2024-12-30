package com.setvect.bokslhome.app.code.model

data class CodeRequest(
    val majorCode: String,
    val minorCode: String,
    val codeValue: String,
    val orderNo: Int = 0
)
