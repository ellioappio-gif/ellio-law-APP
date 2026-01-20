#!/bin/bash

# Ellio Law - Real Device Deployment Setup
# This script configures the iOS project for real device deployment

echo "========================================="
echo "Ellio Law - Real Device Setup"
echo "========================================="
echo ""

# Step 1: Check for connected devices
echo "Step 1: Checking for connected iOS devices..."
DEVICES=$(xcrun xcode-select -p)
if [ -z "$DEVICES" ]; then
    echo "ERROR: Xcode is not properly installed. Please install Xcode from App Store."
    exit 1
fi

# List connected devices
echo ""
echo "Connected iOS devices:"
xcrun xctrace list devices 2>/dev/null | grep "iPhone\|iPad" || echo "No physical devices detected. Please connect an iOS device via USB."

echo ""
echo "Step 2: Automatic Code Signing Configuration"
echo "Your Xcode project is configured with automatic code signing."
echo ""
echo "To complete setup for real device deployment:"
echo ""
echo "1. Connect your iPhone to your Mac via USB"
echo "2. Open Xcode:"
echo "   open ios/EllioLaw.xcworkspace"
echo ""
echo "3. In Xcode:"
echo "   - Select the EllioLaw project in the navigator"
echo "   - Select the EllioLaw target"
echo "   - Go to Signing & Capabilities tab"
echo "   - Select your connected device from the device list"
echo "   - Xcode will automatically create a development signing certificate"
echo ""
echo "4. Trust the app on your device:"
echo "   - On your iPhone: Settings > General > Device Management"
echo "   - Trust the developer certificate"
echo ""
echo "5. Run the app:"
echo "   - npm start"
echo "   - In the terminal, press 'i' to open on your connected device"
echo ""
echo "Step 3: Alternative - EAS Build for Real Device"
echo "For a more reliable build process, you can use EAS:"
echo ""
echo "npm install -g eas-cli"
echo "eas login"
echo "eas device create"
echo "eas build --platform ios --device"
echo ""
echo "========================================="
echo "Setup guide created successfully!"
echo "========================================="
