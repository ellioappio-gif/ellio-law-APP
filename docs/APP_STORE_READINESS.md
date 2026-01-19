# ellio-law App Store Readiness

## Generation Info
- **Date**: 2026-01-19
- **Commit**: e4b8acf
- **Platform Focus**: iOS App Store
- **Method**: Evidence-based file inspection

## Current Status: PARTIAL COMPLIANCE

### iOS Privacy Strings ✅ PRESENT

From [app.json](../app.json) lines 17-21:

```json
"infoPlist": {
  "NSCameraUsageDescription": "This app needs camera access to capture photos of legal documents and evidence.",
  "NSPhotoLibraryUsageDescription": "This app needs photo library access to select and upload legal documents.",
  "NSPhotoLibraryAddUsageDescription": "This app needs permission to save documents to your photo library."
}
```

**Status**: ✅ COMPLIANT  
**Features Covered**:
- DocumentCapture component (camera)
- DocumentCapture component (photo library)
- Document saving (photo library write)

### Missing Privacy String: Microphone ⚠️ CONDITIONAL

**Feature**: VoiceNotes component ([src/components/VoiceNotes.tsx](../src/components/VoiceNotes.tsx))  
**Status**: Placeholder/Not Implemented  
**Evidence**: Lines 31-37 show `// TODO: Implement actual recording with expo-av`

**Current Risk**: LOW (feature not functional)  
**Future Requirement**: If VoiceNotes is implemented, must add:
```json
"NSMicrophoneUsageDescription": "ellio needs microphone access to record voice notes about your case."
```

**Recommendation**: 
- If VoiceNotes will be implemented: Add now
- If VoiceNotes stays placeholder: Mark feature as "Preview" in UI
- If VoiceNotes will be removed: No action needed

---

## Expo Plugins Configuration ✅ PRESENT

From [app.json](../app.json) lines 42-54:

```json
"plugins": [
  [
    "expo-camera",
    {
      "cameraPermission": "Allow Ellio Law to access your camera to capture legal documents."
    }
  ],
  [
    "expo-image-picker",
    {
      "photosPermission": "Allow Ellio Law to access your photos to upload legal documents."
    }
  ]
]
```

**Status**: ✅ COMPLIANT  
**Matches InfoPlist**: Yes (consistent messaging)

---

## Bundle Identifier ✅ VALID

```json
"ios": {
  "bundleIdentifier": "com.elliolaw.app"
}
```

**Status**: ✅ VALID FORMAT  
**Note**: Ensure this matches Apple Developer Portal provisioning profile

---

## Background Modes ✅ NOT REQUIRED

**Analysis**: App does not appear to use:
- Background audio playback
- Location updates
- Background fetch
- Remote notifications (push)

**Evidence**:
- VoiceNotes not implemented (no audio recording in background)
- No background data sync found
- No push notification setup detected

**Status**: ✅ CORRECT (no background modes needed)

---

## Third-Party SDKs & Data Usage

### Detected Dependencies (from context)

| SDK | Purpose | Privacy Impact | Disclosure Required |
|---|---|---|---|
| @react-native-async-storage/async-storage | Local data storage | None (local only) | No |
| @react-navigation | Navigation | None | No |
| expo-camera | Camera access | **YES** | Already disclosed |
| expo-image-picker | Photo library | **YES** | Already disclosed |
| expo-print | PDF generation | None (local) | No |

### Potential Future Dependencies

| SDK | Status | Privacy Impact | Action Needed |
|---|---|---|---|
| expo-av | Placeholder (VoiceNotes) | Microphone access | Add NSMicrophoneUsageDescription if implemented |
| expo-document-picker | Not detected | None | N/A |
| expo-file-system | Not detected | None | N/A |

### AI/ML Services (Legal Chatbot)

**Component**: [src/components/LegalChatbot.tsx](../src/components/LegalChatbot.tsx)  
**Status**: ⚠️ REQUIRES INSPECTION

**Questions to Verify**:
1. Does chatbot use external API (OpenAI, Anthropic, etc.)?
2. If yes, is user data sent to third party?
3. Are conversations stored/analyzed?

**Inspection Required**: Read LegalChatbot.tsx implementation

**If External AI Used**:
- Must disclose in App Store privacy form: "Data Linked to User" → Usage Data
- May require privacy policy URL
- Consider GDPR/CCPA compliance

**Recommendation**: Inspect in Phase 2, document findings

---

## App Store Connect Privacy Questionnaire

### Data Collection (Estimated)

Based on code inspection, the app likely collects:

| Data Type | Collected? | Purpose | Linked to User? |
|---|---|---|---|
| User Content (Documents) | YES | Core functionality | NO (local storage) |
| Photos | YES | Document capture | NO (local storage) |
| User State Selection | YES | Onboarding | NO (local storage) |
| Case Information | YES | Case management | NO (local storage) |
| Voice Recordings | NO | Not implemented | N/A |
| Analytics/Crash Data | UNKNOWN | TBD | TBD |

**Critical**: If chatbot sends data externally, must add:
- Chat conversations → Usage Data → Linked to User

### Privacy Policy URL ⚠️ MAY BE REQUIRED

**Required If**:
- Chatbot uses external API
- Any analytics SDK added (Firebase, Amplitude, etc.)
- Any data leaves device

**Current Status**: UNKNOWN (depends on chatbot implementation)

**Recommendation**: 
1. Inspect chatbot code (Phase 2)
2. If external API: Create privacy policy
3. If local-only: May skip privacy policy (but recommended anyway)

---

