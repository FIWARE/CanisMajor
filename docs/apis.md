# APIs

## Meta

1. Get the status 

```sh
curl --location --request GET 'http://localhost:4000/version'
```

**Response:**

```json
{
    "name": "canismajor",
    "version": "0.0.1"
}
```


## Config 

**APIs when you are using and configuring your own contract use **config** api else it is recommended use AEI Standard Contract Method**

2. Get All the configs

```sh
curl --location --request GET 'http://localhost:4000/config'
```

3. Get the config by ID

```sh
curl --location --request GET 'http://localhost:4000/config/16'
```

4. Delete a config by ID

```sh
curl --location --request DELETE 'http://localhost:4000/config/17'
```


5. Create a config

```sh
curl --location --request POST 'http://localhost:4000/config' \
--header 'Content-Type: application/json' \
--data-raw '{
            "contextType": "AgriProductType",
            "contextMapping": {
                    "set": ["id"]
            },
            "metadata": {
                "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "x",
          "type": "string"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
    "contractAddress": "0x089b05e9307e56c9dCbF6bd681c405b097bDa586"
    }
}'
```

**Response**

```json
{
    "id": 1,
    "contextType": "AgriProductType",
    "contextMapping": {
        "set": [
            "id"
        ]
    },
    "metadata": {
        "abi": [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "x",
                        "type": "string"
                    }
                ],
                "name": "set",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "contractAddress": "0x089b05e9307e56c9dCbF6bd681c405b097bDa586"
    },
    "updatedAt": "2021-06-07T13:33:57.750Z",
    "createdAt": "2021-06-07T13:33:57.750Z"
}
```

5. Updating a config

```sh
curl --location --request PUT 'http://localhost:4000/config/17' \
--header 'Content-Type: application/json' \
--data-raw '{
            "contextType": "AgriProductType",
            "contextMapping": {
                    "set": ["price"]
            },
            "metadata": {
                "abi": [
                    {
                        "name": "set",
                        "type": "function",
                        "inputs": [
                            {
                                "name": "x",
                                "type": "uint256"
                            }
                        ],
                        "outputs": [],
                        "payable": false,
                        "constant": false,
                        "stateMutability": "nonpayable"
                    }
                ],
                "contractAddress": "0x80734df3B3ac1A9381472158df979fd6328ea47D"
            }
}'
```

## Query 

6. Get All Entities

```sh
curl --location --request GET 'http://localhost:4000/entity'
```

7. Get Entity by Id
```sh
curl --location --request GET 'http://localhost:4000/entity/74'
```

8. Delete an Entity
```sh
curl --location --request DELETE 'http://localhost:4000/entity/3'
```

9. Get entity hash from the Smart Contarct (work's for ethereum client when using AEI contract)
```sh
curl --location --request GET 'http://localhost:4000/entity/85/dlt'
```

10. Get entity by query
```sh
curl --location --request GET 'http://localhost:4000/entity?entityId=urn:ngsi-ld:Building:store021'
```

## Helpers

11. Get Data from IPFS
```sh
curl --location --request GET 'http://localhost:4000/ipfs/zdpuAkwkFon16cicgPHZMwziAqKfGDaQSj1VPsyZLCbmXFKgD'
```

12. Get Data from IOTAMaM
```sh
curl --location --request GET 'http://localhost:4000/iotaMaM/MWJTKMJHQTXLMEDHNV9TAJDAYCTPLGURKCTKYUQMY9CMKUNYX99DCXGQVOVSCHQEAAZGMXDDXA9POSKXJ'
```

13. Get Data from IOTA as Tx
```sh
curl --location --request GET 'http://localhost:4000/iotaTx/VFEWUIWNLAOGYWLLPNUYBV9CGFJWDSVNBJGLOZJOCWYUOIVWXWGGGDP9GTP9TMLIPBFVUVL9TYJUGB999'
```

14. Verify Merkle Root Against given Payload (Result true or false)
```sh
curl --location --request POST 'http://localhost:4000/merkle/bfc871626e72c2550bc2c3b4f70b7c42f2260f3f4a1dc9ebc731785da47a30a5/address' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "urn:ngsi-ld:Building:store343",
    "type": "AgriProductType",
    "category": {
    	"type": "Property",
        "value": ["commercial"]
    },
    "address": {
        "type": "Property",
        "value": {
            "streetAddress": "Bornholmer Straße 65",
            "addressRegion": "Berlin",
            "addressLocality": "Prenzlauer Berg",
            "postalCode": "10439"
        },
        "verified": {
			"type": "Property",
			"value": true
		}
    },
    "@context": [
        "https://fiware.github.io/data-models/context.jsonld",
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
    ]
}'
```

Try out the postman collection [here](https://github.com/fiware/CanisMajor/blob/master/postman.json)