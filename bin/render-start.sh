#!/usr/bin/env bash

# exit on error
set -o errexit

cd build
# Start server
node server.js