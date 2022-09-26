# Use envoy as proxy

## Status

- implemented

## Context

A proxy for handling and forwarding the incoming requests is required.

## Decision

The proxy to be used will be [envoy](https://www.envoyproxy.io/).

## Rational

* is maintained by a wide community, most notably the [CNCF](https://www.cncf.io/),  [Lyft](https://www.lyft.com/) and [Google](https://www.google.com/).
* is build for cloud purposes
* very fast according to various benchmarks, thus limiting the impact on the broker performance
* support for proxy-wasm, to enable easy integration of the filter
* integration into service-meshs, like [OSSM](https://cloud.redhat.com/learn/topics/service-mesh) and [Istio](https://istio.io/), possible 