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
class NoteEntity {
    /**
     * 일련번호
     */
    @Id
    @Column(name = "NOTE_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var noteSeq = 0

    /**
     * 본 필드 필요하다. 지우지 마라<br></br>
     * NoteCategoryVo 값 넣어도 Insert 시점에서 등록 안된다.
     */
    @Column(name = "CATEGORY_SEQ", nullable = false)
    private var categorySeq = 0

    /**
     * 카테고리
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_SEQ", insertable = false, updatable = false)
    private val category: NoteCategoryEntity? = null

    /**
     * 제목
     */
    @Column(name = "TITLE", nullable = false, length = 200)
    private var title: String? = null

    /**
     * 내용
     */
    @Column(name = "CONTENT", nullable = false)
    @Lob
    private var content: String? = null

    /**
     * 마지막 수정일
     */
    @Column(name = "EDIT_DATE", nullable = true)
    private var editDate: Date? = null

    /**
     * 처음 등록일
     */
    @Column(name = "REG_DATE", nullable = false)
    private var regDate: Date? = null

    /**
     * 마크다운 문서 여부
     */
    @Column(name = "MARKDOWN_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    private var markdownF = false

    /**
     * 삭제여부
     */
    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    private var deleteF = false
}
