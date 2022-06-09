#!/bin/bash

# @author: Shoukath Mohammed, Dinesh Gurram

echo "In build script..."

NPM_DIR="./node_modules"

if [ ! -d "$NPM_DIR" ]; then
    npm cache clean --force
    npm i --force
fi

echo "Printing out deploy path: $2"

echo "Cleaning out the directories..."
rm -rf ./dist
rm -rf ./bundle
rm -rf ./temp
rm -rf ./gcp

echo "Building angular bundle..."
npm run lint

npm run ng -- build --prod --aot --vendor-chunk=true --deploy-url=$2 --build-optimizer --output-hashing=all --output-path=bundle/temp --no-progress

npx gulp imagePath --src=bundle/temp/ --deploy-url=$2

npx gulp package

npx gulp updateBuild


echo "Executing permissions..."
chmod -R 755 gcp/
chmod -R 755 dist/

if [ $? -ne 0 ]; then
  echo "Build error, exiting.."
  exit 1
fi

echo "=== GCP bundling completed ==="
