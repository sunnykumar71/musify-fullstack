# Build Stage
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package application
COPY src ./src
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/musifyapi-0.0.1-SNAPSHOT.jar app.jar

# Expose port (default 8081, Render overrides via $PORT)
EXPOSE 8081

# Command to execute application
ENTRYPOINT ["java", "-jar", "app.jar"]
