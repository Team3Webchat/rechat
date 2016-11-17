#!/usr/bin/env bash

# Make sure we are in the project root
cd `dirname $0`
cd ..

set -e

DEPLOY_SERVER=0
DEPLOY_UI=0

case "$1" in
server)
  DEPLOY_SERVER=1
  ;;
ui)
  DEPLOY_UI=1
  ;;
*)
  echo "Pass server or ui as a parameter to deploy"
  exit 1
  ;;
esac

if [ $DEPLOY_SERVER -eq 1 ]; then
  cd server
  npm run build
  cd ..
  git subtree push --prefix server/ heroku master
  cd ..
  echo "Server deployed"
fi

if [ $DEPLOY_UI -eq 1 ]; then
  cd ui
  npm run deploy
  cd ..
  echo "UI deployed"
fi