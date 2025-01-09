
# CanisMajor - FIWARE DLT Adaptor

[![FIWARE Blockchain](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/core.svg)](https://www.fiware.org/developers/catalogue/)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/4661/badge)](https://bestpractices.coreinfrastructure.org/projects/4661)
[![License](https://img.shields.io/github/license/FIWARE/canismajor.svg)](https://opensource.org/licenses/Apache-2.0)
[![Docker badge](https://img.shields.io/badge/quay.io-fiware%2Fcanis--major-grey?logo=red%20hat&labelColor=EE0000)](https://quay.io/repository/fiware/canis-major)
<br/>
![CI](https://github.com/FIWARE/canismajor/workflows/Integration-test/badge.svg)

CanisMajor is a blockchain adaptor that supports persistence and verification of [NGSI-LD](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.07.01_60/gs_cim009v010701p.pdf) Entity-Transactions (e.g., create/delete/update- operations) in blockchains. 


This project is a part of [FIWARE](https://github.com/fiware).  For more information check the FIWARE Catalogue entry for the
[Core Context Management](https://github.com/Fiware/catalogue/tree/master/core).

| :books: [Documentation](https://fiware.github.io/CanisMajor) | :mortar_board: [Academy](https://github.com/fiware/tutorials.Step-by-Step) | <img style="height:1em" src="https://quay.io/static/img/quay_favicon.png"/> [quay.io](https://quay.io/repository/fiware/canis-major)  | :dart: [Roadmap](https://github.com/orgs/FIWARE/projects/2/views/1) |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------- |

## Overview

![Current Architecture](./docs/images/canis-major-overview.svg)

In order to persist transactions inside the blockchain, a client has to send information about its transactions(e.g. create/update/delete entity) to CanisMajor. 
The request should include information about the Wallet (e.g., Keystore) to be used for signing the transaction. Please check the [API](./api/api.yaml) (tag `NGSI-LD`) on how to 
send the transactions and provide the Wallet-Information. CanisMajor will create a [Merkle-Tree](https://en.wikipedia.org/wiki/Merkle_tree) from the submitted data 
and include it as data into the transaction for the Blockchain. In order to properly sign the transaction, CanisMajor uses the provided Wallet-Information and delegates the
signing to the client's Wallet. The signed transaction is then put into the Oketh-compatible blockchain.

## Testing

Run unit-tests via: ```mvn clean test```

A set of integration tests (using [cucumber](https://cucumber.io/)) is available under [it/](./it). 
To run them use:

```shell
    cd it
    docker-compose -f docker-compose/docker-compose-env.yaml -f docker-compose/docker-compose-java.yaml up
    mvn clean test
```


The integration tests use the following values by default:

| Variable | Value |
| ---| --- |
| `VAULT_IMAGE`|`quay.io/fiware/vault-ethereum:1.0.1` |
| `ORION_IMAGE`|`quay.io/fiware/orion-ld:1.7.1` |
| `ORION_LD_PORT`|`1026` |
| `EXPOSED_PORT`|`1026` |
| `MONGO_DB_VERSION`|`mongo:6.0` |
| `MONGO_DB_PORT`|`27017` |

Additionally `NGSI_ADDRESS=localhost:4000` should be set if running locally.



## ADRs

* [Delegate transaction signing to the client](docs/adrs/delegate-signatur.md)


## License

CanisMajor is licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for the full license text.

© 2021-2025 FIWARE Foundation e.V.
