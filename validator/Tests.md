# Canis Major test

Canis Major serves as a blockchain adaptor within the FIWARE ecosystem, providing secure data persistence across blockchain networks and the Context Broker. The workflow is straightforward:
 - clients submit transactions containing payload data and wallet credentials.
 - These data are authenticated through a PEP Proxy and KeyRock Identity Management.
 - Once validated, the data is stored in an ETSI Broker (e.g., Orion-LD Broker) and simultaneously processed into a Merkle tree structure for blockchain integration.
 - The system then signs the transaction using the provided wallet credentials and submits it to an Oketh-compatible blockchain.

 ### Integradtion tests
 Let's explore the practical implementation through a series of test commands. First, it is needed to execute the integration tests, by running the following commands:

 ```shell
  cd it  
    docker-compose -f docker-compose/docker-compose-env.yaml -f docker-compose/docker-compose-java.yaml up  
    NGSI_ADDRESS=localhost:4000 mvn clean test  
 ```

### Entity creation
After running the integartion tests, create an entity by sending this POST request to Canis Major:

```shell
curl --location 'http://localhost:4000/ngsi-ld/v1/entities/' \
--header 'Link: <https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"' \
--header 'Wallet-Type: vault' \
--header 'Wallet-Token: vault-plaintext-root-token' \
--header 'Wallet-Address: http://vault:8200/v1/ethereum/accounts/mira' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'NGSILD-TENANT: orion' \
--data '{
    "id": "urn:ngsi-ld:Building:warehouse001",
    "type": "Building",
    "category": {
        "type": "Property",
        "value": ["warehouse"]
    },
    "address": {
        "type": "Property",
        "value": {
            "streetAddress": "Alexanderplatz 2",
            "addressRegion": "Berlin",
            "addressLocality": "Mitte",
            "postalCode": "10178"
        }
    }
}'
```

The headers included in the HTTP request are:
##### Wallet Headers
- Wallet-Type: Specifies the wallet service type as "vault"
- Wallet-Token: Provides authentication token for the vault service
- Wallet-Address: Points to the Ethereum accoun
 
##### Content Headers
- Content-Type: Declares the request body format as JSON
- Accept: Indicates the expected response format as JSON

### Retrieve the entity types in the Context broker
To retrieve the available entity types in the context broker run the following command:

```shell
curl -L 'http://localhost:1026/ngsi-ld/v1/types' \
-H 'Link: <https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"' \
-H 'NGSILD-Tenant: orion'
```
The command returns the following response, demonstrating the available entity types in the Context Broker:
```json
{
    "@context":"https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld","id":"urn:ngsi-ld:EntityTypeList:d77ccfa0-b3cd-11ef-ae1b-0242ac120005","type":"EntityTypeList","typeList":["DLTtxReceipt"]
}
```
The @context is using a definition on smart data models for a DLTtxReceipt and the NGSILD-Tenant is defined in the start-up of the tests.

### Retrieve data from Canis Major
To retrieve detailed receipt information for a specific building from the Canis Major, use the following HTTP request:

```shell
curl -L 'http://localhost:4000/ngsi-ld/v1/entities/urn:ngsi-ld:Building:warehouse001' \
-H 'Link: <https://raw.githubusercontent.com/smart-data-models/dataModel.Building/master/context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"' \
-H 'Accept: application/json' | jq '.'
```

The output will be similar to following response:

```json
{
  "blockHash": "0x619433204be327dda0d4722482e44310d2f3807e1a23b1fc097ca809f7afb421",
  "blockNumber": 193,
  "blockNumberRaw": "0xc1",
  "cumulativeGasUsed": 23866,
  "cumulativeGasUsedRaw": "0x5d3a",
  "from": "0xd9fe663797b75d0b3897d55d35e0b4e72307a63f",
  "gasUsed": 23866,
  "gasUsedRaw": "0x5d3a",
  "logs": [
    {
      "address": "0x476059cd57800db8eb88f67c2aa38a6fcf8251e0",
      "blockHash": "0x619433204be327dda0d4722482e44310d2f3807e1a23b1fc097ca809f7afb421",
      "blockNumber": 193,
      "blockNumberRaw": "0xc1",
      "data": "0x",
      "logIndex": 0,
      "logIndexRaw": "0x0",
      "removed": false,
      "topics": [
        "0xa3865c00e01495fc2b86502cae36a4edb139f748682e7d80725a3d6571a482fa",
        "0xf85c55023889d6ec0b723c8220471171435040e275059f8e222dfa57a50f0dd5",
        "0x33868c71f7186ea974685b553d8eee61eb1e95e0a2c70ed54fcd13db67920f74"
      ],
      "transactionHash": "0x83f05282a30f77dcfe52ca029b10ba80aac5dad5cc46f5dc437b79e860e4dd65",
      "transactionIndex": 0,
      "transactionIndexRaw": "0x0",
      "type": "mined"
    }
  ],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000020000000000000008000200000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000004000000000000000000020000000000000000000000000000000000000000000000000010000100000000000000000000000000000000000000000000000000008000000000000000000000420000000000000000000000000000000000000000000000000000000000000000000000000",
  "status": "0x1",
  "statusOK": true,
  "to": "0x476059cd57800db8eb88f67c2aa38a6fcf8251e0",
  "transactionHash": "0x83f05282a30f77dcfe52ca029b10ba80aac5dad5cc46f5dc437b79e860e4dd65",
  "transactionIndexRaw": "0x0"
}
```

