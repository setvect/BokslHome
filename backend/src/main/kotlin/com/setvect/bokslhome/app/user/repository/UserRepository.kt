package com.setvect.bokslhome.app.user.repository

import com.setvect.bokslhome.app.user.entity.UserEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

/**
 * 사용자 관리
 */
interface UserRepository : JpaRepository<UserEntity, String> {
    @Query("""
        SELECT u 
        FROM UserEntity u
        WHERE (:userId IS NULL OR LOWER(u.userId) LIKE LOWER(CONCAT('%', :userId, '%')))
        AND (:name IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%')))
    """)
    fun findBySearch(
        userId: String?,
        name: String?,
        pageable: Pageable
    ): Page<UserEntity>

    fun findByUserId(userId: String): UserEntity?
} 