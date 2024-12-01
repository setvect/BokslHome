package com.setvect.bokslhome.app.memo.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.*
import lombok.Getter
import lombok.Setter
import org.hibernate.annotations.JdbcTypeCode
import java.sql.Types
import java.util.*

/**
 * 메모장
 */
@Entity
@Table(name = "TBCB_MEMO")
@Getter
@Setter
class MemoEntity {
    /**
     * 일련번호
     */
    @Id
    @Column(name = "MEMO_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var memoSeq = 0

    /**
     * 내용
     */
    @Column(name = "CONTENT", nullable = false, length = 4000)
    private var content: String? = null

    /**
     * 글자색 css
     */
    @Column(name = "FONT_CSS", nullable = false, length = 20)
    private var fontCss: String? = null

    /**
     * 배경색 css
     */
    @Column(name = "BG_CSS", nullable = false, length = 20)
    private var bgCss: String? = null

    /**
     * HTML 레이어에서 Z-INDEX
     */
    @Column(name = "Z_INDEX", nullable = false)
    private var zIndex = 0

    /**
     * 넓이(픽셀)
     */
    @Column(name = "WIDTH", nullable = false)
    private var width = 0

    /**
     * 높이(픽셀
     */
    @Column(name = "HEIGHT", nullable = false)
    private var height = 0

    /**
     * 좌표 X
     */
    @Column(name = "POSITION_X", nullable = false)
    private var positionX = 0

    /**
     * 좌표 Y
     */
    @Column(name = "POSITION_Y", nullable = false)
    private var positionY = 0

    /**
     * 마지막 수정일
     */
    @Column(name = "EDIT_DATE", nullable = false)
    private var editDate: Date? = null

    /**
     * 처음 등록일
     */
    @Column(name = "REG_DATE", nullable = false)
    private var regDate: Date? = null

    /**
     * 삭제여부
     */
    @Column(name = "DELETE_F", nullable = false)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    private var deleteF = false

    /**
     * 워크스페이스 일련번호
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_SEQ", nullable = false)
    private val category: MemoCategoryEntity? = null
}
