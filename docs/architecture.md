# Architecture

## Canis Major in powered by FIWARE Architecture

Canis major uses FIWARE Pep-Proxy (fork version) [link](https://github.com/FIWARE-Blockchain/fiware-pep-proxy) which allow to config "canismajor endpoint"

```sh
 process.env.CANIS_MAJOR_URL = http://localhost:4000 (canis major endpoint)
```
chekout the sequece diagram to understand the flow:

### Flow Diagram

Flow diagram of canismjor communicated with other fiware components

![Sequence Diagram](https://github.com/FIWARE-Blockchain/CanisMajor/blob/master/docs/images/architecture.png)

### Sequence Diagram

Sequence diagram of canismjor communicated with other fiware components

![Sequence Diagram](https://github.com/FIWARE-Blockchain/CanisMajor/blob/master/docs/images/sequence.png)


### Canis Major Design:

Canis major is designed to submit the transaction in diffrent kind of DLT current it support these blockchain

#### Supported DLT Clients
- [x] Ethereum 
- [x] IOTA
- [ ] FABRIC Chaincode

and is not recommended to use in public-permissionless or crypotcurrencies.

For the Etherum Clients such as geth, quorum, besu etc it is recommended to use AEI contract (plese check the contract section in this documentation), though you can also use your own contract and configure it using canismajor rest api.


Canis Major also support varsion storage type store the payload 

#### Storage Type
- [x] IPFS 
- [x] IOTA MaM
- [x] Merkle Tree

Please follow the usages section to learn more.