# CanisMajor - FIWARE DLT Adaptor
[![FIWARE Blockchain](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/core.svg)](https://www.fiware.org/developers/catalogue/)

CanisMajor is a blockchain adaptor that supports persistence and verification of [NGSI-LD](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.07.01_60/gs_cim009v010701p.pdf) Entity-Transactions (e.g., create/delete/update- operations) in blockchains. 

![Current Architecture](https://github.com/FIWARE/CanisMajor/raw/master/docs/images/canis-major-overview.svg)

In order to persist transactions inside the blockchain, a client has to send information
about its transactions (e.g., create/update/delete entity) to CanisMajor. 

The request should include information about the Wallet (e.g., Keystore) to be used for
signing the transaction. Please check the [API](https://github.com/FIWARE/CanisMajor/tree/master/api/api.yaml)
(tag `NGSI-LD`) on how to send the transactions and provide the Wallet-Information. CanisMajor will create a
[Merkle-Tree](https://en.wikipedia.org/wiki/Merkle_tree) from the send informations and include it as data into
the transaction for the Blockchain. In order to properly sign the transaction, CanisMajor uses the provided
Wallet-Information and delegates the signing to the client's Wallet. The signed transaction is then put into the
Oketh-compatible blockchain.

## Testing 

Run unit-tests via: 

```shell
mvn clean test
```

A set of integration tests (using [cucumber](https://cucumber.io/)) is available under [it/](https://github.com/FIWARE/CanisMajor/tree/master/it). 

To run them use:

```shell
cd it
docker-compose -f docker-compose/docker-compose-env.yaml -f docker-compose/docker-compose-java.yaml up
mvn clean test
```

## ADRs

* [Delegate transaction signing to the client](./adrs/delegate-signatur.md)
* [Use envoy as proxy](./adrs/envoy-as-proxy.md)
* [Use a transparent proxy for forward data to CanisMajor](./adrs/transparent-proxy.md)


## License

CanisMajor is licensed under the Apache License, Version 2.0. See [LICENSE](https://github.com/fiware/CanisMajor/blob/master/LICENSE) for the full license text.

© 2021 FIWARE Foundation e.V.
