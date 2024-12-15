package com.setvect.bokslhome.app.memo.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.sql.Types
import java.util.Date
import org.hibernate.annotations.JdbcTypeCode

/**
 * 메모장
 */
@Entity
@Table(name = "TBCB_MEMO")
data class MemoEntity(
    @Id
    @Column(name = "MEMO_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    val memoSeq: Int = 0,
    @Column(name = "CONTENT", nullable = false, length = 4000)
    val content: String,
    @Column(name = "FONT_CSS", nullable = false, length = 20)
    val fontCss: String,
    @Column(name = "BG_CSS", nullable = false, length = 20)
    val bgCss: String,
    @Column(name = "Z_INDEX", nullable = false)
    val zIndex: Int = 0,
    @Column(name = "WIDTH", nullable = false)
    val width: Int = 0,
    @Column(name = "HEIGHT", nullable = false)
    val height: Int = 0,
    @Column(name = "POSITION_X", nullable = false)
    val positionX: Int = 0,
    @Column(name = "POSITION_Y", nullable = false)
    val positionY: Int = 0,
    @Column(name = "EDIT_DATE", nullable = false)
    val editDate: Date = Date(),
    @Column(name = "REG_DATE", nullable = false)
    val regDate: Date = Date(),
    @Column(name = "DELETE_F", nullable = false)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_SEQ", nullable = false)
    val category: MemoCategoryEntity,
) {
    protected constructor() : this(
        content = "",
        fontCss = "",
        bgCss = "",
        category = MemoCategoryEntity(),
    )
}
