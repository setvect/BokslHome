package com.setvect.bokslhome.app.knowledge.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import java.sql.Types
import java.util.*

/**
 * 지식정보
 */
@Entity
@Table(name = "TBEA_KNOWLEDGE")
class KnowledgeEntity {
    /**
     * key
     */
    @Id
    @Column(name = "KNOWLEDGE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var knowledgeSeq = 0

    /**
     * 분류 코드
     */
    @Column(name = "CLASSIFY_C", nullable = false, length = 20)
    private var classifyC: String? = null

    /**
     * 문제
     */
    @Column(name = "PROBLEM", nullable = false)
    @Lob
    private var problem: String? = null

    /**
     * 해법
     */
    @Column(name = "SOLUTION", nullable = true)
    @Lob
    private var solution: String? = null

    /**
     * 등록일
     */
    @Column(name = "REG_DATE", nullable = false)
    private var regDate: Date? = null

    /**
     * 삭제여부
     */
    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    private var deleteF = false
}
