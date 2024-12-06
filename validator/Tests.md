# Canis Major test

Canis Major serves as a blockchain adaptor within the FIWARE ecosystem, providing secure data persistence across blockchain networks and the Context Broker. The workflow is straightforward: clients submit transactions containing payload data and wallet credentials, which undergo authentication through Wilma PEP Proxy and KeyRock Identity Management. Once validated, the data is stored in the Orion Context Broker and simultaneously processed into a Merkle-Tree structure for blockchain integration. The system then signs the transaction using the provided wallet credentials and submits it to an Oketh-compatible blockchain. Let's explore the practical implementation through a series of test commands.

After r unning the integartion tests, create an entity by sending this POST request to Canis Major:

```bash
curl --location 'http://<Canis Major>:4000/ngsi-ld/v1/entities/' \
--header 'Link: <https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"' \
--header 'Wallet-Type: vault' \
--header 'Wallet-Token: vault-plaintext-root-token' \
--header 'Wallet-Address: http://vault:8200/v1/ethereum/accounts/mira' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'NGSILD-TENANT: orion' \
--data '{
    "id": "urn:ngsi-ld:Building:farm002",
    "type": "Building",
    "category": {
        "type": "Property",
        "value": ["farm"]
    },
    "address": {
        "type": "Property",
        "value": {
            "streetAddress": "Großer Stern 1",
            "addressRegion": "Berlin",
            "addressLocality": "Tiergarten",
            "postalCode": "10557"
        }
    }
}'
```

To retrieve the available entity types in the context broker run the following command:
```bash
curl -L 'http://<Canis Major>:1026/ngsi-ld/v1/types' \
-H 'Link: <https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"' \
-H 'NGSILD-Tenant: orion'
```
The command returns the following response, demonstrating the available entity types in the Context Broker:
```bash
{
    "@context":"https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld","id":"urn:ngsi-ld:EntityTypeList:d77ccfa0-b3cd-11ef-ae1b-0242ac120005","type":"EntityTypeList","typeList":["DLTtxReceipt"]
}%     
```
The @context is using a definition on smart data models for a DLTtxReceipt and the NGSILD-Tenant is defined in the start-up of the tests.
To verify which entities are created in the context broker use the following command:

To verify that the created entities is correctly saved in the context broker having the type DLTtxReceipt, use the following command:

```bash
curl -L 'http://<Canis Major>:1026/ngsi-ld/v1/entities/?type=DLTtxReceipt' \
-H 'Link: <https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"' \
-H 'NGSILD-Tenant: orion'
```

To ask Canis Major about receipts for a specific building use the following command: 

```bash
curl -L 'http://<Canis Major>:4000/entity/urn:ngsi-ld:Building:farm002' \
-H 'Accept: application/json'
```

The output will be similar to following response:

