#!/bin/sh

# Start Frontend (Node.js SSR)
cd /app/frontend && node build/index.js &

# Start Backend (Spring Boot)
cd /app && java -jar app.war 