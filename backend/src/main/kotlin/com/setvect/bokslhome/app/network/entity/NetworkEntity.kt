package com.setvect.bokslhome.app.network.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.Basic
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Lob
import jakarta.persistence.Table
import jakarta.persistence.SequenceGenerator
import java.sql.Types
import java.util.Date
import org.hibernate.annotations.JdbcTypeCode

@Entity
@Table(name = "TBFA_NETWORK")
data class NetworkEntity(
    @Id
    @Column(name = "NETWORK_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "network_seq")
    @SequenceGenerator(
        name = "network_seq",
        sequenceName = "TBFA_NETWORK_SEQ",
        initialValue = 10000,
        allocationSize = 50
    )
    val networkSeq: Int = 0,
    @Column(name = "TITLE", nullable = false, length = 200)
    val title: String,
    @Column(name = "CONTENT", nullable = false)
    @Lob
    @Basic(fetch = FetchType.LAZY)
    val content: String,
    @Column(name = "REG_DATE", nullable = false)
    val regDate: Date = Date(),
    @Column(name = "EDIT_DATE", nullable = false)
    val editDate: Date = Date(),
    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteF: Boolean = false,
) {
    protected constructor() : this(
        title = "",
        content = "",
    )
}
