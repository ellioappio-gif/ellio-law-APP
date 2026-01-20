# Ellio Law - Real Device Deployment Guide

## Quick Setup (Recommended)

### Prerequisites
- iPhone running iOS 15.1 or later
- Mac with Xcode installed
- Apple Developer Account (free)

### Step 1: Connect Your iPhone
1. Plug your iPhone into your Mac via USB cable
2. Open Xcode:
   ```bash
   open ios/EllioLaw.xcworkspace
   ```

### Step 2: Configure Code Signing in Xcode
1. In Xcode, select **EllioLaw** project in the navigator
2. Select **EllioLaw** target
3. Go to **Signing & Capabilities** tab
4. Under "Team", select your Apple ID or personal team
5. Xcode will automatically create a development signing certificate
6. Your device will appear in the device list

### Step 3: Trust Certificate on iPhone
1. On your iPhone, go to **Settings > General > Device Management**
2. Find your Apple ID
3. Tap **Trust "[Your Name]"**

### Step 4: Run App on Device
```bash
cd /Users/codysmith_1/Desktop/ellio-law
npm start
```

In the terminal, press `i` to open on your connected iPhone (instead of simulator).

---

## Alternative: EAS Build (Cloud-Based)

For a more robust deployment, use Expo Application Services (EAS):

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login

# Register your device
eas device create

# Build for your device
eas build --platform ios --device

# After build completes, follow the install link on your phone
```

---

## Troubleshooting

### "Code signing identity not found"
- Ensure you selected a team in Xcode's Signing & Capabilities
- Run: `xcode-select --install` to install command line tools

### "iPhone not detected in Xcode"
- Try unplugging and replugging the USB cable
- Restart Xcode
- On iPhone: tap "Trust" when prompted

### "App crashes immediately on device"
- Check Console output in Xcode for error messages
- Ensure all permissions are granted in app settings
- Try rebuilding the project: `npm run ios`

### "Cannot connect to Metro Bundler"
- Ensure iPhone and Mac are on the same WiFi network
- Restart the dev server: `npm start`
- Check your firewall settings

---

## App Configuration for Real Devices

The app is already configured with:
- ✅ Automatic code signing enabled
- ✅ Camera permissions configured
- ✅ Photo library permissions configured
- ✅ Microphone permissions configured
- ✅ Wallet integration ready

All permissions will be requested when first needed by the app.

---

## Development Tips

- **Reload App**: Press `r` in the terminal
- **Open DevTools**: Press `j` in the terminal
- **View Logs**: Check Xcode Console or terminal output
- **Hot Reload**: Changes to code will auto-reload on device

---

## Next Steps

1. Connect your iPhone
2. Run the setup from Xcode
3. Start the dev server: `npm start`
4. Test all 33 legal case management features on your device!
