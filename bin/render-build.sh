#!/usr/bin/env bash

# exit on error
set -o errexit

npm i
node ace build --ignore-ts-errors --production
cd build
cp -r ../prisma .
echo "RUNNING CI..."
npm ci --production
echo "RUNNING PRISMA MIGRATE DEPLOY..."
ENV_PATH=/etc/secrets/.env npx prisma migrate deploy
echo "GOING OUT OF BUILD"
cd ..