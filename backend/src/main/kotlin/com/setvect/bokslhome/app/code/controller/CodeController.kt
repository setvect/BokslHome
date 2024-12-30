package com.setvect.bokslhome.app.code.controller

import com.setvect.bokslhome.app.code.model.CodeMajorGroupResponse
import com.setvect.bokslhome.app.code.model.CodeRequest
import com.setvect.bokslhome.app.code.model.CodeResponse
import com.setvect.bokslhome.app.code.service.CodeService
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/code")
class CodeController(private val codeService: CodeService) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody request: CodeRequest): CodeResponse {
        return codeService.create(request)
    }

    @PutMapping("/{codeSeq}")
    fun update(
        @PathVariable codeSeq: Int,
        @RequestBody request: CodeRequest
    ): CodeResponse {
        return codeService.update(codeSeq, request)
    }

    @DeleteMapping("/{codeSeq}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable codeSeq: Int) {
        codeService.delete(codeSeq)
    }

    @GetMapping("/{codeSeq}")
    fun get(@PathVariable codeSeq: Int): CodeResponse {
        return codeService.get(codeSeq)
    }

    @GetMapping("/page")
    fun page(
        @RequestParam("majorCode", required = false) majorCode: String?,
        pageable: Pageable
    ): PagedModel<CodeResponse> {
        return codeService.page(pageable, majorCode)
    }

    @GetMapping("/majorCode")
    fun majorCode(
    ): List<CodeMajorGroupResponse> {
        return codeService.majorCode()
    }
}
