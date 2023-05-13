FROM openjdk:19-alpine

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "/app/target/CommuneBackend.jar"]