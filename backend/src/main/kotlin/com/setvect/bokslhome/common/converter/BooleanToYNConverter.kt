package com.setvect.bokslhome.common.converter

import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter

@Converter
class BooleanToYNConverter : AttributeConverter<Boolean, String> {
    override fun convertToDatabaseColumn(attribute: Boolean?): String {
        return if (attribute != null && attribute) "Y" else "N"
    }

    override fun convertToEntityAttribute(dbData: String?): Boolean {
        return "Y" == dbData
    }
}
