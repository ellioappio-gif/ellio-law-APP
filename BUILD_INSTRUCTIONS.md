# ellio Law - iOS Build Instructions

## Building in Xcode (Recommended)

This app is now configured for native iOS development with maximum compatibility.

### Prerequisites
- Xcode 15 or later
- macOS with Apple Silicon or Intel
- CocoaPods

### Build Steps

1. **Install CocoaPods dependencies** (if not already installed):
   ```bash
   cd ios
   pod install
   ```
   
   **Note**: If you encounter Node.js compatibility issues with `pod install`, you can:
   - Build directly in Xcode (it will handle pods automatically)
   - OR use an LTS Node version (18.x or 20.x)

2. **Open the project in Xcode**:
   ```bash
   open ios/EllioLaw.xcworkspace
   ```
   
   If `.xcworkspace` doesn't exist yet:
   ```bash
   open ios/EllioLaw.xcodeproj
   ```

3. **Select your target**:
   - Choose iPhone 15 simulator or your physical device
   - Select the "EllioLaw" scheme

4. **Build and Run**:
   - Press `Cmd+R` or click the Play button
   - Xcode will automatically install pods if needed

### Troubleshooting

**Pod install fails with Node.js error:**
- Xcode can build without running `pod install` manually
- The app will prompt to install dependencies when you build

**Simulator not launching:**
- Open Simulator app first: `open -a Simulator`
- Then build from Xcode

**Voice features require permissions:**
- Microphone access will be requested on first use
- Grant permissions in iOS Settings if needed

### Features
- ✅ Text/Voice toggle for onboarding
- ✅ Text-to-speech (ellio reads messages aloud)
- ✅ Voice input with microphone
- ✅ Native iOS performance
- ✅ No Android code

### Development
- Source code: `src/` directory
- iOS native: `ios/` directory
- No longer using Expo Go - full native build
