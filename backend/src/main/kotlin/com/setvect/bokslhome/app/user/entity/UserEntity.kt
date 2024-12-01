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
class UserEntity {
    /**
     * 사용자 아이디
     */
    @Id
    @Column(name = "USER_ID", unique = true, nullable = false, length = 20)
    var username: String? = null

    /**
     * 이름
     */
    @Column(name = "NAME", nullable = false, length = 50)
    private var name: String? = null

    /**
     * @return 비밀번호
     */
    /**
     * 비밀번호
     */
    @Column(name = "PASSWD", nullable = false, length = 60)
    @JsonIgnore
    var password: String? = null

    /**
     * 삭제 여부
     */
    @Column(name = "DELETE_FLAG", nullable = false, length = 1)
    @JdbcTypeCode(Types.CHAR)
    @Convert(converter = BooleanToYNConverter::class)
    private var deleteFlag = false

    /**
     * 보유 권한
     */
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = [CascadeType.ALL])
    private val userRole: Set<UserRoleEntity>? = null
}
