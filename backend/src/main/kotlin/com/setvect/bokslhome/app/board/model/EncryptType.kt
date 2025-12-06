package com.setvect.bokslhome.app.board.model

enum class EncryptType {
    HEX,      // 기존 방식 (호환성 유지)
    AES_GCM   // 새로운 AES-256-GCM 방식
}
