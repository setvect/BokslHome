package com.setvect.bokslhome.app.knowledge.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Lob
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table
import java.sql.Types
import java.time.LocalDateTime
import org.hibernate.annotations.JdbcTypeCode

/**
 * 지식정보
 */
@Entity
@Table(name = "TBEA_KNOWLEDGE")
data class KnowledgeEntity(
    @Id
    @Column(name = "KNOWLEDGE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "knowledge_seq")
    @SequenceGenerator(
        name = "knowledge_seq",
        sequenceName = "TBEA_KNOWLEDGE_SEQ",
        initialValue = 10000,
        allocationSize = 50
    )
    val knowledgeSeq: Int = 0,

    @Column(name = "CLASSIFY_C", nullable = false, length = 20)
    val classifyC: String,

    @Column(name = "PROBLEM", nullable = false)
    @Lob
    val problem: String,

    @Column(name = "SOLUTION", nullable = true)
    @Lob
    val solution: String? = null,

    @Column(name = "REG_DATE", nullable = false)
    val regDate: LocalDateTime = LocalDateTime.now(),

    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false,
) {
    protected constructor() : this(
        classifyC = "",
        problem = "",
    )
}