```bash
{
    "entityId":"urn:ngsi-ld:Building:farm002","txDetails":[
        {
            "blockHash":"0x610f07a4b5a87ca71273791fe5d12952fca393a6e3664489f45329bebdb396c3","blockNumber":186,"blockNumberRaw":"0xba","cumulativeGasUsed":23866,"cumulativeGasUsedRaw":"0x5d3a","from":"0x34e5b3f990e55d0651b35c817bafb89d2877cb95","gasUsed":23866,"gasUsedRaw":"0x5d3a","logs":[
            {
                "address":"0x476059cd57800db8eb88f67c2aa38a6fcf8251e0","blockHash":"0x610f07a4b5a87ca71273791fe5d12952fca393a6e3664489f45329bebdb396c3","blockNumber":186,"blockNumberRaw":"0xba","data":"0x","logIndex":0,"logIndexRaw":"0x0","removed":false,"topics":["0xa3865c00e01495fc2b86502cae36a4edb139f748682e7d80725a3d6571a482fa","0x9aeb7ab140e1449806e11e52ca85dacb6a028ae5feb8d431e7d927e7971e4d2d","0xb1a82faaa61a7bfbc90c42129b2049d408f20b8f43ae99e8b6aa6cc7e7b0b944"],"transactionHash":"0x8456f94030cc841bc667d76ce563b47e4920a27884bdb9b8fc5e4e9cc2df1913","transactionIndex":0,"transactionIndexRaw":"0x0","type":"mined"}],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000008000200000000000000000000010000000000004000000000000000000000000000110000000000000004000000000000000000000000000000000000000000000020000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000020000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","statusOK":true,"to":"0x476059cd57800db8eb88f67c2aa38a6fcf8251e0","transactionHash":"0x8456f94030cc841bc667d76ce563b47e4920a27884bdb9b8fc5e4e9cc2df1913","transactionIndexRaw":"0x0"},{
                    "blockHash":"0x86082426228ee23ea8927607c7f731194ebc1dc7ca69a6321ff46e91b0fdbe2a","blockNumber":190,"blockNumberRaw":"0xbe","cumulativeGasUsed":23866,"cumulativeGasUsedRaw":"0x5d3a","from":"0x34e5b3f990e55d0651b35c817bafb89d2877cb95","gasUsed":23866,"gasUsedRaw":"0x5d3a","logs":[
                        {"address":"0x476059cd57800db8eb88f67c2aa38a6fcf8251e0","blockHash":"0x86082426228ee23ea8927607c7f731194ebc1dc7ca69a6321ff46e91b0fdbe2a","blockNumber":190,"blockNumberRaw":"0xbe","data":"0x","logIndex":0,"logIndexRaw":"0x0","removed":false,"topics":["0xa3865c00e01495fc2b86502cae36a4edb139f748682e7d80725a3d6571a482fa","0x9aeb7ab140e1449806e11e52ca85dacb6a028ae5feb8d431e7d927e7971e4d2d","0xb1a82faaa61a7bfbc90c42129b2049d408f20b8f43ae99e8b6aa6cc7e7b0b944"],"transactionHash":"0x18b8c942735e869a42fff06393ebb12824ec44ed030e9e6a579f8f839c59a5de","transactionIndex":0,"transactionIndexRaw":"0x0","type":"mined"}],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000008000200000000000000000000010000000000004000000000000000000000000000110000000000000004000000000000000000000000000000000000000000000020000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000020000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","statusOK":true,"to":"0x476059cd57800db8eb88f67c2aa38a6fcf8251e0","transactionHash":"0x18b8c942735e869a42fff06393ebb12824ec44ed030e9e6a579f8f839c59a5de","transactionIndexRaw":"0x0"}]
}%  
```
The JSON structure shows:
- One Entity ID: "urn:ngsi-ld:Building:farm002"
- Two transactions recorded in different blocks:
    - First transaction in block 186 (0xba)
    - Second transaction in block 190 (0xbe)

Each transaction contains detailed blockchain information including block hashes, gas usage, logs, and transaction hashes, but they all relate to the same building entity.

