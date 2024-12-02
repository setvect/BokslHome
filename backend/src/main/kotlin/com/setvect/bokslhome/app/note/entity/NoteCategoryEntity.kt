package com.setvect.bokslhome.app.note.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import java.sql.Types
import java.util.*

/**
 * 노트 카테고리
 */
@Entity
@Table(name = "TBDA_NOTE_CATEGORY")
data class NoteCategoryEntity(
    @Id
    @Column(name = "CATEGORY_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    val categorySeq: Int = 0,

    @ManyToOne
    @JoinColumn(name = "PARENT_ID", nullable = false)
    val parent: NoteCategoryEntity?,

    @OneToMany(mappedBy = "parent", cascade = [CascadeType.ALL])
    val children: List<NoteCategoryEntity> = emptyList(),

    @Column(name = "NAME", nullable = false, length = 50)
    val name: String,

    @Column(name = "REG_DATE", nullable = false)
    val regDate: Date = Date(),

    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false
)
