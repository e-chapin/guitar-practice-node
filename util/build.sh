#!/usr/bin/env bash


### Build BackEnd ###

# Remove existing production folder
rm -rf ./build/

# Transpile .ts to .js
tsc --sourceMap false


### Bundle FrontEnd ###

# Create the directory for React
mkdir -p ./build/public/react/react-gp

# Navigate to the react directory
cd ./react-gp

npm install

# Build React code
npm run build

# Rename the folder
mv build react-gp

# Move the contains to the build/ dir
mv react-gp ../build/public/react/