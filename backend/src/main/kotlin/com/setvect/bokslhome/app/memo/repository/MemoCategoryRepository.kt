package com.setvect.bokslhome.app.memo.repository

import com.setvect.bokslhome.app.memo.entity.MemoCategoryEntity
import org.springframework.data.jpa.repository.JpaRepository

interface MemoCategoryRepository : JpaRepository<MemoCategoryEntity, Int>
