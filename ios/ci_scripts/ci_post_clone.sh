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

# Export Node.js path for xcodebuild phase
export PATH="/usr/local/opt/node@20/bin:$PATH"
export NODE_BINARY=$(command -v node)

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo "✅ Node binary: $NODE_BINARY"

# Write Node.js path to .xcode.env for xcodebuild to use (overwrite any existing file)
cd "$REPO_ROOT/ios"
cat > .xcode.env << EOF
export NODE_BINARY=$NODE_BINARY
export PATH=/usr/local/opt/node@20/bin:\$PATH
EOF
echo "✅ Created .xcode.env with Node.js path: $NODE_BINARY"

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
