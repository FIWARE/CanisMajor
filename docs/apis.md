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

## Generate Header TOKEN 

**API to generate token using wallet keys**

2. Create a TOKEN

```sh
curl --location --request POST 'http://localhost:4000/token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "public_key": "HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D",
    "private_key": "HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D:PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX"
}'
```

***Response:***

```json
{
    "dlt-token": "7159c52fa533c84e5e62bba0cf9cb51147533194f5011310e007185977e92e9adc0e95755fea5792fd901252e8ce7977f11aa80088c94a06457f79e942dc22c769a7b7a458814ce71b597d5abf0ecd89a336d1162fd5f95c5ee6fd136d63391c347e5531034274c852f0a82789922e365a6bc54e0152cf274811327a67e3484151a2cef514671e35a2acd62f8341fa92d66342a6ef07a263281b17760b4ddcfbad1ca133ca7115fa451be9f5c35bd2c275b2bb4a5676634264d1a5c67b31a11a93a1871438ddb66f745afd88881255d0a3be16af3050c440f073e7025a931843b3d129921733bd50a607466c70f5f10d704bf6b39a0269691d40fd34bac25dd86715606eaeef84a04920370e9ce5e9b3dbebcb9805545e7e33ed62b3b4e27929f06f497793ce1a33b0c23ac2496c1564876f816cedd48174ea4a14797182bc3ade4479a5cae406de"
}
```

3. TOKEN Info:

```sh
{
curl --location --request POST 'http://localhost:4000/token-info' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dlt-token": "6f54f40abf32bb534407a49ac4b4973a417d0fadfa5a7c01fb070f226bc61c92d955a41750eb6ae7fcbf0e5be6dc151cf440af7c95d977715e50438d5a864aee739886df47937ac1012f4073a532e7a0aa27e42221c4926e4793fe6c715c086f3a6c78550f2508e1539681539f832e1b407af42b1a18b41c463e210078e2573d4bc7fb900f5b3707bcadd91a8d438efed83535d6"
}'
```


***Response:***
```json
{
    "public_key": "0x042D550bbfFAbbEA8A672DB56f14F2Cee7BC59E5",
    "private_key": "0x6437760cd4f29dee72e4c026769ee8ea37a5c8d82930af071855495d0061dc8f"
}
```

## Config 

**APIs when you are using and configuring your own contract use **config** api else it is recommended use AEI Standard Contract Method**

4. Get All the configs

```sh
curl --location --request GET 'http://localhost:4000/config'
```

5. Get the config by ID

```sh
curl --location --request GET 'http://localhost:4000/config/16'
```

6. Delete a config by ID

```sh
curl --location --request DELETE 'http://localhost:4000/config/17'
```


7. Create a config

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

8. Updating a config

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

9. Get All Entities

```sh
curl --location --request GET 'http://localhost:4000/entity'
```

10. Get Entity by Id
```sh
curl --location --request GET 'http://localhost:4000/entity/74'
```

11. Delete an Entity
```sh
curl --location --request DELETE 'http://localhost:4000/entity/3'
```

12. Get entity hash from the Smart Contarct (work's for ethereum client when using AEI contract)
```sh
curl --location --request GET 'http://localhost:4000/entity/85/dlt'
```

13. Get entity by query
```sh
curl --location --request GET 'http://localhost:4000/entity?entityId=urn:ngsi-ld:Building:store021'
```

## Helpers

14. Get Data from IPFS
```sh
curl --location --request GET 'http://localhost:4000/ipfs/zdpuAkwkFon16cicgPHZMwziAqKfGDaQSj1VPsyZLCbmXFKgD'
```

15. Get Data from IOTAMaM
```sh
curl --location --request GET 'http://localhost:4000/iotaMaM/MWJTKMJHQTXLMEDHNV9TAJDAYCTPLGURKCTKYUQMY9CMKUNYX99DCXGQVOVSCHQEAAZGMXDDXA9POSKXJ'
```

16. Get Data from IOTA as Tx
```sh
curl --location --request GET 'http://localhost:4000/iotaTx/VFEWUIWNLAOGYWLLPNUYBV9CGFJWDSVNBJGLOZJOCWYUOIVWXWGGGDP9GTP9TMLIPBFVUVL9TYJUGB999'
```

17. Verify Merkle Root Against given Payload (Result true or false)
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