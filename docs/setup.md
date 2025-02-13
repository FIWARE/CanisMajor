# Prerequisites for Running Canis Major


This document outlines the prerequisites for running the Canis Major adapter without issues. The setup has been tested on an Ubuntu 22.04.1 LTS virtual machine running on FIWARE Lab. For more information on [FIWARE lab](https://www.fiware.org/developers/fiware-lab/) check the official documentation.

## Java setup

The Canis Major adaptor is currently functional using Java 21. Here are the specific details of the Java version used:

- **Version**: OpenJDK 21.0.5
- **Release Date**: October 15, 2024
- **Distribution**: OpenJDK (Open Java Development Kit)
To install OpenJDK 21 on Ubuntu 22.04, the following command could be used:

````bash
sudo apt update
sudo apt install openjdk-21-jdk
````
To verify the Java installation:
````bash
java -version
````

## Docker Setup

Docker is required to run Canis Major. The following version have been tested and confirmed to work:

**Docker Version**: 27.3.1, build ce12230


For a proper docker installation follow the instructions provided in the official [documentation](https://docs.docker.com/engine/install/ubuntu/).

To verify the installation use these commands:
```bash
docker --version
docker compose version
```
The output will be similar to this:

```bash
Docker version 27.3.1, build ce12230
Docker Compose version v2.29.7
```

Proper setup is crucial for the proper functioning of the Canis Major adapter and for avoiding any issues when testing it.


