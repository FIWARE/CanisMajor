#!/bin/bash

# let through everything from root, the proxy is using that user anyways
iptables -t nat -A OUTPUT -m owner --uid-owner 0 -j RETURN

# forward everything sent to 1026 to 15001(port of envoy).
# we do not send all(as we do in real-world scenarios) to keep the dev/test system mostly untouched.
iptables -t nat -A OUTPUT -p tcp -d 10.5.0.0/16 --dport 1026 -j REDIRECT --to-port 15001

