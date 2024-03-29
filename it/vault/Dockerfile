FROM golang:1.17-alpine as builder
RUN apk add --update alpine-sdk
RUN apk update && apk add git openssh gcc musl-dev linux-headers

RUN git clone https://github.com/immutability-io/vault-ethereum.git

WORKDIR /go/vault-ethereum

RUN go mod download

RUN mkdir -p /build/bin \
    && CGO_ENABLED=1 GOOS=linux go build -a -v -i -o /build/bin/vault-ethereum . \
    && sha256sum -b /build/bin/vault-ethereum > /build/bin/SHA256SUMS

FROM vault:1.9.3

RUN mkdir -p /plugins

COPY config.json /vault/config/config.json
COPY --from=builder /build/bin/vault-ethereum /plugins/vault-ethereum
COPY --from=builder /build/bin/SHA256SUMS /plugins/SHA256SUMS
