# Canis Major: Technical Overview


This document is intended to supplement existing documentation within the Canis Major component by providing additional explanations and context for the following key technologies:

- Ethereum Blockchain
- HashiCorp Vault
- AEI contract
- Ganache 

## Ethereum Blockchain Overview

Blockchain is s distributed ledger that is decentralized, peer-to-peer, and immutable. It is a chain of blocks containing a set of transactions each linked to the previous one through a cryptographic hash.


* Decentralized: Blockchain utilizes a distributed ledger architecture, eliminating a single point of control. 

* Peer-to-Peer: Blockchain operates over a P2P network topology, where nodes communicate directly for transaction propagation and block validation, removing intermediaries and enhancing fault tolerance.

* Immutable: Data appended to the blockchain is cryptographically linked via hash pointers. Once confirmed, blocks are tamper-evident and irreversible, ensuring data integrity. 

### Key Components of Ethereum

**1. Nodes**

A node in Ethereum is an individual instance of client software that participates in the network by maintaining a local copy of the blockchain, and validating transactions. The Ethereum network consists of multiple interconnected nodes, forming a peer-to-peer distributed ledger system.

The Ethereum Client is a software implementation of the Ethereum protocol that allows users to interact with the blockachin.

**2. Ethereum Virtual Machine (EVM)**

The EVM is the runtime environment for smart contracts on Ethereum. It is a sandbox that is isolated from the other parts of the system and responsible for the execution of smart contracts and other decentralized applications.


**3. Smart Contracts**

Smart contracts are self-executing contracts with the terms of the agreement written directly into lines of code. They automate processes, and enforce agreements without the need for intermediaries.


**4. Ether (ETH)**
Ether is the native cryptocurrency of Ethereum, used for transaction fees, staking, and as a digital asset.


Functionality: It incentivizes network participants, such as validators, and facilitates the execution of smart contracts.


**5.Gas**

Gas is a unit of measurement that represents the computational effort required to execute transactions or smart contracts on the Ethereum network It prevents spam, and ensures the network runs smoothly by charging for computational resources used. 

**Gas Calculation**

Gas fees are calculated using the following formula:

Gas fee = Amount of gas used for an operation x cost per unit

> [!NOTE]
> These additional terms are essential for understanding Ethereum transaction fees:
> The Gas Limit is the maximum amount of gas a user is willing to spend on a transaction.
> The Base Fee is the minimum fee required for a transaction to be included in a block, which adjusts based on network congestion.
> The Priority Fee (Tip) is an optional additional fee to incentivize validators to process a transaction more quickly.


**6.Accounts**

An Ethereum account is an entity identified with an addreess. It has an Ether balance, interact with smart contracts and send transactions on Ethereum.

There are two types of accounts:
- Externally Owned Accounts (EOA)
- Contract Accounts

**7.Wallets**

Wallets are used for storing, managing, and interact with the Ether cryptocurrency and tokens. Ethereum wallet stores as well the cryptographic keys (public and private) that enable users to access their blockchain-based assets, sign transactions, and interact with decentralized applications and smart contracts. 

There are several types of wallets including:
- Physical wallets
- Mobile applications
- Browser wallets / web applications
- Browser extension wallets
- Desktop wallets

> [!Note]
> You should distinguish between an account and a wallet:
> An account is the actual entity on the blockchain (with an address and balance), while a wallet is the tool used to access, manage, and interact with the accounts

**8.Transactions in the scope of Canis Major**

Transactions are fundamental concepts of any Blockchain technology, as they enable the movement of Digital assets between the participants in the Ethereum network.

