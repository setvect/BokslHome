plugins {
    base
}

tasks.register("buildAll") {
    group = "build"
    description = "전체 프로젝트 빌드"

    doLast {
        // Frontend 빌드
        project.exec {
            workingDir = file("frontend")
            if (System.getProperty("os.name").lowercase().contains("windows")) {
                commandLine("cmd", "/c", "npm", "install")
            } else {
                commandLine("npm", "install")
            }
        }
        project.exec {
            workingDir = file("frontend")
            if (System.getProperty("os.name").lowercase().contains("windows")) {
                commandLine("cmd", "/c", "npm", "run", "build")
            } else {
                commandLine("npm", "run", "build")
            }
        }

        // Backend 빌드
        project.exec {
            workingDir = file("backend")
            if (System.getProperty("os.name").lowercase().contains("windows")) {
                commandLine("cmd", "/c", "gradlew", "build")
            } else {
                commandLine("./gradlew", "build")
            }
        }
    }
}

tasks.named("clean") {
    doLast {
        // Frontend 정리
        delete("frontend/build")
        delete("frontend/node_modules")

        // Backend 정리
        delete("backend/build")
    }
}
