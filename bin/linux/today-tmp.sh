#!/bin/bash

_mydir="$(pwd)"
BASEDIR=$(dirname "$0")

cd "$BASEDIR"
cd ..
cd ..
node today-tmp.js "$1"
cd $_mydir