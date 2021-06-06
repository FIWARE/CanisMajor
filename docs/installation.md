# Installation Guide

This section describes installing Canis Major Blockchain Adaptor:


# Requirments
In order to execute Canis Major, it is needed to have previously installed the following software:
 - NodeJS 12
 - ORM Database (SQL, Postgres)


 # Installation

The following steps need to be performed to get Canis Major up and running:


1. Download the software, using GitHub.

 ```sh
    git clone https://github.com/fiware-blockchain/canismajor
```

 2. Install all required libraries using npm.

```sh
    cd canismajor
    npm install
```

 3. Database Init/Migration
 
```sh
    DB_USERNAME=${DB_USERNAME} \
    DB_PASSWORD=${DB_PASSWORD} \
    DB_NAME=${DB_NAME} \
    DB_HOST=${DB_HOST} \
    DB_PORT=${DB_PORT} \
    npm run create && npm run migrate
```

 4. Configure the installation
 
```sh
          - DB_NAME
          - DB_HOST
          - DB_PORT
          - DB_DILECT
          - DB_USERNAME
          - DB_PASSWORD
          - CM_PORT
          - TRANSCTION_TIMEOUT
          - DLT_TYPE  // eth or iota
          - IOTA_ENDPOINT // iota config
         // eth config
          - RPC_ENDPOINT
          - DEFAULT_GAS
          - DEFAULT_GAS_PRICE
          - AEI_CONTRACT_MODE
          - CONTRACT_ADDRESS
         // storage config
          - STORAGE_TYPE // iota, ipfs or merkletree
          - IPFS_HOST
          - IPFS_PORT
          - IPFS_PROTOCOL
          - IPFS_AUTH_CODE
          - IOTAMAM_HOST
          - IOTAMAM_MODE
```


| ENV Variable        | Description           | Example  |
| ------------- |:-------------:| -----:|
| DB_NAME      | Name of the Database | cm |
| DB_HOST      | Database HOST name      |   localhost |
| DB_PORT | Database PORT number      |    3306 |
| DB_DILECT | Database Dilect (sequlize ORM) can be mysql, postgres     |    mysql |
| DB_USERNAME | Database User Name      |    root |
| DB_PASSWORD | Database Password      |    root |
| TRANSCTION_TIMEOUT | Transaction timeout    |    1000 |
| DLT_TYPE | Ledger or Blockchain Type (Can be eth or iota)      |    eth |
| IOTA_ENDPOINT (optional) | IOTA Endpoint (required) when the DLT_TYPE=iota      |    'https://nodes.devnet.iota.org:443' |
| RPC_ENDPOINT | Endpoint of the ethereum client     |    'http://127.0.0.1:8545' |
| DEFAULT_GAS | Default GAS usage of the Eth Smart Contract     |    300000 |
| AEI_CONTRACT_MODE | AEI contract enabled or not      |    true |
| CONTRACT_ADDRESS | Contract Address of the deployed smart contract      |    0xcd125237903865f39caf6443209c89bA70a4A385 |
    
    
 **Storage Configuration**   

***ipfs***
    
| ENV Variable        | Description           | Example  |
| ------------- |:-------------:| -----:|
| STORAGE_TYPE | Storage type to store the payload (can be ipfs, iota or merkletree)     |    ipfs |
| IPFS_HOST | IPFS host name     |    ipfs.infura.io |
| IPFS_PORT | IPFS port number     |    5001 |
| IPFS_PROTOCOL | IPFS protocol     |    https |
| IPFS_AUTH_CODE (optional) | Bearer Auth code     |  " "   |

***IOTAMaM***
    
| ENV Variable        | Description           | Example  |
| ------------- |:-------------:| -----:|
| STORAGE_TYPE | Storage type to store the payload (can be ipfs, iota or merkletree)     |    iota |
| IOTAMAM_HOST | IOTAMaM Host Name   |    https://nodes.devnet.iota.org |
| IOTAMAM_MODE | IOTAMaM mode (can be public or private)     |    public |

***Merkle Tree***
    
| ENV Variable        | Description           | Example  |
| ------------- |:-------------:| -----:|
| STORAGE_TYPE | Storage type to store the payload (can be ipfs, iota or merkletree)     |    merkletree |


Configuration diagram 
![config](https://raw.githubusercontent.com/FIWARE-Blockchain/tutorials.Step-by-Step/master/docs/config.png)


there configuration can be also mentioned in src/configuration/config.js


 4. Running the CanisMajor

 ```sh
    npm start
 ```
