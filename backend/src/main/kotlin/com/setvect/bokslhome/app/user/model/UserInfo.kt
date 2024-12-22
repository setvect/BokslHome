package com.setvect.bokslhome.app.user.model

data class UserInfo(
    val userId: String,
    val name: String,
    val role: List<RoleName>
)