To ask the context brker Orion-LD about the receipt of a specific building use the following command:
```bash 
curl -L 'http://<Canis Major>:1026/ngsi-ld/v1/entities/?type=DLTtxReceipt&q=refEntity%3D%3D%22urn%3Angsi-ld%3ABuilding%3Afarm002%22&attrs=TxReceipts' \
-H 'Link: <https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"' \
-H 'NGSILD-Tenant: orion'
```
The outpot will be similar to the following response:
```bash
["@context":"https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld","id":"urn:ngsi-ld:dlttxreceipt:0x8456f94030cc841bc667d76ce563b47e4920a27884bdb9b8fc5e4e9cc2df1913","type":"DLTtxReceipt","TxReceipts":{"type":"Property","value":{"blockHash":"0x610f07a4b5a87ca71273791fe5d12952fca393a6e3664489f45329bebdb396c3","blockNumber":186,"blockNumberRaw":"0xba","cumulativeGasUsed":23866,"cumulativeGasUsedRaw":"0x5d3a","from":"0x34e5b3f990e55d0651b35c817bafb89d2877cb95","gasUsed":23866,"gasUsedRaw":"0x5d3a","logs":[{"address":"0x476059cd57800db8eb88f67c2aa38a6fcf8251e0","blockHash":"0x610f07a4b5a87ca71273791fe5d12952fca393a6e3664489f45329bebdb396c3","blockNumber":186,"blockNumberRaw":"0xba","data":"0x","logIndex":0,"logIndexRaw":"0x0","removed":false,"topics":["0xa3865c00e01495fc2b86502cae36a4edb139f748682e7d80725a3d6571a482fa","0x9aeb7ab140e1449806e11e52ca85dacb6a028ae5feb8d431e7d927e7971e4d2d","0xb1a82faaa61a7bfbc90c42129b2049d408f20b8f43ae99e8b6aa6cc7e7b0b944"],"transactionHash":"0x8456f94030cc841bc667d76ce563b47e4920a27884bdb9b8fc5e4e9cc2df1913","transactionIndex":0,"transactionIndexRaw":"0x0","type":"mined"}],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000008000200000000000000000000010000000000004000000000000000000000000000110000000000000004000000000000000000000000000000000000000000000020000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000020000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","statusOK":true,"to":"0x476059cd57800db8eb88f67c2aa38a6fcf8251e0","transactionHash":"0x8456f94030cc841bc667d76ce563b47e4920a27884bdb9b8fc5e4e9cc2df1913","transactionIndex":0,"transactionIndexRaw":"0x0"}}},{"@context":"https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld","id":"urn:ngsi-ld:dlttxreceipt:0x18b8c942735e869a42fff06393ebb12824ec44ed030e9e6a579f8f839c59a5de","type":"DLTtxReceipt","TxReceipts":{"type":"Property","value":{"blockHash":"0x86082426228ee23ea8927607c7f731194ebc1dc7ca69a6321ff46e91b0fdbe2a","blockNumber":190,"blockNumberRaw":"0xbe","cumulativeGasUsed":23866,"cumulativeGasUsedRaw":"0x5d3a","from":"0x34e5b3f990e55d0651b35c817bafb89d2877cb95","gasUsed":23866,"gasUsedRaw":"0x5d3a","logs":[{"address":"0x476059cd57800db8eb88f67c2aa38a6fcf8251e0","blockHash":"0x86082426228ee23ea8927607c7f731194ebc1dc7ca69a6321ff46e91b0fdbe2a","blockNumber":190,"blockNumberRaw":"0xbe","data":"0x","logIndex":0,"logIndexRaw":"0x0","removed":false,"topics":["0xa3865c00e01495fc2b86502cae36a4edb139f748682e7d80725a3d6571a482fa","0x9aeb7ab140e1449806e11e52ca85dacb6a028ae5feb8d431e7d927e7971e4d2d","0xb1a82faaa61a7bfbc90c42129b2049d408f20b8f43ae99e8b6aa6cc7e7b0b944"],"transactionHash":"0x18b8c942735e869a42fff06393ebb12824ec44ed030e9e6a579f8f839c59a5de","transactionIndex":0,"transactionIndexRaw":"0x0","type":"mined"}],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000008000200000000000000000000010000000000004000000000000000000000000000110000000000000004000000000000000000000000000000000000000000000020000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000020000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","statusOK":true,"to":"0x476059cd57800db8eb88f67c2aa38a6fcf8251e0","transactionHash":"0x18b8c942735e869a42fff06393ebb12824ec44ed030e9e6a579f8f839c59a5de","transactionIndex":0,"transactionIndexRaw":"0x0"}}}]%                
```
This JSON response shows two DLTtxReceipt (Distributed Ledger Technology Transaction Receipt) entities in NGSI-LD format:

##### First Transaction Receipt
- ID: urn:ngsi-ld:dlttxreceipt:0x8456f94030cc841bc667d76ce563b47e4920a27884bdb9b8fc5e4e9cc2df1913
- Block Number: 186 (0xba)
- Gas Used: 23,866
- From Address: 0x34e5b3f990e55d0651b35c817bafb89d2877cb95
- To Address: 0x476059cd57800db8eb88f67c2aa38a6fcf8251e0

##### Second Transaction Receipt
- ID: urn:ngsi-ld:dlttxreceipt:0x18b8c942735e869a42fff06393ebb12824ec44ed030e9e6a579f8f839c59a5de
- Block Number: 190 (0xbe)
- Gas Used: 23,866
- From Address: 0x34e5b3f990e55d0651b35c817bafb89d2877cb95
- To Address: 0x476059cd57800db8eb88f67c2aa38a6fcf8251e0

Both transactions were successful (statusOK: true). Each receipt contains detailed blockchain information including logs, bloom filters, and raw transaction data.


