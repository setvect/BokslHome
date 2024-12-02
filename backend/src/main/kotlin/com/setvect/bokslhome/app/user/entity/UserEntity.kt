package com.setvect.bokslhome.app.user.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import com.setvect.bokslhome.common.converter.BooleanToYNConverter
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import java.sql.Types

/**
 * 사용자
 */
@Entity
@Table(name = "TBAA_USER")
data class UserEntity(
    @Id
    @Column(name = "USER_ID", unique = true, nullable = false, length = 20)
    val username: String,

    @Column(name = "NAME", nullable = false, length = 50)
    val name: String,

    @Column(name = "PASSWD", nullable = false, length = 60)
    @JsonIgnore
    val password: String,

    @Column(name = "DELETE_FLAG", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    val deleteFlag: Boolean = false,

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = [CascadeType.ALL])
    val userRole: Set<UserRoleEntity> = emptySet()
) {
    protected constructor() : this(
        username = "",
        name = "",
        password = ""
    )
}
