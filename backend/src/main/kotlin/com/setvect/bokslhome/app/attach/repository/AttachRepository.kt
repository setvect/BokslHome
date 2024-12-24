package com.setvect.bokslhome.app.attach.repository

import com.setvect.bokslhome.app.attach.entity.AttachFileEntity
import com.setvect.bokslhome.app.attach.model.AttachFileModule
import org.springframework.data.jpa.repository.JpaRepository

interface AttachRepository : JpaRepository<AttachFileEntity, Int> {
    fun findByModuleNameAndModuleId(moduleName: AttachFileModule, moduleId: String): List<AttachFileEntity>

    fun findByModuleNameAndModuleIdIn(moduleName: AttachFileModule, moduleId: List<String>): List<AttachFileEntity>

    fun findByAttachFileSeqIsIn(attachFileSeqList: List<Int>): List<AttachFileEntity>
}
