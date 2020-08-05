# CanisMajor - FIWARE Blockchain Adaptor

CanisMajor is a blockchain adaptor that supports various DLT, the adaptor aims to submit the data to directly DLT from FIWARE Context Broker using subscriptions.
The adaptor will not be recommended to work for public-permissionless blockchains (specially tokens, cryptocurrencies).
# Architecture
![CanisMajor Architecture](https://github.com/FIWARE-Blockchain/CanisMajor/blob/master/CanisMajor.png)
### Task
#### ETH/JSON-RPC
- [x] support ethereum
- [x] testrpc/ganache-cli
- [x] quarom
- [x] Hyperledger Besu
- [ ] contract context mapping
- [ ] test-case
- [ ] documentation
- [ ] tutorial

#### IOTA
- [ ] http provider
- [ ] public/private transcation
- [ ] secret managment
- [ ] zmq support
- [ ] test-case
- [ ] documentation
- [ ] tutorial

#### Future Work
- [ ] Hyperledger Sawtooth
- [ ] Corda
- [ ] Multichain
- [ ] Hyperledger FABRIC Chaincode

### Dependencies
_This project uses:_
 - nodeJS (v-10)

### Installation guide

1. Install NodeJS (you can use nvm to set the needed version)
2. Install npm dependencies (run  ```npm install```  in the root folder of the project.)

### Configuration


FIWARE Foundation e.V @ 2020
