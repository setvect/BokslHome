package com.setvect.bokslhome.app

import java.io.File

/**
 * 상수 정의.
 */
object BokslPortalConstant {
    /**
     * 테스트 실행 여부을 알수 있는 System property 이름
     */
    const val TEST_CHECK_PROPERTY_NAME: String = "test_run"

    /**
     * js, css 등 웹 자원 파일 캐싱을 하지위한 값<br></br>
     * src="${request.contextPath}/boksl.js?<%=com.setvect.bokslmoney.BokslPortalConstant.CACHE_VER%>"
     */
    val CACHE_VER: Long = System.currentTimeMillis()

    /**
     * WHERE 절 replace를 하기 위함.
     */
    const val SQL_WHERE: String = "{WHERE}"

    /**
     * 로그인 관련 상수.
     */
    object Login {
        /**
         * 로그인 아이디(고정)
         */
        const val ID: String = "setvect"

        /**
         * remember 관련.
         */
        const val REMEMBER_ME_KEY: String = "bokslLoginKey"

        /**
         * remember 관련.
         */
        const val REMEMBER_COOKIE_NAME: String = "bokslCookie"
    }

    object Attach {
        /**
         * 파일 저장 기본 경로
         */
        @JvmField
        val BASE_DIR: File = File("")

        /**
         * 업로드 허용하는 확장자
         */
        val ALLOW_EXT: List<String> = listOf()

        /**
         * 이미지 확장자
         */
        val IMAGE_EXT: List<String> = listOf()
    }
}
