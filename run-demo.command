#!/bin/bash
cd "$(dirname "$0")"
echo "albania-travel demo launcher"
if [ ! -d "web/node_modules" ]; then
  echo "Installing website dependencies, first run only..."
  (cd web && npm install)
fi
echo "Starting website on http://localhost:4328 ..."
osascript -e "tell application \"Terminal\" to do script \"cd '$(pwd)/web' && npm run dev\""
sleep 6
open "http://localhost:4328"
echo ""
echo "Website: http://localhost:4328"
echo "(The CMS is only needed at handoff: see RUNNING.md)"
read -p "Press Enter to close this window..."
