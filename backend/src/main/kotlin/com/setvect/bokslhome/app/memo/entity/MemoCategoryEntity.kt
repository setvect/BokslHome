package com.setvect.bokslhome.app.memo.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var categorySeq = 0

    /**
     * 이름
     */
    @Column(name = "NAME", nullable = false, length = 200)
    private var name: String? = null
}
