package com.setvect.bokslhome.app.note.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.Lob
import jakarta.persistence.ManyToOne
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table
import java.sql.Types
import java.time.LocalDateTime
import org.hibernate.annotations.JdbcTypeCode

/**
 * 노트 내용
 */
@Entity
@Table(name = "TBDB_NOTE")
data class NoteEntity(
    @Id
    @Column(name = "NOTE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_seq")
    @SequenceGenerator(
        name = "note_seq",
        sequenceName = "TBDB_NOTE_SEQ",
        initialValue = 10000,
        allocationSize = 50
    )
    val noteSeq: Int = 0,

    @Column(name = "CATEGORY_SEQ", nullable = false)
    val noteCategorySeq: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_SEQ", insertable = false, updatable = false)
    val category: NoteCategoryEntity,

    @Column(name = "TITLE", nullable = false, length = 200)
    val title: String,

    @Column(name = "CONTENT", nullable = false)
    @Lob
    val content: String,

    @Column(name = "EDIT_DATE", nullable = true)
    val editDate: LocalDateTime? = null,

    @Column(name = "REG_DATE", nullable = false)
    val regDate: LocalDateTime = LocalDateTime.now(),

    @Column(name = "MARKDOWN_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val markdownF: Boolean = false,

    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false
)
