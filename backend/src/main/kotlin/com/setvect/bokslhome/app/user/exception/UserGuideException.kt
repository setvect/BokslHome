package com.setvect.bokslhome.app.user.exception

import org.springframework.http.HttpStatus

class UserGuideException(override val message: String, val code: UserGuideCode = UserGuideCode.CommonError) : RuntimeException(message) {
    companion object {
        const val RESOURCE_NOT_FOUND = "찾을수 없음"
        const val FORBIDDEN = "권한 없음"
        const val LOGIN_FAIL = "로그인 실패"
    }
}

enum class UserGuideCode(val httpStatus: HttpStatus) {
    LoginFailed(HttpStatus.UNAUTHORIZED),
    CommonError(HttpStatus.INTERNAL_SERVER_ERROR),
    NotFund(HttpStatus.NOT_FOUND),
    PermissionDenied(HttpStatus.FORBIDDEN)
}