The JSON structure shows a blockchain transaction receipt with the following details:
##### Transaction Information
- Block Number: 193 (0xc1)
- Transaction Status: Successful (statusOK: true)
- Transaction Hash: 0x83f05282a30f77dcfe52ca029b10ba80aac5dad5cc46f5dc437b79e860e4dd65
##### Transaction Participants
- From Address: 0xd9fe663797b75d0b3897d55d35e0b4e72307a63f
- To Address: 0x476059cd57800db8eb88f67c2aa38a6fcf8251e0

### Retrieve data from the context broker
To retrieve specific DLT transaction receipts from the the context broker, we'll use an NGSI-LD query that filters entities by type and property values. The query targets entities of type DLTtxReceipt and filters them based on the refEntity property matching the Building entity "urn:ngsi-ld:Building:warehouse001". The attrs=TxReceipts parameter in the NGSI-LD query acts as a data filter to limit the response to only include the TxReceipts property, excluding all other properties of the entity and reducing response payload size.

```shell
curl -L 'http://localhost:1026/ngsi-ld/v1/entities/?type=DLTtxReceipt&q=refEntity%3D%3D%22urn%3Angsi-ld%3ABuilding%3Awarehouse001%22&attrs=TxReceipts' \
-H 'Link: <https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"' \
-H 'NGSILD-Tenant: orion'
```

The outpot will be similar to the following json response:

```json
{
    "@context": "https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld",
    "id": "urn:ngsi-ld:dlttxreceipt:0xa46d2e3b190d36fbb8af5d0a1c212d8036cf007e6ec4d1309904e052d25e5499",
    "type": "DLTtxReceipt",
    "TxReceipts": {
      "type": "Property",
      "value": {
        "blockHash": "0x2022f801a1c094bd3a893ac6f3087c17bb9c673a6b5663f353eded030e1e7161",
        "blockNumber": 192,
        "blockNumberRaw": "0xc0",
        "cumulativeGasUsed": 23866,
        "cumulativeGasUsedRaw": "0x5d3a",
        "from": "0x34e5b3f990e55d0651b35c817bafb89d2877cb95",
        "gasUsed": 23866,
        "gasUsedRaw": "0x5d3a",
        "logs": [
          {
            "address": "0x476059cd57800db8eb88f67c2aa38a6fcf8251e0",
            "blockHash": "0x2022f801a1c094bd3a893ac6f3087c17bb9c673a6b5663f353eded030e1e7161",
            "blockNumber": 192,
            "blockNumberRaw": "0xc0",
            "data": "0x",
            "logIndex": 0,
            "logIndexRaw": "0x0",
            "removed": false,
            "topics": [
              "0xa3865c00e01495fc2b86502cae36a4edb139f748682e7d80725a3d6571a482fa",
              "0xf85c55023889d6ec0b723c8220471171435040e275059f8e222dfa57a50f0dd5",
              "0xefc7a4d4c2393e9b62ac4b93b7d199c71e0bb103fdb00fc1b37d7949ad886ddd"
            ],
            "transactionHash": "0xa46d2e3b190d36fbb8af5d0a1c212d8036cf007e6ec4d1309904e052d25e5499",
            "transactionIndex": 0,
            "transactionIndexRaw": "0x0",
            "type": "mined"
          }
        ],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000020000000000000008000200000000000000000000000000000000000000000000000100000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000008000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000200000000000000000000000000000000",
        "status": "0x1",
        "statusOK": true,
        "to": "0x476059cd57800db8eb88f67c2aa38a6fcf8251e0",
        "transactionHash": "0xa46d2e3b190d36fbb8af5d0a1c212d8036cf007e6ec4d1309904e052d25e5499",
        "transactionIndex": 0,
        "transactionIndexRaw": "0x0"
        }
    }
}               
```

This JSON response shows a DLTtxReceipt (Distributed Ledger Technology Transaction Receipt) entity in NGSI-LD format:

##### Transaction Details

- Entity ID: `urn:ngsi-ld:dlttxreceipt:0xa46d2e3b190d36fbb8af5d0a1c212d8036cf007e6ec4d1309904e052d25e5499`
- Block Number: 192 (0xc0)
- Transaction Status: Successful (statusOK: true)
- Block Hash: `0x2022f801a1c094bd3a893ac6f3087c17bb9c673a6b5663f353eded030e1e7161`
- Transaction Hash: `0xa46d2e3b190d36fbb8af5d0a1c212d8036cf007e6ec4d1309904e052d25e5499`

##### Transaction Participants
- From Address: `0x34e5b3f990e55d0651b35c817bafb89d2877cb95`
- To Address: `0x476059cd57800db8eb88f67c2aa38a6fcf8251e0`

