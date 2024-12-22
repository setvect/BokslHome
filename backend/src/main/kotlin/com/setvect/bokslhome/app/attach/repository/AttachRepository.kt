package com.setvect.bokslhome.app.attach.repository

import com.setvect.bokslhome.app.attach.entity.AttachFileEntity
import org.springframework.data.jpa.repository.JpaRepository

interface AttachRepository : JpaRepository<AttachFileEntity, Int> {
}
