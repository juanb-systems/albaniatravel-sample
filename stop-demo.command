#!/bin/bash
echo "Stopping albania-travel (ports 3465 and 4328)..."
for port in 4328 3465; do
  pid=$(lsof -ti tcp:$port 2>/dev/null)
  if [ -n "$pid" ]; then
    echo "  stopping port $port"
    kill -9 $pid 2>/dev/null
  fi
done
echo "Done."
read -p "Press Enter to close this window..."
