package com.setvect.bokslhome.app.note.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import java.sql.Types
import java.util.*

/**
 * 노트 내용
 */
@Entity
@Table(name = "TBDB_NOTE")
data class NoteEntity(
    @Id
    @Column(name = "NOTE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    val noteSeq: Int = 0,

    @Column(name = "CATEGORY_SEQ", nullable = false)
    val categorySeq: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_SEQ", insertable = false, updatable = false)
    val category: NoteCategoryEntity,

    @Column(name = "TITLE", nullable = false, length = 200)
    val title: String,

    @Column(name = "CONTENT", nullable = false)
    @Lob
    val content: String,

    @Column(name = "EDIT_DATE", nullable = true)
    val editDate: Date? = null,

    @Column(name = "REG_DATE", nullable = false)
    val regDate: Date = Date(),

    @Column(name = "MARKDOWN_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val markdownF: Boolean = false,

    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false
)
