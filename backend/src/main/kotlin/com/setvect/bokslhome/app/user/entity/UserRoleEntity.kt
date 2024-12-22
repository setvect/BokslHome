package com.setvect.bokslhome.app.user.entity

import com.setvect.bokslhome.app.user.model.RoleName
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.persistence.SequenceGenerator
/**
 * 권한
 */
@Entity
@Table(name = "TBAB_ROLE")
data class UserRoleEntity(
    @Id
    @Column(name = "ROLE_SEQ")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_seq")
    @SequenceGenerator(
        name = "role_seq",
        sequenceName = "TBAB_ROLE_SEQ",
        initialValue = 10000,
        allocationSize = 50
    )
    val roleSeq: Int = 0,
    @Column(name = "ROLE_NAME", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    val roleName: RoleName,
) {
    protected constructor() : this(
        roleName = RoleName.ROLE_USER,
    )
}
