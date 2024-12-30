package com.setvect.bokslhome.app.network.controller

import com.setvect.bokslhome.app.network.model.NetworkRequest
import com.setvect.bokslhome.app.network.model.NetworkResponse
import com.setvect.bokslhome.app.network.service.NetworkService
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/network")
class NetworkController(private val networkService: NetworkService) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody request: NetworkRequest): NetworkResponse {
        return networkService.create(request)
    }

    @PutMapping("/{networkSeq}")
    fun update(
        @PathVariable networkSeq: Int,
        @RequestBody request: NetworkRequest
    ): NetworkResponse {
        return networkService.update(networkSeq, request)
    }

    @DeleteMapping("/{networkSeq}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable networkSeq: Int) {
        networkService.delete(networkSeq)
    }

    @GetMapping("/{networkSeq}")
    fun get(@PathVariable networkSeq: Int): NetworkResponse {
        return networkService.get(networkSeq)
    }

    @GetMapping("/page")
    fun page(
        @RequestParam("title", required = false) title: String?,
        pageable: Pageable
    ): PagedModel<NetworkResponse> {
        return networkService.page(pageable, title)
    }
}
