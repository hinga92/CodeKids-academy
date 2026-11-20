#!/bin/bash
# Build CodeKids Academy and run it in the iPhone simulator.
# Usage:  cd ~/Automation-Projects/CodeKids-academy && bash run_ios_simulator.sh ["iPhone 18 Pro"]
set -e
cd "$(dirname "$0")"
DEVICE="${1:-iPhone 18 Pro}"
npm install --silent
npm run sync
UDID=$(xcrun simctl list devices available | grep -F "$DEVICE (" | head -1 | grep -oE '[0-9A-F-]{36}')
[ -z "$UDID" ] && { echo "Simulator '$DEVICE' not found. Run: xcrun simctl list devices available"; exit 1; }
xcrun simctl boot "$UDID" 2>/dev/null || true
open -a Simulator 2>/dev/null || open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app
xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Debug \
  -destination "id=$UDID" -derivedDataPath ios/App/build CODE_SIGNING_ALLOWED=NO build | tail -1
xcrun simctl install "$UDID" ios/App/build/Build/Products/Debug-iphonesimulator/App.app
xcrun simctl launch "$UDID" com.karanja.codekids
