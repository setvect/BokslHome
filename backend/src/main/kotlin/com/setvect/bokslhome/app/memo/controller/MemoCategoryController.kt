package com.setvect.bokslhome.app.memo.controller

import com.setvect.bokslhome.app.memo.model.MemoCategoryRequest
import com.setvect.bokslhome.app.memo.model.MemoCategoryResponse
import com.setvect.bokslhome.app.memo.service.MemoCategoryService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/memo-category")
class MemoCategoryController(
    private val memoCategoryService: MemoCategoryService
) {

    @PostMapping
    fun create(@RequestBody memoCategoryRequest: MemoCategoryRequest): ResponseEntity<MemoCategoryResponse> {
        val response = memoCategoryService.create(memoCategoryRequest)
        return ResponseEntity.ok(response)
    }

    @PutMapping("/{memoCategorySeq}")
    fun update(
        @PathVariable memoCategorySeq: Int,
        @RequestBody memoCategoryRequest: MemoCategoryRequest
    ): ResponseEntity<MemoCategoryResponse> {
        val response = memoCategoryService.update(memoCategorySeq, memoCategoryRequest)
        return ResponseEntity.ok(response)
    }

    @DeleteMapping("/{memoCategorySeq}")
    fun delete(@PathVariable memoCategorySeq: Int): ResponseEntity<Void> {
        memoCategoryService.delete(memoCategorySeq)
        return ResponseEntity.noContent().build()
    }

    @GetMapping
    fun list(): ResponseEntity<List<MemoCategoryResponse>> {
        val response = memoCategoryService.list()
        return ResponseEntity.ok(response)
    }
}
