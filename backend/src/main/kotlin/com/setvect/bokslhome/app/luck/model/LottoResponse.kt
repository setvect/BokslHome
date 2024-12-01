package com.setvect.bokslhome.app.luck.model

data class LottoResponse(
    val setList: List<LottoSetResponse>,
)

data class LottoSetResponse(
    val numberList: List<Int>,
)
