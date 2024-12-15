package com.setvect.bokslhome.app.todo.entity

import com.setvect.bokslhome.app.todo.model.StatusType
import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.sql.Types
import java.util.Date
import org.hibernate.annotations.JdbcTypeCode

/**
 * 할일 항목
 */
@Entity
@Table(name = "TBHA_TODO")
data class TodoEntity(
    @Id
    @Column(name = "TODO_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    val todoSeq: Int = 0,
    @Column(name = "CONTENT", nullable = false, length = 1000)
    val content: String,
    @Column(name = "STATUS_TYPE", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    val statusType: StatusType,
    @Column(name = "CHECK_DATE", nullable = true)
    val checkDate: Date? = null,
    @Column(name = "REG_DATE", nullable = false)
    val regDate: Date = Date(),
    @Column(name = "DELETE_F", nullable = false)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false,
) {
    protected constructor() : this(
        content = "",
        statusType = StatusType.PLAN,
    )
}
