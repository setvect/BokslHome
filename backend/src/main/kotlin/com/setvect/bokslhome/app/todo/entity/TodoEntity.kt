package com.setvect.bokslhome.app.todo.entity

import com.setvect.bokslhome.app.todo.model.StatusType
import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import java.sql.Types
import java.util.*

/**
 * 할일 항목
 */
@Entity
@Table(name = "TBHA_TODO")
class TodoEntity {
    /**
     * 일련번호
     */
    @Id
    @Column(name = "TODO_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var todoSeq = 0

    /**
     * 내용
     */
    @Column(name = "CONTENT", nullable = false, length = 1000)
    private var content: String? = null

    /**
     * 체크 유형
     */
    @Column(name = "STATUS_TYPE", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private var statusType: StatusType? = null

    /**
     * 체크일
     */
    @Column(name = "CHECK_DATE", nullable = true)
    private var checkDate: Date? = null

    /**
     * 등록일
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
}
