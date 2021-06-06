# Architecture

## Canis Major in powered by FIWARE Architecture

Canis major uses FIWARE Pep-Proxy (fork version) [link](https://github.com/FIWARE-Blockchain/fiware-pep-proxy) which allow to config "canismajor endpoint"

```sh
 process.env.CANIS_MAJOR_URL = http://localhost:4000 (canis major endpoint)
```

### Flow Diagram


![Architecture Diagram](https://raw.githubusercontent.com/FIWARE-Blockchain/CanisMajor/master/docs/images/cm.png)

The way Canis Major work's in 'Powered By FIWARE' architecture as follows:

1. Request from the user is consist of the Payload, Header with token and DLT_ID (base64 of public key and private key of the blockchain).
2. Wilma PEP Proxy validate the token and check with the KeyRock IDM and validate the user, permission (Authentication and Autherisation).
3. Once the user is validate Wilma forward the request to the Context Broker and persist it.
4. Once the Payload stored in Context Broker Wilma notify to Canis Major with the configuration such as what attribute of the payload should be store, Blockchain Identity of the user.
5. Futher Canis Major persist the data in blockchain using AEI contract (will be explained futher in this chapter).

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

ERC 721 Contract is follow OpenZepplin standards, security audits are trusted by leading organizations building decentralized systems.

### ERC 721

ERC 721 A standard interface for non-fungible tokens, also known as deeds.
The following standard allows for the implementation of a standard API for NFTs within smart contracts. This standard provides basic functionality to track and transfer NFTs.

We considered use cases of NFTs being owned and transacted by individuals as well as consignment to third party brokers/wallets/auctioneers (“operators”). NFTs can represent ownership over digital or physical assets. We considered a diverse universe of assets, and we know you will dream up many more:

Physical property — houses, unique artwork
Virtual collectables — unique pictures of kittens, collectable cards
“Negative value” assets — loans, burdens and other responsibilities
In general, all houses are distinct and no two kittens are alike. NFTs are distinguishable and you must track the ownership of each one separately.

to know more follow here: 

1. [ERC 721](https://eips.ethereum.org/EIPS/eip-721)
2. [OpenZepplin ERC721](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721)


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


## Use of Canis Major

CanisMajor is a blockchain adaptor that supports various DLT.


### Canis Major Design
![CanisMajor Design](https://raw.githubusercontent.com/CattleChain/Docs/master/images/cm.png)


The way Canis Major work's in 'Powered By FIWARE' architecture as follows:

1. Request from the user is consist of the Payload, Header with token and DLT_ID (base64 of public key and private key of the blockchain).
2. Wilma PEP Proxy validate the token and check with the KeyRock IDM and validate the user, permission (Authentication and Autherisation).
3. Once the user is validate Wilma forward the request to the Context Broker and persist it.
4. Once the Payload stored in Context Broker Wilma notify to Canis Major with the configuration such as what attribute of the payload should be store, Blockchain Identity of the user.
5. Futher Canis Major persist the data in blockchain using AEI contract (will be explained futher in this chapter).


[Github Souce](https://github.com/FIWARE-Blockchain/CanisMajor)
[Documentation](https://fiware-blockchain.github.io/CanisMajor/architecture.html)


## Usages

### Creation of an Entity (Animal, Farm etc)

![Creation of an entity](https://raw.githubusercontent.com/CattleChain/Docs/master/images/createentity.png)


**Creation of an entity goes as follow:**


1. Actor create an request with a payload to PEP Proxy.
    *  the request is consist of the payload and in header TOKEN (generate from the keyrock IDM) and the DLT_KEYS (which is a base64 for public and private key of the wallet).
2. Wilma autherize the request of the user by validating it from the keyrock IDM.
3. On Success wilma submit the request to the Context Broker and the entity will be store.
4. On Successfully entity creation wilma notify the CanisMajor Adaptor to persist the entity in blockchain (where the smart contract is already configured).
    *   Willma notify the CanisMajor with payload, dlt_keys in header and it also support option ctx_map (which allow user to mention what particular keys from the payload should be persist in the smart contract).
5. Canis Major further validate the DLT_KEY (identity), create a signed transaction and submit it to the blockchain.
    * Here we are using AEI_Contract and the createAsset method of the contract is called.
6. On successful transacation creation the tx_reciept of the transaction will be available in canis major, which can be queried any time.

### Adding Metadata (eventy) on an Entity (Animal, Farm etc)

![Adding Metadata](https://raw.githubusercontent.com/CattleChain/Docs/master/images/addattr.png)


**Adding Metadata on an entity goes as follow:**


1. Actor create an request with a payload to PEP Proxy.
    *  the request is consist of the payload and in header TOKEN (generate from the keyrock IDM) and the DLT_KEYS (which is a base64 for public and private key of the wallet).
2. Wilma autherize the request of the user by validating it from the keyrock IDM.
3. On Success wilma submit the request to the Context Broker with the meta information and entity_id.
4. On Successfully entity creation wilma notify the CanisMajor Adaptor to persist the entity in blockchain (where the smart contract is already configured).
    *   Willma notify the CanisMajor with payload, dlt_keys in header and it also support option ctx_map (which allow user to mention what particular keys from the payload should be persist in the smart contract).
5. Canis Major further validate the DLT_KEY (identity), create a signed transaction and submit it to the blockchain.
    * here the request is for adding the metadata, canis major will call AddMetadata method of the AEI Contract.
6. On successful transacation creation the tx_reciept of the transaction will be available in canis major, which can be queried any time.

### Qyery

![Query](https://raw.githubusercontent.com/CattleChain/Docs/master/images/query.png)


**Quering the data on blockchain goes as follow:**


1. Actor send a request to canis major with the Entity_ID.
2. Canis major check the transaction details from the local storage and fetch the reciept.
3. Canis Major futher call the AEI contarct, getAsset method and the fetch the stored hash.
4. Hash will be returned back to the hash.

**Note: the returned Hash could be a IPFS Hash, IOTAMaM hash or MerkleRoot, depend on the configuration of the CanisMajor and data from the has can be fetched or validated from the canismajor query apis (for more checkout the canismajor api specification)"