# Build Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Build Backend
FROM eclipse-temurin:21-jdk-alpine AS backend-build
WORKDIR /backend
COPY backend/gradlew .
COPY backend/gradle gradle
COPY backend/build.gradle.kts .
COPY backend/settings.gradle.kts .
COPY backend/src src
RUN ./gradlew build -x test

# Final Stage with both Java and Node.js
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Install Node.js
RUN apk add --update nodejs npm

# Copy Frontend
COPY --from=frontend-build /frontend/package*.json ./frontend/
COPY --from=frontend-build /frontend/build ./frontend/build
WORKDIR /app/frontend
RUN npm install --production

# Copy Backend
WORKDIR /app
COPY --from=backend-build /backend/build/libs/bokslhome-0.0.1-SNAPSHOT.war app.war

# Add startup script
COPY start.sh .
RUN chmod +x start.sh

EXPOSE 3000 8080
CMD ["./start.sh"]
