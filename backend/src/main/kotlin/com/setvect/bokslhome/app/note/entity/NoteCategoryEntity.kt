package com.setvect.bokslhome.app.note.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table
import java.sql.Types
import java.time.LocalDateTime
import org.hibernate.annotations.JdbcTypeCode

/**
 * 노트 카테고리
 */
@Entity
@Table(name = "TBDA_NOTE_CATEGORY")
data class NoteCategoryEntity(
    @Id
    @Column(name = "CATEGORY_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "note_category_seq")
    @SequenceGenerator(
        name = "note_category_seq",
        sequenceName = "TBDA_NOTE_CATEGORY_SEQ",
        initialValue = 10000,
        allocationSize = 50
    )
    val categorySeq: Int = 0,

    @ManyToOne
    @JoinColumn(name = "PARENT_ID", nullable = false)
    val parent: NoteCategoryEntity?,

    @OneToMany(mappedBy = "parent", cascade = [CascadeType.ALL])
    val children: List<NoteCategoryEntity> = emptyList(),

    @Column(name = "NAME", nullable = false, length = 50)
    val name: String,

    @Column(name = "REG_DATE", nullable = false)
    val regDate: LocalDateTime = LocalDateTime.now(),

    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false,
)
