package com.setvect.bokslhome.util

class CommonUtil {
    companion object {
        fun emptyStringNull(string: String?) =
            if (string.isNullOrEmpty()) null else string
    }
}
