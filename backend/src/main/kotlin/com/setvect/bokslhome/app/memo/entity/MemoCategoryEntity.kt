package com.setvect.bokslhome.app.memo.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table

/**
 * 메모장 카테고리 정보
 */
@Entity
@Table(name = "TBCA_MEMO_CATEGORY")
data class MemoCategoryEntity(
    @Id
    @Column(name = "CATEGORY_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "memo_category_seq")
    @SequenceGenerator(
        name = "memo_category_seq",
        sequenceName = "TBCA_MEMO_CATEGORY_SEQ",
        initialValue = 10000,
        allocationSize = 50
    )
    val memoCategorySeq: Int = 0,

    @Column(name = "NAME", nullable = false, length = 200)
    val name: String
)
