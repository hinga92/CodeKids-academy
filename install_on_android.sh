#!/bin/bash
# Build CodeKids Academy and install it on a USB-connected Android phone/tablet (USB debugging on),
# the same way as LearnGate.
# Usage:  cd ~/Automation-Projects/CodeKids-academy && bash install_on_android.sh
set -e
cd "$(dirname "$0")"
export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home   # Capacitor 8 needs Java 21
[ -d "$JAVA_HOME" ] || brew install openjdk@21
export ANDROID_HOME=/opt/homebrew/share/android-commandlinetools
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
npm install --silent
npm run sync
(cd android && ./gradlew assembleDebug -q)
adb devices | grep -w device >/dev/null || { echo "No Android device found. Plug it in and tap 'Allow' for USB debugging."; exit 1; }
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.karanja.codekids/.MainActivity
echo "✅ CodeKids Academy installed and opened."