## Icon & Splash Screen ⚠️ NEEDS VERIFICATION

**Files Referenced**:
- Icon: `./assets/icon.png`
- Splash: `./assets/splash-icon.png`
- Adaptive Icon (Android): `./assets/adaptive-icon.png`
- Favicon (Web): `./assets/favicon.png`

**Requirements**:
- Icon: 1024x1024 PNG (no alpha channel for iOS)
- Splash: Recommended 1242x2688 or larger

**Verification Status**: NOT CHECKED (file existence/dimensions unknown)

**Action**: Check if assets exist and meet requirements
```bash
ls -lh assets/
file assets/icon.png  # Check dimensions
```

---

## Entitlements ✅ NOT REQUIRED

**Standard Capabilities** (No special entitlements needed):
- Camera
- Photo Library
- Local Storage

**No Special Entitlements Detected**:
- iCloud
- HealthKit
- Apple Pay
- Siri
- Background Modes

**Status**: ✅ CORRECT

---

## Build Configuration

### New Architecture ⚠️ ENABLED

```json
"newArchEnabled": true
```

**Status**: EXPERIMENTAL  
**Risk**: May cause issues with some dependencies  
**Recommendation**: If build fails, try setting to `false`

### Edge-to-Edge (Android) ✅ OK

```json
"edgeToEdgeEnabled": true,
"predictiveBackGestureEnabled": false
```

**Status**: Standard Android config, no iOS impact

---

## App Store Submission Checklist

### Required Before Submission

- [ ] **Privacy Strings**: ✅ Camera & Photos present
- [ ] **Privacy Strings**: ⚠️ Microphone (if VoiceNotes implemented)
- [ ] **Bundle ID**: ✅ Valid format
- [ ] **App Icon**: ⚠️ Verify 1024x1024 exists
- [ ] **Splash Screen**: ⚠️ Verify dimensions
- [ ] **Privacy Policy**: ⚠️ If chatbot uses external API
- [ ] **App Store Screenshots**: ❌ Not addressed (manual task)
- [ ] **App Description**: ⚠️ Must be calm, non-directive (ellio theme)
- [ ] **Keywords**: ⚠️ Avoid "legal advice" (app doesn't provide it)

### Recommended Before Submission

- [ ] **Remove All Emojis**: ❌ 21+ violations found (see ELLIO_THEME_COMPLIANCE.md)
- [ ] **Test on Physical Device**: ⚠️ Not yet done
- [ ] **Test Permissions**: ⚠️ Verify camera/photos prompts show correctly
- [ ] **VoiceOver Testing**: ⚠️ Accessibility verification
- [ ] **Disclaimer Verification**: ⚠️ Ensure "not legal advice" visible

### Legal Considerations (Non-Technical)

**App Category**: Productivity or Reference (NOT Legal)  
**Risk**: Apple may reject if app appears to provide legal advice

**Mitigation**:
1. Prominent disclaimer: "Not legal advice, consult an attorney"
2. Description emphasizes "organization tool" not "legal assistant"
3. Avoid marketing language like "replaces attorney" or "legal guidance"

**App Store Description Draft** (ellio-compliant):
```
ellio helps you organize legal documents and information as you navigate court 
proceedings. Create cases, track deadlines, store documents, and understand 
legal processes through plain-language guides.

ellio does not provide legal advice. Always consult a licensed attorney for 
guidance on your specific situation.

Features:
• Document organization with camera capture and PDF conversion
• Deadline tracking with reminders
• Timeline builder to document case events
• Legal glossary with plain-language explanations
• Court information and resources
• Document templates for common forms

ellio is designed for individuals representing themselves (pro se litigants) 
or working with attorneys to stay organized and informed.
```

**Keywords** (Avoid):
- ❌ "legal advice"
- ❌ "replace attorney"
- ❌ "legal representation"

**Keywords** (OK):
- ✅ "legal documents"
- ✅ "court organization"
- ✅ "pro se"
- ✅ "legal forms"

---

## Compliance Summary

| Category | Status | Blocker? | Action |
|---|---|---|---|
| Privacy Strings (Camera/Photos) | ✅ PASS | No | None |
| Privacy Strings (Microphone) | ⚠️ CONDITIONAL | No | Add if VoiceNotes implemented |
| Bundle ID | ✅ PASS | No | Verify in Apple Dev Portal |
| Background Modes | ✅ CORRECT | No | None |
| Third-Party Data | ⚠️ UNKNOWN | Maybe | Inspect chatbot (Phase 2) |
| Icons/Splash | ⚠️ UNKNOWN | Yes | Verify assets exist |
| Privacy Policy | ⚠️ CONDITIONAL | Maybe | If chatbot uses API |
| Emoji Violations | ❌ FAIL | No* | Remove 21+ emojis |

*Not a technical blocker, but violates ellio theme

---

## Next Steps

### Immediate (Phase 2)
1. **Inspect LegalChatbot.tsx**: Determine if external API used
2. **Check assets folder**: Verify icon.png and splash-icon.png exist and meet specs
3. **Document chatbot data flow**: If external, plan privacy policy

### Before Submission (Phase 3)
4. **Remove all emojis**: Fix 11 UI files (ELLIO_THEME_COMPLIANCE.md)
5. **Add microphone permission**: If VoiceNotes will be implemented
6. **Test permissions**: Run on device, verify prompts appear

### Optional Enhancements
7. **Add privacy policy**: Even if not required (builds trust)
8. **Implement VoiceNotes**: Currently placeholder
9. **Add app preview video**: Showcase features for App Store

---

**End of App Store Readiness Audit**
