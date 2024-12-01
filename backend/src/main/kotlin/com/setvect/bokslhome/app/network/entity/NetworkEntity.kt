package com.setvect.bokslhome.app.network.entity

import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import java.sql.Types
import java.util.*

@Entity
@Table(name = "TBFA_NETWORK")
class NetworkEntity {
    @Id
    @Column(name = "NETWORK_SEQ", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var networkSeq = 0

    @Column(name = "TITLE", nullable = false, length = 200)
    private var title: String? = null

    @Column(name = "CONTENT", nullable = false)
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private var content: String? = null

    @Column(name = "REG_DATE", nullable = false)
    private var regDate: Date? = null

    @Column(name = "EDIT_DATE", nullable = false)
    private var editDate: Date? = null

    @Column(name = "DELETE_F", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    private var deleteF = false
}
