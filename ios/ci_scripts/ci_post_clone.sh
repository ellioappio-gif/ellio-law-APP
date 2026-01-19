#!/bin/sh

# Xcode Cloud Build Script
# This runs after the repository is cloned
# Script is executed from: /Volumes/workspace/repository/ios/ci_scripts/

echo "🚀 Starting Xcode Cloud build setup..."
echo "📂 Current directory: $(pwd)"

# Install Node.js 20 using Homebrew (more reliable for Xcode Cloud)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    brew install node@20
    export PATH="/usr/local/opt/node@20/bin:$PATH"
else
    echo "✅ Node.js already installed: $(node --version)"
fi

# Navigate to project root (we're in ios/ci_scripts, need to go up 2 levels)
cd ../..
echo "📂 Working directory: $(pwd)"

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm ci --legacy-peer-deps

# Install CocoaPods
echo "📦 Installing CocoaPods dependencies..."
cd ios
pod install --repo-update

echo "✅ Xcode Cloud build setup complete!"
