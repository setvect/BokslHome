package com.setvect.bokslhome.util

import java.io.ByteArrayOutputStream
import java.io.IOException
import java.io.OutputStreamWriter
import java.util.BitSet
import java.util.Locale

/**
 * 아래 구조로 스트링에 특정 키값을 합치면 HEX로 변환된 스트링 코드가 나온다. encode, decode가 가능하다.
 *
 *
 * 스트링 + 키값을 = HEX로 변환된 스트링
 */
object StringEncrypt {
    private const val CUT_STRING_LEN = 80

    var dontNeedEncoding: BitSet = BitSet(256)

    init {
        for (i in 97..122) dontNeedEncoding.set(i)

        for (j in 65..90) dontNeedEncoding.set(j)

        for (k in 48..57) dontNeedEncoding.set(k)

        dontNeedEncoding.set(32)
        dontNeedEncoding.set(45)
        dontNeedEncoding.set(95)
        dontNeedEncoding.set(46)
        dontNeedEncoding.set(42)
    }

    /**
     * @param str 원본 문자열
     * @param key 키 문자열
     * @return 암호화된 문자열
     */
    fun encodeJ(str: String, key: String): String {
        val s: Int
        var rtnValue = ""
        val value: String

        val encode = encode(str)
        val keyEncode = encode(key)

        value = maxing(encode, keyEncode)
        s = value.length

        val sbt = StringBuffer()
        var i = 0
        while (i < s) {
            if (i + CUT_STRING_LEN < s) {
                sbt.append(value, i, i + CUT_STRING_LEN)
            } else {
                sbt.append(value, i, s)
            }

            sbt.append('\n')
            i += CUT_STRING_LEN
        }
        rtnValue = sbt.toString()
        return rtnValue
    }

    /**
     * @param str 암호환 된 문자열
     * @param key 키 문자열
     * @return 원본 문자열
     */
    fun decodeJ(str: String, key: String): String {
        var t: Char
        var rtnValue = ""
        val st = StringBuffer()
        val s = str.length

        var i = 0
        while (i < s) {
            t = str[i]
            // 숫자 또는 영문자이면 스트링 버퍼에 등록
            if (Character.isLetterOrDigit(t)) {
                st.append(t)
            }
            i++
        }

        val keyEncode = encode(key)
        rtnValue = decode(maxing(st.toString(), keyEncode))

        return rtnValue
    }

    /**
     * @param encode    Hex로 인코딩 된 문자
     * @param keyEncode Hex로 인코딩 된 키
     * @return 변환된 문자열 (Hex값)
     */
    private fun maxing(encode: String, keyEncode: String): String {
        var sum: Byte = 0x00
        var temp: Char
        var temp1: Int
        val lenKey: Int
        var lenKeyIndex: Int
        var rtnValue = ""
        val keyEncode2: String
        var sbtemp = StringBuffer()

        var len = keyEncode.length
        // 키값을 합하여 하나의 캐릭터 문자를 만든다.
        var i = 0
        while (i < len) {
            sum = (sum + keyEncode.substring(i, i + 2).toInt(16)).toByte()
            i += 2
        }

        len = keyEncode.length
        var temp2: Int
        i = 0
        while (i < len) {
            temp2 = keyEncode.substring(i, i + 2).toInt(16)
            temp1 = (temp2).toByte().toInt() xor sum.toInt()
            temp = Character.forDigit(temp1 shr 4 and 0xF, 16)
            sbtemp.append(temp)
            temp = Character.forDigit(temp1 and 0xF, 16)
            sbtemp.append(temp)
            i += 2
        }

        // 완성된 키값
        keyEncode2 = sbtemp.toString()

        sbtemp = StringBuffer()

        len = encode.length
        lenKey = keyEncode2.length
        lenKeyIndex = 0

        i = 0
        while (i < len) {
            // 키 인텍스 초기화
            if (lenKey <= lenKeyIndex) {
                lenKeyIndex = 0
            }
            // XOR 특징: 어느한 데이터에 또같은 값으로 XOR연산을 두번하면 원본 데이터가 나온다.
            temp1 = encode.substring(i, i + 2).toInt(16) xor keyEncode2.substring(
                lenKeyIndex,
                lenKeyIndex + 2
            ).toInt(16)

            temp = Character.forDigit(temp1 shr 4 and 0xF, 16)
            sbtemp.append(temp)

            temp = Character.forDigit(temp1 and 0xF, 16)
            sbtemp.append(temp)

            lenKeyIndex += 2
            i += 2
        }
        rtnValue = sbtemp.toString().uppercase(Locale.getDefault())
        return rtnValue
    }

    /**
     * URL Decode 하기위한 메소드
     *
     * @param s String type의 데이터
     * @return 변환된 String
     * @throws UnsupportedEncodingException
     */
    fun encode(s: String): String {
        val byte0: Byte = 10
        val stringbuffer = StringBuffer(s.length)
        val bytearrayoutputstream = ByteArrayOutputStream(byte0.toInt())
        var outputstreamwriter: OutputStreamWriter? = null
        try {
            // OS에 따라 default encoding이 달라지는 문제가 있어 명시적으로 정함.
            outputstreamwriter = OutputStreamWriter(bytearrayoutputstream, "MS949")
        } catch (e: Exception) {
            throw RuntimeException(e)
        }

        for (i in 0..<s.length) {
            val c = s[i]
            if (dontNeedEncoding[c.code]) {
                stringbuffer.append(Integer.toHexString(c.code))
                continue
            }
            try {
                outputstreamwriter.write(c.code)
                outputstreamwriter.flush()
            } catch (ex: IOException) {
                bytearrayoutputstream.reset()
                continue
            }
            val abyte0 = bytearrayoutputstream.toByteArray()
            for (j in abyte0.indices) {
                var c1 = Character.forDigit(abyte0[j].toInt() shr 4 and 0xf, 16)
                // 문자이면 ' '를 빼서 대문자 만든다.
                if (Character.isLetter(c1)) c1 -= ' '.code
                stringbuffer.append(c1)
                c1 = Character.forDigit(abyte0[j].toInt() and 0xf, 16)
                if (Character.isLetter(c1)) c1 -= ' '.code
                stringbuffer.append(c1)
            }

            bytearrayoutputstream.reset()
        }

        return stringbuffer.toString()
    }

    /**
     * 디코드하기위한 메소드
     *
     * @param s String type의 데이터
     * @return 변환된 String
     */
    fun decode(s: String): String {
        var abyte0: ByteArray? = null

        try {
            val stringbuffer = StringBuffer()

            var i = 0
            while (i < s.length) {
                stringbuffer.append(s.substring(i, i + 2).toInt(16).toChar())
                i += 2
            }

            val s1 = stringbuffer.toString()
            abyte0 = s1.toByteArray(charset("8859_1"))
            return String(abyte0, charset("ms949"))
        } catch (exception: Exception) {
            throw RuntimeException(exception)
        }
    }
}
