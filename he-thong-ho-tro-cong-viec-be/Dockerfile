FROM hackyo/maven:3.9-jdk-21 AS build
COPY src /home/app/src

COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests=true

# Package stage
FROM openjdk:21-ea-17-slim-buster
COPY --from=build /home/app/target/toolbaogia-0.0.1-SNAPSHOT.war /usr/local/lib/app.jar

EXPOSE 8003
ENTRYPOINT ["java", "--enable-preview", "-jar", "/usr/local/lib/app.jar"]

