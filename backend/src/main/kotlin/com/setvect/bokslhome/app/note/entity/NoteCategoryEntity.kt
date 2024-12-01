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
class NoteCategoryEntity {
    /**
     * 일련번호
     */
    @Id
    @Column(name = "CATEGORY_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var categorySeq = 0

    /**
     * 부모 카테고리 아이디
     */
    @ManyToOne
    @JoinColumn(name = "PARENT_ID", nullable = false)
    private val parent: NoteCategoryEntity? = null

    /**
     * 자식<br></br>
     */
    @OneToMany(mappedBy = "parent", cascade = [CascadeType.ALL])
    private val children: List<NoteCategoryEntity>? = null

    /**
     * 이름
     */
    @Column(name = "NAME", nullable = false, length = 50)
    private var name: String? = null

    /**
     * 처음 등록일
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
