package com.setvect.bokslhome.app.memo.controller

import com.setvect.bokslhome.app.memo.model.MemoRequest
import com.setvect.bokslhome.app.memo.model.MemoResponse
import com.setvect.bokslhome.app.memo.service.MemoService
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
@RequestMapping("/api/memo")
class MemoController(
    private val memoService: MemoService
) {
    @PostMapping
    fun createMemo(@RequestBody memoRequest: MemoRequest): ResponseEntity<MemoResponse> {
        val memoResponse = memoService.create(memoRequest)
        return ResponseEntity.ok(memoResponse)
    }

    @PutMapping("/{memoSeq}")
    fun updateMemo(
        @PathVariable memoSeq: Int,
        @RequestBody memoRequest: MemoRequest
    ): ResponseEntity<MemoResponse> {
        val memoResponse = memoService.update(memoSeq, memoRequest)
        return ResponseEntity.ok(memoResponse)
    }

    @DeleteMapping("/{memoSeq}")
    fun deleteMemo(@PathVariable memoSeq: Int): ResponseEntity<Void> {
        memoService.delete(memoSeq)
        return ResponseEntity.noContent().build()
    }

    @GetMapping("/{memoSeq}")
    fun getMemo(@PathVariable memoSeq: Int): ResponseEntity<MemoResponse> {
        val memoResponse = memoService.get(memoSeq)
        return ResponseEntity.ok(memoResponse)
    }

    @GetMapping("/category/{categorySeq}")
    fun listMemosByCategory(@PathVariable categorySeq: Int): ResponseEntity<List<MemoResponse>> {
        val memoResponseList = memoService.listByCategory(categorySeq)
        return ResponseEntity.ok(memoResponseList)
    }

    @GetMapping
    fun listAllMemos(): ResponseEntity<List<MemoResponse>> {
        val memoResponseList = memoService.listAll()
        return ResponseEntity.ok(memoResponseList)
    }
}
