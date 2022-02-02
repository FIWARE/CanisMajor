FROM registry.access.redhat.com/ubi8/openjdk-11:1.11-2

USER root

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs > rustup.sh
RUN chmod +x rustup.sh

RUN ./rustup.sh -y
RUN cp -a $HOME/.cargo/bin/. /usr/local/bin/

RUN microdnf install git
RUN git clone https://github.com/iotaledger/iota.rs.git

RUN microdnf install gcc
RUN microdnf install clang

WORKDIR $HOME/iota.rs/bindings/java/

RUN ./gradlew install

RUN mvn install:install-file -Dfile=$HOME/iota.rs/bindings/java/native/build/libs/native.jar -DgroupId=org.iota.client -DartifactId=native -Dversion=1.0 -Dpackaging=jar

COPY ./pom.xml /build/pom.xml
COPY ./src /build/src
COPY ./api /build/api

WORKDIR /build
RUN mvn clean install -DskipTests
ENV JAVA_APP_JAR=/build/target/canis-major-1.0.0.jar