# CanisMajor - FIWARE Blockchain Adaptor

[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/4661/badge)](https://bestpractices.coreinfrastructure.org/projects/4661)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation badge](https://readthedocs.org/projects/canismajor/badge/?version=latest)](https://canismajor.readthedocs.io/)
[![Node.js CI](https://github.com/FIWARE-Blockchain/CanisMajor/workflows/Node.js%20CI/badge.svg)](https://github.com/FIWARE-Blockchain/CanisMajor/actions?query=workflow%3A%22Node.js+CI%22)
![Node.js CI](https://img.shields.io/david/Fiware-Blockchain/CanisMajor)

CanisMajor is a blockchain adaptor that supports various DLT, the adaptor aims to submit the data to DLT in Powered By FIWARE Architecture.
The adaptor will not be recommended to work for public-permissionless blockchains (specially tokens, cryptocurrencies).

|  <img src="https://assets.getpostman.com/common-share/postman-logo-stacked.svg" align="center" height="25"> [Postman Collections](https://documenter.getpostman.com/view/10787222/TWDUqdYn) |   <img src="https://static.apiary.io/assets/1lqsC4I4.png" height="20px" width="20px"/><br/> [**API Documentation**](https://canismajor.docs.apiary.io/) |
|---- | --- |
# Architecture

Currently Canis Major implement an experimental achitecture which work in public subscribe manner.
## CanisMajor Publish/Notify Architecture (v0.1 Architecture)
![CanisMajor Publish/Notify Architecture](https://github.com/FIWARE-Blockchain/CanisMajor/blob/master/docs/images/architecture_2.png)


Another stable solution to use canis major as a proxy which is more suitable and will be mature in future.
## CanisMajor As a PROXY Architecture (v0.2 Architecture) (Recommended)
![CanisMajor Publish/Notify Architecture](https://github.com/FIWARE-Blockchain/CanisMajor/blob/master/docs/images/architecture_1.png)


## Supported DLT Clients
- [x] Ethereum 
- [ ] IOTA
- [ ] FABRIC Chaincode

### Dependencies
_This project uses:_
 - nodeJS (v-12)

### Installation guide

1. Install NodeJS (you can use nvm to set the needed version)
2. Install npm dependencies (run  ```npm install```  in the root folder of the project.)

### Configuration


## License

CanisMajor is licensed under the [MIT](LICENSE) License.

© 2021 FIWARE Foundation e.V.
