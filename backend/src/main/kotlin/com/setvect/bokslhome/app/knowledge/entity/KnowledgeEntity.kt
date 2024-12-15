package com.setvect.bokslhome.app.knowledge.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Lob
import jakarta.persistence.Table
import java.sql.Types
import java.util.Date
import org.hibernate.annotations.JdbcTypeCode

/**
 * 지식정보
 */
@Entity
@Table(name = "TBEA_KNOWLEDGE")
data class KnowledgeEntity(
    @Id
    @Column(name = "KNOWLEDGE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    val regDate: Date = Date(),
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
