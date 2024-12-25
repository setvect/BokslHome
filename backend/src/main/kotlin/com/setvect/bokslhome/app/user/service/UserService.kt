package com.setvect.bokslhome.app.user.service

import com.setvect.bokslhome.app.user.entity.UserEntity
import com.setvect.bokslhome.app.user.exception.UserGuideCode
import com.setvect.bokslhome.app.user.exception.UserGuideException
import com.setvect.bokslhome.app.user.model.UserInfo
import com.setvect.bokslhome.app.user.repository.UserRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository,
) {
    private val log = LoggerFactory.getLogger(UserService::class.java)

    @Transactional
    fun getUser(userId: String): UserInfo {
        val user = userRepository.findByUserId(userId) ?: throw UserGuideException("사용자를 찾을 수 없습니다.", UserGuideCode.CommonError)
        return UserInfo(user.userId, user.name, user.userRole.map { it.roleName })
    }

    fun findById(userId: String): UserEntity {
        return userRepository.findById(userId).orElseThrow {
            log.info("User not found: $userId")
            UserGuideException(UserGuideException.RESOURCE_NOT_FOUND)
        }
    }
}
