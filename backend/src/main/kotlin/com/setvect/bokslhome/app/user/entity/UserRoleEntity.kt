package com.setvect.bokslhome.app.user.entity

import com.setvect.bokslhome.app.user.model.RoleName
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

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
    @Column(name = "ROLE_NAME", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    val roleName: RoleName,
) {
    protected constructor() : this(
        roleName = RoleName.ROLE_USER,
    )
}
