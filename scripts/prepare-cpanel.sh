#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="$ROOT_DIR/public"
OUTPUT_ARCHIVE="$ROOT_DIR/public-dist.zip"

cd "$ROOT_DIR"

echo "Installing dependencies..."
npm install

echo "Cleaning previous build..."
rm -rf "$BUILD_DIR" .cache

echo "Building production bundle..."
PRISMIC_REPOSITORY_NAME="" GATSBY_CPU_COUNT=1 npm run build

if [ -f "$OUTPUT_ARCHIVE" ]; then
  echo "Removing existing archive: $OUTPUT_ARCHIVE"
  rm "$OUTPUT_ARCHIVE"
fi

echo "Creating deployment archive..."
cd "$BUILD_DIR"
zip -qr "$OUTPUT_ARCHIVE" .

cd "$ROOT_DIR"
echo "Deployment archive created at: $OUTPUT_ARCHIVE"
echo "Archive size: $(du -h "$OUTPUT_ARCHIVE" | cut -f1)"
