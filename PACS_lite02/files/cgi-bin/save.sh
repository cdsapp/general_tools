#!/bin/bash
echo "Content-Type: text/plain"
echo
cd "$(dirname "$0")"
cd ..
echo "$(<cs.html)"
