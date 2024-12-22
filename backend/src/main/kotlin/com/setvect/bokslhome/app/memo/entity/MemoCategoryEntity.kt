package com.setvect.bokslhome.app.memo.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table
import lombok.Getter
import lombok.Setter

/**
 * 메모장 카테고리 정보
 */
@Entity
@Table(name = "TBCA_MEMO_CATEGORY")
@Getter
@Setter
class MemoCategoryEntity {
    /**
     * 일련번호
     */
    @Id
    @Column(name = "CATEGORY_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "memo_category_seq")
    @SequenceGenerator(
        name = "memo_category_seq",
        sequenceName = "TBCA_MEMO_CATEGORY_SEQ",
        initialValue = 10000,
        allocationSize = 50
    )
    private var categorySeq = 0

    /**
     * 이름
     */
    @Column(name = "NAME", nullable = false, length = 200)
    private var name: String? = null
}
