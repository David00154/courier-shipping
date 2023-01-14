#!/usr/bin/env bash

# exit on error
set -o errexit

npm i
node ace build --ignore-ts-errors --production
cd build
npm ci --production
cd ..