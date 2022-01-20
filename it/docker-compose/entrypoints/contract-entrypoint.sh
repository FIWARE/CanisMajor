#!/bin/bash -x

contractAddressLine=$(truffle migrate | grep 'contract address' | tail -1)

arrIN=(${contractAddressLine//:/})
echo ${arrIN[3]} > /contract-data/address.txt