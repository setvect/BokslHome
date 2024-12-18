package com.setvect.bokslhome.app.user.entity

import com.setvect.bokslhome.app.user.model.RoleName
import jakarta.persistence.*

/**
 * 권한
 */
@Entity
@Table(name = "TBAB_ROLE")
data class UserRoleEntity(
    @Id
    @Column(name = "ROLE_SEQ")
    @GeneratedValue(strategy = GenerationType.AUTO)
    val roleSeq: Int = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", nullable = false)
    val user: UserEntity,

    @Column(name = "ROLE_NAME", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    val roleName: RoleName
) {
    protected constructor() : this(
        user = UserEntity("","",""),
        roleName = RoleName.ROLE_USER
    )
}
