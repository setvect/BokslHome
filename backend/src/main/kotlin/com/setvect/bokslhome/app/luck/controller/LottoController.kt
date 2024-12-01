package com.setvect.bokslhome.app.luck.controller

import com.setvect.bokslhome.app.luck.model.LottoResponse
import com.setvect.bokslhome.app.luck.model.LottoSetResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import kotlin.random.Random

@RestController
@RequestMapping("/luck")
class LottoController {

    @GetMapping("/lotto")
    fun generateLottoNumbers(): LottoResponse {
        val seed = System.currentTimeMillis()
        val random = Random(seed + "Boksl".hashCode())

        val setCount = random.nextInt(1, 6)
        val lottoSetResponses = (1..setCount).map { _ ->
            LottoSetResponse(
                numberList = (1..45).shuffled(random).take(6).sorted(),
            )
        }
        return LottoResponse(setList = lottoSetResponses)
    }
}
