#!/bin/bash
echo "Content-Type: text/plain"
echo
cd "$(dirname "$0")"
cd ..
TEXT=$(dd bs=1 count="$CONTENT_LENGTH" 2>/dev/null)
echo "$TEXT" > query.txt
echo "Initiating search"
bash search
