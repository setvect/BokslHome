package com.setvect.bokslhome.app.luck.controller

import com.setvect.bokslhome.app.luck.model.LottoResponse
import com.setvect.bokslhome.app.luck.model.LottoSetResponse
import java.time.LocalDate
import kotlin.random.Random
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class LottoController {
    @GetMapping("/lotto")
    fun generateLottoNumbers(): LottoResponse {
        val daySeed = LocalDate.now().toEpochDay()
        val random = Random(daySeed + "Boksl".hashCode())

        val setCount = random.nextInt(1, 6)
        val lottoSetResponses =
            (1..setCount).map { _ ->
                LottoSetResponse(
                    numberList = (1..45).shuffled(random).take(6).sorted(),
                )
            }
        return LottoResponse(setList = lottoSetResponses)
    }
}
