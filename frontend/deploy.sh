#!/bin/bash

# Build the React app
npm run build

# Create a new zip file with the correct structure
cd build
zip -r ../deploy.zip .

# Deploy to Azure
cd ..
az webapp deploy --resource-group BravesTakeHome --name braves-takehome-frontend --src-path deploy.zip --type zip 