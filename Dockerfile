# Development Dockerfile not for production
ARG NODE_VERSION=12
# build environment
FROM node:${NODE_VERSION}
WORKDIR /app
COPY . /app

ENV CM_PORT="4000" \
  DB_NAME="basic" \
  DB_HOST="localhost" \
  DB_NAME="cm" \
  DB_DILECT="mysql" \
  TRANSCTION_TIMEOUT=1000 

# In DEVELOPMENT Mode Now
ENV NODE_ENV=development

RUN npm install
RUN npm run build

EXPOSE ${CM_PORT:-4000}

CMD ["npm", "start"]

HEALTHCHECK  --interval=30s --timeout=3s --start-period=60s \
  CMD ["npm", "healthcheck"]

# ALL ENVIRONMENT VARIABLES
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
