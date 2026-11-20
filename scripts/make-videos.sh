#!/bin/bash
# Make narrated MP4 "Watch & Do" videos from watch.js (for WhatsApp, YouTube, the pilot group).
# Usage:
#   bash scripts/make-videos.sh                 # all projects
#   bash scripts/make-videos.sh p0-2 p1-1       # just these
#   bash scripts/make-videos.sh --voice Karen   # another voice (list: say -v '?')
# Output: videos/<id>-<title>.mp4   (1080×1080, H.264 + AAC)
set -e
cd "$(dirname "$0")/.."
command -v ffmpeg >/dev/null || brew install ffmpeg
mkdir -p scripts/.bin
if [ ! -x scripts/.bin/make_videos ] || [ scripts/make_videos.swift -nt scripts/.bin/make_videos ]; then
  echo "Compiling the video maker (first run only)…"
  swiftc -O -parse-as-library -o scripts/.bin/make_videos scripts/make_videos.swift 2>/dev/null \
   || swiftc -O -o scripts/.bin/make_videos scripts/make_videos.swift
fi
scripts/.bin/make_videos --repo "$PWD" "$@"
