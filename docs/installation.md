# Installation Guide

This section describes installing Canis Major Blockchain Adaptor:


# Requirments
In order to execute Canis Major, it is needed to have previously installed the following software:
 - NodeJS 12
 - ORM Database (SQL, Postgres)


 # Installation

The following steps need to be performed to get Canis Major up and running:


1. Download the software, using GitHub.

``sh
    git clone https://github.com/fiware-blockchain/canismajor
```

 2. Install all required libraries using npm.

```sh
    cd canismajor
    npm install
```

 3. Database Init/Migration
 ```sh
    DB_USERNAME=${DB_USERNAME} \
    DB_PASSWORD=${DB_PASSWORD} \
    DB_NAME=${DB_NAME} \
    DB_HOST=${DB_HOST} \
    DB_PORT=${DB_PORT} \
    npm run create && npm run migrate
```

 4. Configure the installation
 ```sh
 ```

 