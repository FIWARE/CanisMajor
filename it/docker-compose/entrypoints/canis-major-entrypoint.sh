#!/bin/bash -x

wait_file() {
  local file="$1"; shift
  local wait_seconds="${1:-10}"; shift # 10 seconds as default timeout

  until test $((wait_seconds--)) -eq 0 -o -e "$file" ; do sleep 1; done

  ((++wait_seconds))
}

wait_file /contract-data/address.txt

export CONTRACT_ADDRESS=$(cat /contract-data/address.txt)

npm start