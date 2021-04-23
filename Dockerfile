########################################################################################
#
#  - DB_NAME
#  - DB_HOST
#  - DB_PORT
#  - DB_DILECT
#  - DB_USERNAME
#  - DB_PASSWORD
#  - CM_PORT
#  - TRANSCTION_TIMEOUT
#  - DLT_TYPE  // eth or iota
#  - IOTA_ENDPOINT // iota config
# // eth config
#  - DEFAULT_GAS
#  - DEFAULT_GAS_PRICE
#  - AEI_CONTRACT_MODE
#  - CONTRACT_ADDRESS
# // storage config
#  - STORAGE_TYPE // iota, ipfs or merkletree
#  - IPFS_HOST
#  - IPFS_PORT
#  - IPFS_PROTOCOL
#  - IPFS_AUTH_CODE
#  - IOTAMAM_HOST
#  - IOTAMAM_MODE
#
########################################################################################

# ARG NODE_VERSION=12
# ARG GITHUB_ACCOUNT=fiware-blockchain
# ARG GITHUB_REPOSITORY=CanisMajor

# build environment (still under development)
FROM node:12
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
EXPOSE 4000
CMD ["npm","run", "dev" ]
HEALTHCHECK  --interval=30s --timeout=3s --start-period=60s \
  CMD ["npm", "healthcheck"]