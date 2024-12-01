package com.setvect.bokslhome.luck.controller

import com.setvect.bokslhome.luck.model.ResLotto
import com.setvect.bokslhome.luck.model.ResLottoSet
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import kotlin.random.Random

@RestController
@RequestMapping("/luck")
class LottoController {

    @GetMapping("/lotto")
    fun generateLottoNumbers(): ResLotto {
        val seed = System.currentTimeMillis()
        val random = Random(seed + "Boksl".hashCode())

        val setCount = random.nextInt(1, 6)
        val resLottoSets = (1..setCount).map { _ ->
            ResLottoSet(
                numberList = (1..45).shuffled(random).take(6).sorted(),
            )
        }
        return ResLotto(setList = resLottoSets)
    }
}
