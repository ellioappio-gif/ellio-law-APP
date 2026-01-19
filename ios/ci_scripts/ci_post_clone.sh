#!/bin/sh
set -e

# Install Node.js 20 via NVM
export NVM_DIR="$HOME/.nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20

# Install npm dependencies
cd ..
npm ci

# Install CocoaPods
cd ios
pod install

echo "✅ Xcode Cloud build setup complete"
