package com.setvect.bokslhome.app.user.entity

import com.setvect.bokslhome.app.user.model.RoleName
import jakarta.persistence.*

/**
 * 권한
 */
@Entity
@Table(name = "TBAB_ROLE")
class UserRoleEntity {
    /**
     * 일련번호
     */
    @Id
    @Column(name = "ROLE_SEQ")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var roleSeq = 0

    /**
     * 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", nullable = false)
    private val user: UserEntity? = null

    /**
     * 권한 이름
     */
    @Column(name = "ROLE_NAME", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private var roleName: RoleName? = null
}