In this context of Canis Major we consider an example for retrieving detailed transaction receipt information for a specific building entity. This transaction receipt was persisted in Orion-LD context broker. Find more details [here](https://github.com/asmataamallah25/CanisMajor/blob/documentation/docs/canis-major-integration-guide.md)

```shell
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
To assist with understanding the structure and significance of the transcation receipt, concise explanations as well as the actual value from for each field is provided:

1. **blockHash**
    - Type: String (hexadecimal)
    - Description: The unique hash of the block in which this transaction was included.
    - Value:
 "0x2022f801a1c094bd3a893ac6f3087c17bb9c673a6b5663f353eded030e1e7161"

 2. **blockNumber**
    - Type: Integer
    - Description: The number of the block in which the transaction was included, in decimal format.
    - Value: 192

3. **blockNumberRaw**
    - Type: String (hexadecimal)
    - Description: The block number in hexadecimal format.
    - Value: "0xc0" (which is 192 in decimal)

4. **cumulativeGasUsed**
    - Type: Integer
    - Description: The total amount of gas used in the block up to and including this transaction, in decimal format.
    - Value: 23866

5. **cumulativeGasUsedRaw**
    - Type: String (hexadecimal)
    - Description:The cumulative gas used in hexadecimal format.
    - Value: "0x5d3a" (which is 23866 in decimal)

6. **from**
    - Type: String (hexadecimal)
    -Description: The address of the account that initiated the transaction. 
    - Value: "0x34e5b3f990e55d0651b35c817bafb89d2877cb95"

 7. **to**
    - Type: String (hexadecimal)
    - Description: The address of the contract or account that received the transaction.
    - Value:"0x476059cd57800db8eb88f67c2aa38a6fcf8251e0"
> [!NOTE]
> The "from" and "to"  in Ethereum transactions are in hexadecimal format (hexdec) for several important technical and practical reasons:
> - Hexadecimal is a compact way to represent binary data.
> - Ethereum addresses are derived from hashes of public keys. Storing and transmitting addresses in hexadecimal strings is a common standard that compatibility across tools and systems.
> - Ethereum addresses always start with 0x to indicate they are in hexadecimal format, which helps distinguish them from other fields and prevents confusion.

8. **gasUsed**
    - Type: Integer
    - Description: The amount of gas used by this specific transaction, in decimal format.
    - Value: 23866

9. **gasUsedRaw**
    - Type: String (hexadecimal)
    - Description: The gas used by this transaction in hexadecimal format.
    - Value: "0x5d3a" (which is 23866 in decimal)

10. **logs**
    - Type: Array of Objects
    - Description: An array of log objects generated by this transaction. Each log represents an event emitted by a smart contract.
    - Log Object Fields
        - address: The address of the contract that emitted the log.
        - blockHash: The hash of the block containing the log.
        - blockNumber: The block number containing the log.
        - blockNumberRaw: The block number in hexadecimal.
        - data: Additional data associated with the event (empty in this example).
        - logIndex: The position of the log in the block’s logs array (decimal).
        - logIndexRaw: The log index in hexadecimal.
        - removed: Indicates if the log was removed due to a chain reorganization (false if not removed).
        - topics: Array of indexed event parameters. The first topic is usually the event signature.
        - transactionHash: The hash of the transaction that generated this log.
        - transactionIndex: The position of the transaction in the block (decimal).
        - transactionIndexRaw: The transaction index in hexadecimal.
        - type: The type of log (e.g., "mined" for a log from a mined transaction).

11. **logsBloom**
    - Type: String (hexadecimal)
    - Description: A bloom filter for logs generated by this transaction. Used for efficient log filtering. 
    - Value: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000020000000000000008000200000000000000000000000000000000000000000000000100000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000008000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000200000000000000000000000000000000
    - Additional explanation: The logsBloom field is a special kind of filter that is represented as a long hexadecimal string. It is generated for each transaction and contains information about all the logs (events) produced by that transaction on the Ethereum blockchain. The filter is a bit pattern, which means that when an event is logged, it sets certain bits based on the event’s properties.

12. **status**
    - Type: String (hexadecimal)
    - Description: Indicates whether the transaction was successful. "0x1" means success, "0x0" means failure.
    - Value: "0x1"

13. **statusOK**
    - Type: Boolean
    - Description: A boolean indicating if the transaction was successful.
    - Value: true

14. **transactionHash**
    - Type: String (hexadecimal)
    - Description: The unique hash of the transaction.
    - Value: "0xa46d2e3b190d36fbb8af5d0a1c212d8036cf007e6ec4d1309904e052d25e5499"

15. **transactionIndexRaw**
    - Type: String (hexadecimal)
    - Description: The position of the transaction in the block, in hexadecimal format.
    - Value: "0x0" (which is 0 in decimal)

## HashiCorp Vault

As part of Canis Major commitment to security and efficient secrets management, HashiCorp Vault is integrated to provide robust protection for sensitive data. This section explains how Vault functions within Canis Major.

### Vault Overview

HashiCorp Vault is a tool designed for securely storing and managing sensitive data such as passwords, tokens, cryptographic key, and digital wallet credentials, providing a centralized way to manage access to secrets. 
In Canis Major, Vault serves as a secure wallet for managing digital wallet information and performing the cryptographic operation of signing transactions.

### Configuration of Vault service

The Docker Compose configuration sets up a vault-server service with the following key points:
Key Points:

- Image
    Uses a customized image (vault-ethereum) for Ethereum-related use cases.
- Environment Variables:
    VAULT_ADDR: Specifies where Vault listens (http://0.0.0.0:8200).
    VAULT_DEV_ROOT_TOKEN_ID: Sets a development root token (vault-plaintext-root-token) for authentication.
- Security:
    Adds IPC_LOCK capability for enhanced security by preventing memory swapping.
- Networking:
    Connects to test-network for communication with other services.

### Vault Backed Signing Service 

The Canis Major source code implements VaultBackedSigningService that interacts with Vault's API to:

- Retrieve wallet account addresses.
- Sign transactions securely using Vault.


## AEI contract

## AEI contract overview

The AEI Contract is a smart contract written in Solidity that implements the ERC721 standard. This smart contract is designed to be used with Ethereum 
compatible clients and particularly designed to be integrated with Canis Major adaptor, enabling the storage and management of digital assets and their 
relationships on the blockchain.

The AEI Contract allows for the creation, updating, and deletion of digital assets (entities). Each entity can be associated with multiple metadata entries. 
These entities can have multiple relationships with other assets.
The contract is specifically designed to store the NGSI-LD data model.

> [!Note]
> The AEI Contract supports several key methods for managing assets and their metadata:
> - createAsset: Creates a new asset with a unique identifier.
> - getAsset: Retrieves information about a specific asset.
> - updateAsset: Updates the metadata associated with an asset.
> - removeAsset: Deletes an asset.
> - addMetadata: Adds new metadata to an asset.
> - getMetadatas: Retrieves all metadata associated with an asset.
> - removeMetadata: Deletes specific metadata from an asset.
> - addRelation: Establishes a relationship between two assets.
> - getRelations: Lists all relationships of an asset.
> - removeRelation: Deletes a relationship between assets

### Integration with Canis Major




## Ganache

Ganache CLI is used in the Canis Major project as a local Ethereum blockchain emulator that provides:
- A fast and customizable local blockchain environment for testing and development
- Instant mining of transactions without network overheads
- Zero transaction costs for testing
- Pre-configured accounts with test Ether
- Customizable gas price and mining speed


