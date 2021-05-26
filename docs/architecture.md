# Architecture

## Canis Major in powered by FIWARE Architecture

Canis major uses FIWARE Pep-Proxy (fork version) [link](https://github.com/FIWARE-Blockchain/fiware-pep-proxy) which allow to config "canismajor endpoint"

```sh
 process.env.CANIS_MAJOR_URL = http://localhost:4000 (canis major endpoint)
```
chekout the sequece diagram to understand the flow:

### Flow Diagram

Flow diagram of canismjor communicated with other fiware components

![Sequence Diagram](https://raw.githubusercontent.com/FIWARE-Blockchain/CanisMajor/master/docs/images/architecture.png)

### Sequence Diagram

Sequence diagram of canismjor communicated with other fiware components

![Sequence Diagram](https://raw.githubusercontent.com/FIWARE-Blockchain/CanisMajor/master/docs/images/sequence.png)


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

##### IPFS 
You can use IPFS, a distributed system for storing and accessing files and data, in Canis Major Adaptor.
To learn about IPFS please follow [here](https://ipfs.io/) 

##### IOTAMaM (Masked Authenticated Messaging)

Canis Major Also Supporta IOTA MaM. The IOTA Tangle allows you to attach zero-value transactions to it, but these transactions are not signed or checked by nodes to verify their authenticity. With MAM, all messages are signed by the owner of a seed.

To learn about IOTA MaM please follow [link](https://legacy.docs.iota.org/docs/mam/1.0/overview)


##### MerkleTree

Merkle trees are data structures devised to authenticate, with a unique signature, a set of messages, by at the same time making an intended verifier able to verify authenticity of a single message without the disclosure of the other messages.


To learn about Merkle Tree please follow [link](https://en.wikipedia.org/wiki/Merkle_tree)

In a canis major merkle is use as mentioned in below

![Sequence Diagram](https://raw.githubusercontent.com/FIWARE-Blockchain/CanisMajor/master/docs/images/merkletree.png)

### AEI Contract Model

AEI (Asset, Event and Identity) Smart Contract is written in Solidity using ERC721 standard (NFT) and can be use with Ethereum Clients. It is compatible with FIWARE-Canis Major Adaptor to store the data in blockchain. 

#### AEI Architecture

AEI Contract Design

![Sequence Diagram](https://raw.githubusercontent.com/FIWARE-Blockchain/CanisMajor/master/docs/images/aei_model.png)


1. Entity/Asset with a unique identity will be a new asset (1:1 mapping of asset to an identity).
2. Event or Metadata of the asset/entity has a 1:n mapping.
3. An Asset can have a 1:n relationship with any other asset.

#### Example
![Example](https://raw.githubusercontent.com/FIWARE-Blockchain/AEIContract/master/docs/images/2.png)


#### Supported Methods
```sh
- createAsset(bytes32 uuid, string memory _newHash)
- getAsset(bytes32 uuid)
- updateAsset(bytes32 uuid, string memory _newHash)
- removeAsset (bytes32 uuid)
- isValidAsset(bytes32 uuid, bytes32[] memory _proof, bytes32 _leaf)
- isValidAssetEthMessage(bytes32 uuid, bytes32 _messageHash, bytes memory _signature)
- addRelation(bytes32 uuid, bytes32 reluuid)
- getRelations(bytes32 uuid)
- removeRelation(bytes32 uuid, uint index)
- isValidRelation(bytes32 uuid, uint index, bytes32[] memory _proof, bytes32 _leaf)
- addMetadata(bytes32 uuid, string memory _metadatahash)
- getMetadatas(bytes32 uuid) public view returns (string[] memory)
- removeMetadata(bytes32 uuid, uint index)
- isValidMetadata(bytes32 uuid, uint index, bytes32[] memory _proof, bytes32 _leaf)
```
Apart from that ERC721, Ownable, MerkleProof, ECDSA methods are supported.

#### Dependencies
_This project uses:_
 - truffle
 - NodeJS
 - Ganache-CLI (testrpc)
 - OpenZeppelin



#### Canis Major with AEI Contract:

![Canis Major with AEI Contract](https://raw.githubusercontent.com/FIWARE-Blockchain/AEIContract/master/docs/images/3.png)


Please follow the usages section to learn more.