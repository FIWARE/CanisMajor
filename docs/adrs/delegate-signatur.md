# Delegate transaction signing to the client's wallet

## Status

* implemented

## Context

In order to allow verification of the transaction in the blockchain, the responsible account has to be provided. This happens by signing the transaction with
the accounts private-key.

## Decision

The signing is delegated to a "Wallet"(e.g. Keystore) in the domain of the client and can be specified per request to CanisMajor.

## Rational

* the private key should ***never*** leave its owner
* the concrete wallet implementation is up to the client and therefore interchangeable