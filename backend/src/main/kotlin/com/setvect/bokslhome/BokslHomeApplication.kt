package com.setvect.bokslhome

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication

@SpringBootApplication
@ConfigurationPropertiesScan
class BokslHomeApplication

fun main(args: Array<String>) {
    runApplication<BokslHomeApplication>(*args)
}
