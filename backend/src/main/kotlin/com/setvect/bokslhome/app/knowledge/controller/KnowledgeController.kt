package com.setvect.bokslhome.app.knowledge.controller

import com.setvect.bokslhome.app.knowledge.model.KnowledgeRequest
import com.setvect.bokslhome.app.knowledge.model.KnowledgeResponse
import com.setvect.bokslhome.app.knowledge.service.KnowledgeService
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/knowledge")
class KnowledgeController(private val knowledgeService: KnowledgeService) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody request: KnowledgeRequest): KnowledgeResponse {
        return knowledgeService.create(request)
    }

    @PutMapping("/{knowledgeSeq}")
    fun update(
        @PathVariable knowledgeSeq: Int,
        @RequestBody request: KnowledgeRequest
    ): KnowledgeResponse {
        return knowledgeService.update(knowledgeSeq, request)
    }

    @DeleteMapping("/{knowledgeSeq}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable knowledgeSeq: Int) {
        knowledgeService.delete(knowledgeSeq)
    }

    @GetMapping("/{knowledgeSeq}")
    fun get(@PathVariable knowledgeSeq: Int): KnowledgeResponse {
        return knowledgeService.get(knowledgeSeq)
    }

    @GetMapping("/page")
    fun page(
        @RequestParam("classifyC") classifyC: String,
        @RequestParam("content", required = false) content: String?,
        pageable: Pageable
    ): PagedModel<KnowledgeResponse> {
        return knowledgeService.page(pageable, classifyC, content)
    }
}