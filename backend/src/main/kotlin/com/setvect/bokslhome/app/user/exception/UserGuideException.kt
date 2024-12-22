package com.setvect.bokslhome.app.user.exception

import org.springframework.http.HttpStatus

class UserGuideException(override val message: String, val code: UserGuideCode = UserGuideCode.CommonError) : RuntimeException(message)

enum class UserGuideCode(val httpStatus: HttpStatus) {
    LoginFailed(HttpStatus.UNAUTHORIZED),
    CommonError(HttpStatus.INTERNAL_SERVER_ERROR)
}
