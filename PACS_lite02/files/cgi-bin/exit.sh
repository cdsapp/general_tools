#!/bin/bash
echo "Content-Type: text/plain"
echo
cd "$(dirname "$0")"
cd ..
SERVER_PID=$(cat serverID.tmp)
kill "$SERVER_PID"
echo "Server $SERVER_PID Killed"
echo "Deleting session files"
rm -f serverID.tmp
rm -f cs.html
rm -f cs.list
rm -f hits.txt
rm -f log.tmp
rm -f query.txt
