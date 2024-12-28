package com.setvect.bokslhome.app.note.repository

import com.setvect.bokslhome.app.note.entity.NoteCategoryEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface NoteCategoryRepository : JpaRepository<NoteCategoryEntity, Int> {

    @Query("SELECT n FROM NoteCategoryEntity n WHERE n.deleteF = false")
    fun findActiveList(): List<NoteCategoryEntity>

    @Modifying
    @Transactional
    @Query("UPDATE NoteCategoryEntity m SET m.deleteF = true WHERE m.id = :id")
    fun deleteUpdate(@Param("id") noteCategorySeq: Int): Int
}
