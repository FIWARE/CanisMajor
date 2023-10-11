# Run

To run CanisMajor via docker, use: 

```
docker run quay.io/fiware/canismajor
```

A full setup, including the context broker, a development-mock [eth-node](https://hub.docker.com/r/trufflesuite/ganache-cli/), the used [contract](https://github.com/FIWARE-Blockchain/AEIContract)
and [Vault](https://github.com/hashicorp/vault) as a wallet can be setup via: 

```
docker-compose -f it/docker-compose/docker-compose-env.yaml -f it/docker-compose/docker-compose-java.yaml up
```
