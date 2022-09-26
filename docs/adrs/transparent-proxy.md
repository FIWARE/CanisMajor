# Use a transparent proxy for forward data to CanisMajor

## Status

* implemented

## Context

In order for CanisMajor to persist NGSI-LD requests, a mechanism to forward them is required.

## Decision

A transparent proxy, using the sidecar pattern, is used to intercept and forward the requests.

## Rational

* transparent integration into the request chain
* no influence on the decision for other components, f.e. which pep-proxy to use
* can be used for enforcing CanisMajor to accept ever request