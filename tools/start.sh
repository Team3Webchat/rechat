#!/usr/bin/env bash

# Make sure we are in the project root
cd `dirname $0`
cd ..
cd ui

set -e

USE_UNITY=0
USE_NPM=0

case "$1" in
a)
  USE_UNITY=1
  ;;
h)
  USE_XFCE=1
  ;;
*)
  echo "Pass in H or A depending on what your name starts with"
  exit 1
  ;;
esac

if [ $USE_UNITY -eq 1 ]; then
  gnome-terminal --tab --command  "npm start"
  cd ../server
   npm start
fi

if [ $USE_XFCE -eq 1 ]; then
  xfce4-terminal --tab --command  "npm start"
  cd ../server
   npm start
fi
