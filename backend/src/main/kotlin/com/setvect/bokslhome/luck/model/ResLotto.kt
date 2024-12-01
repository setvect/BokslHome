package com.setvect.bokslhome.luck.model

data class ResLotto(
    val setList: List<ResLottoSet>,
)

data class ResLottoSet(
    val numberList: List<Int>,
)
