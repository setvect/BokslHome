package com.setvect.bokslhome.app.note.controller

import com.setvect.bokslhome.app.note.model.NoteCategoryRequest
import com.setvect.bokslhome.app.note.model.NoteCategoryResponse
import com.setvect.bokslhome.app.note.service.NoteCategoryService
import com.setvect.bokslhome.util.hierarchy.TreeNode
import org.springframework.http.HttpStatus
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
@RequestMapping("/api/note-category")
class NoteCategoryController(
    private val noteCategoryService: NoteCategoryService
) {

    @PostMapping
    fun create(@RequestBody request: NoteCategoryRequest): ResponseEntity<NoteCategoryResponse> {
        val noteCategory = noteCategoryService.create(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(noteCategory)
    }

    @PutMapping("/{noteCategorySeq}")
    fun update(
        @PathVariable noteCategorySeq: Int,
        @RequestBody request: NoteCategoryRequest
    ): ResponseEntity<NoteCategoryResponse> {
        val updatedNoteCategory = noteCategoryService.update(noteCategorySeq, request)
        return ResponseEntity.ok(updatedNoteCategory)
    }

    @DeleteMapping("/{noteCategorySeq}")
    fun delete(@PathVariable noteCategorySeq: Int): ResponseEntity<Void> {
        noteCategoryService.delete(noteCategorySeq)
        return ResponseEntity.noContent().build()
    }

    @GetMapping("/{noteCategorySeq}")
    fun get(@PathVariable noteCategorySeq: Int): ResponseEntity<NoteCategoryResponse> {
        val noteCategory = noteCategoryService.get(noteCategorySeq)
        return ResponseEntity.ok(noteCategory)
    }

    @GetMapping
    fun list(): ResponseEntity<List<NoteCategoryResponse>> {
        val categories = noteCategoryService.list()
        return ResponseEntity.ok(categories)
    }

    @GetMapping("/tree")
    fun getTree(): ResponseEntity<List<TreeNode<NoteCategoryResponse>>> {
        val tree = noteCategoryService.tree()
        return ResponseEntity.ok(tree)
    }
}
