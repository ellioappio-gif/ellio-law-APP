#!/bin/sh

# Xcode Cloud Build Script
# This runs after the repository is cloned
# Script is executed from: /Volumes/workspace/repository/ios/ci_scripts/

set -e  # Exit on any error

echo "🚀 Starting Xcode Cloud build setup..."
echo "📂 Script location: $(pwd)"

# Store the repository root path
REPO_ROOT="$(cd ../.. && pwd)"
echo "📂 Repository root: $REPO_ROOT"

# Install Node.js 20 using Homebrew (more reliable for Xcode Cloud)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    brew install node@20
    export PATH="/usr/local/opt/node@20/bin:$PATH"
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install npm dependencies
echo "�� Installing npm dependencies..."
cd "$REPO_ROOT"
echo "📂 Current directory: $(pwd)"
npm ci --legacy-peer-deps

# Install CocoaPods
echo "📦 Installing CocoaPods dependencies..."
cd "$REPO_ROOT/ios"
echo "📂 Current directory: $(pwd)"
ls -la | head -10
pod install --repo-update

echo "✅ Xcode Cloud build setup complete!"
