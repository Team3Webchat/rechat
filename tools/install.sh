#!/usr/bin/env bash

# Make sure we are in the project root
cd `dirname $0`
cd ..

set -e

USE_YARN=0
USE_NPM=0

case "$1" in
n)
  USE_NPM=1
  ;;
y)
  USE_YARN=1
  ;;
*)
  echo "Pass in n as parameter to use npm or y as parameter to use yarn"
  exit 1
  ;;
esac

if [ $USE_YARN -eq 1 ]; then
  yarn install
  cd server
  yarn install
  cd ../ui
  yarn install
  cd ..
  echo "Dependencies installed using yarn"
fi

if [ $USE_NPM -eq 1 ]; then
  npm install
  cd server
  npm install
  cd ../ui
  npm install
  cd ..
  echo "Dependencies installed using npm"
fi