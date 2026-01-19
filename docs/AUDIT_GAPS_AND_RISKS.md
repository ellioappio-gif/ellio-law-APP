# ellio-law Audit - Gaps & Risks

## Generation Info
- **Date**: 2026-01-19
- **Commit**: e4b8acf
- **Method**: Evidence-based code analysis

## Critical Issues (BLOCKER)

### BLOCKER-1: 10 Major Features Inaccessible
**Severity**: BLOCKER  
**Impact**: ~6,500 lines of implemented code unusable by end users  
**Affected Features**:
1. CourtAppearancePrep (448 lines)
2. ServiceTracker (680 lines)
3. DiscoveryManager (660 lines)
4. HearingOutcomes (~500 lines)
5. EvidenceOrganizer (~650 lines)
6. MediationPrep (~450 lines)
7. CaseJournal (~500 lines)
8. CaseStatusDashboard (~550 lines)
9. AttorneyHandoff (~450 lines)
10. CourtroomAccess (~500 lines)

**Evidence**:
- Files exist in `src/components/`
- No navigation routes registered in App.tsx
- Not imported in CaseDetailsScreen.tsx (checked lines 1-100)
- No buttons/tabs leading to these components

**Reproduction**:
1. Launch app
2. Navigate to any screen
3. No way to access these 10 features

**Proposed Fix**:
**Option A** (Recommended): Add tabs to CaseDetailsScreen
- Modify CaseDetailsScreen to include tabs for:
  - Court Prep, Service Tracking, Discovery, Hearings, Evidence
  - Mediation, Journal, Status Dashboard, Attorney Handoff
- Preserve existing tabs (Documents, Timeline, Voices, etc.)
- Total tabs: ~15 (may require scrollable tab bar)

**Option B**: Add new navigation routes
- Create dedicated screens wrapping each component
- Add to HomeScreen resources or new "Case Tools" section
- More complex navigation hierarchy

**Option C**: Context-aware integration
- Show relevant components based on case type/stage
- CourtAppearancePrep when hearing scheduled
- MediationPrep when mediation date set
- Most sophisticated, requires case state logic

**Recommended**: Option A (simplest, maintains all features accessible)

---

## High-Priority Issues

### HIGH-1: Theme Compliance Not Verified
**Severity**: HIGH  
**Impact**: May violate ellio theme (calm, no emojis, plain language)  
**Status**: NEEDS VERIFICATION

**Affected Areas**:
- All UI copy in 33 features
- Button labels
- Educational disclaimers
- Error messages

**Evidence of Potential Issues**:
- CaseJournal.tsx previously had emoji issue (fixed: lines 23-28)
- Need to verify no other emojis exist
- Language tone needs spot-checking

**Proposed Verification**:
```bash
# Search for emoji unicode in TSX files
grep -r "[\u1F300-\u1F9FF]" src/

# Search for non-calm language
grep -ri "must\|required\|urgent\|critical" src/screens src/components
```

**Proposed Fix**:
- Remove any emojis found
- Replace directive language ("you must") with calm guidance ("consider")
- Add plain-language explanations for legal terms

---

### HIGH-2: Explainability Gap
**Severity**: HIGH  
**Impact**: Users may see stats/cards without understanding meaning  
**Status**: NEEDS VERIFICATION

**Requirements** (per ellio audit spec):
> Any chart/card/stat must be tappable and must route to a details/source explanation view

**Evidence of Risk**:
- CaseStatusDashboard likely has stats/charts
- HomeScreen has "Active Cases" list
- Settlement Calculator has results
- Unknown if these have tap-to-explain

**Proposed Verification**:
1. Inspect CaseStatusDashboard for chart tap handlers
2. Check HomeScreen stats for explanation modals
3. Verify SettlementCalculator results are explained

**Proposed Fix**:
- Add `onPress` handlers to all stat cards
- Create explanation modals/sheets with:
  - What this number means
  - How it's calculated
  - Why it matters
  - Plain-language examples

---

### HIGH-3: AsyncStorage Data Persistence Unverified
**Severity**: HIGH  
**Impact**: Data loss if persistence broken  
**Status**: NEEDS RUNTIME TESTING

**Critical Paths**:
- Onboarding state (`onboarding_complete`, `user_state`)
- Cases array
- Folders and documents
- Deadlines, expenses, witnesses, etc.

**Evidence**:
- storageUtils.ts exists (src/utils/storageUtils.ts)
- AsyncStorage imported in App.tsx
- Uncertain if all save/load paths work

**Proposed Test**:
1. Create a case
2. Add documents, deadlines, witnesses
3. Force quit app
4. Relaunch
5. Verify all data persists

**Proposed Fix** (if broken):
- Debug storageUtils save/load methods
- Add error logging
- Consider migration to SQLite if AsyncStorage unreliable

---

## Medium-Priority Issues

### MED-1: Camera/Photo Permissions Not Verified
**Severity**: MEDIUM  
**Impact**: DocumentCapture may crash or silently fail  
**Status**: NEEDS APP.JSON INSPECTION

**Required** (iOS):
- `NSCameraUsageDescription`
- `NSPhotoLibraryUsageDescription`
- `NSMicrophoneUsageDescription` (for VoiceNotes)

**Evidence**:
- DocumentCapture uses Expo Camera/ImagePicker
- VoiceNotes likely uses Expo Audio
- app.json may or may not have privacy strings

**Proposed Verification**:
```bash
grep -i "UsageDescription" app.json
```

**Proposed Fix**:
Add to app.json:
```json
"ios": {
  "infoPlist": {
    "NSCameraUsageDescription": "ellio needs camera access to photograph legal documents and evidence.",
    "NSPhotoLibraryUsageDescription": "ellio needs photo library access to attach existing photos to your case.",
    "NSMicrophoneUsageDescription": "ellio needs microphone access to record voice notes about your case."
  }
}
```

---

### MED-2: Add Case Flow Incomplete
**Severity**: MEDIUM  
**Impact**: Users may not be able to create cases  
**Status**: NEEDS VERIFICATION

**Evidence**:
- HomeScreen has "Add Case" button (exists in code)
- Target action unclear (modal? navigation?)
- May be placeholder

**Proposed Verification**:
- Inspect HomeScreen around line 220-240 for button handler
- Test button in running app

**Proposed Fix**:
- If missing: Create modal with case creation form
- Fields: case name, type, court, case number
- Save to AsyncStorage via storageUtils

---

### MED-3: Legal Chatbot Functionality Unknown
**Severity**: MEDIUM  
**Impact**: Major feature may be non-functional  
**Status**: NEEDS INSPECTION + RUNTIME TEST

**Evidence**:
- LegalChatbot.tsx registered as navigation screen
- File exists in src/components/
- Implementation details unknown

**Concerns**:
- Does it use real AI API?
- Is it a placeholder/mock?
- Does it require API keys?

**Proposed Verification**:
1. Inspect LegalChatbot.tsx code
2. Test in running app
3. Check for API key requirements

**Proposed Fix**:
- If mock: Add disclaimer "This is a demonstration"
- If real: Document API key setup in README
- If broken: Fix or mark as "Preview"

---

### MED-4: Error Handling Patterns Unclear
**Severity**: MEDIUM  
**Impact**: Poor UX if errors not handled gracefully  
**Status**: NEEDS CODE REVIEW

**Concerns**:
- Alert stacking (presenting multiple alerts)
- Unhandled async errors
- Network errors (if chatbot uses API)

**Evidence**:
- Multiple files use `Alert.alert()`
- Unknown if alerts can stack

**Proposed Verification**:
- Search for `Alert.alert` usage
- Test error scenarios (denied permissions, storage full)

**Proposed Fix**:
- Use toast library instead of Alert for non-critical errors
- Add global error boundary
- Ensure only one Alert shown at a time

---

## Low-Priority Issues

### LOW-1: Deep Link Support Missing
**Severity**: LOW  
**Impact**: Cannot share links to specific cases/documents  
**Status**: CONFIRMED MISSING

**Evidence**:
- app.json has no `linking` configuration
- No deep link handling in App.tsx

**Proposed Fix** (Future Enhancement):
- Add Expo linking configuration
- Support URLs like `ellio://case/12345`
- Enable sharing case links via Messages/Email

---

### LOW-2: Performance Audit Not Done
**Severity**: LOW  
**Impact**: May have main-thread blocking work  
**Status**: NEEDS PROFILING

**Proposed Verification**:
- Use React DevTools Profiler
- Check for heavy render work in lists
- Verify image optimization in DocumentList

---

### LOW-3: Accessibility (A11y) Compliance Unknown
**Severity**: LOW  
**Impact**: May not be usable with VoiceOver  
**Status**: NEEDS TESTING

**Requirements** (ellio theme):
- WCAG AA contrast (already defined in ellioLawTokens)
- 48x48px minimum touch targets (already defined)
- Proper `accessibilityLabel` and `accessibilityRole`

**Proposed Verification**:
- Enable VoiceOver on iOS
- Navigate through app
- Verify all buttons/controls are labeled

**Proposed Fix**:
- Add missing accessibilityLabels
- Fix contrast issues if found
- Ensure keyboard navigation works

---

## Risks

### RISK-1: Scope Creep During Fixes
**Probability**: MEDIUM  
**Impact**: HIGH

**Mitigation**:
- Only fix what's broken or inaccessible
- Do not redesign working features
- Document all changes in commits

---

### RISK-2: Breaking Changes During Integration
**Probability**: LOW  
**Impact**: HIGH

**Scenario**: Adding 10 features to CaseDetailsScreen may:
- Cause tab overflow
- Performance issues
- Navigation confusion

**Mitigation**:
- Add features incrementally
- Test after each addition
- Use scrollable tab bar if needed
- Consider progressive disclosure (show tabs based on case stage)

---

### RISK-3: Incomplete Documentation
**Probability**: HIGH  
**Impact**: MEDIUM

**Scenario**: User wants to know "what works" but docs are vague/marketing

**Mitigation**:
- Update features.md with truth
- Mark incomplete features explicitly
- Provide workarounds where applicable

---

## Summary Table

| ID | Title | Severity | Status | Fix Priority |
|---|---|---|---|---|
| BLOCKER-1 | 10 Features Inaccessible | BLOCKER | OPEN | 1 |
| HIGH-1 | Theme Compliance | HIGH | VERIFY | 2 |
| HIGH-2 | Explainability Gap | HIGH | VERIFY | 2 |
| HIGH-3 | Data Persistence | HIGH | TEST | 3 |
| MED-1 | Permissions | MEDIUM | VERIFY | 4 |
| MED-2 | Add Case Flow | MEDIUM | VERIFY | 5 |
| MED-3 | Chatbot Unknown | MEDIUM | INSPECT | 5 |
| MED-4 | Error Handling | MEDIUM | REVIEW | 6 |
| LOW-1 | Deep Links | LOW | CONFIRMED | 7 |
| LOW-2 | Performance | LOW | FUTURE | 8 |
| LOW-3 | Accessibility | LOW | FUTURE | 8 |

## Next Actions

### Immediate (Phase 2)
1. Complete iOS build and runtime verification
2. Inspect 10 inaccessible features for integration readiness
3. Verify theme compliance (emoji search, language audit)

### Phase 3 (Fixes)
1. Integrate 10 features into CaseDetailsScreen tabs
2. Remove any emojis found
3. Add explainability where missing
4. Fix Add Case flow if broken

### Phase 5 (Verification)
1. Re-test all features
2. Verify data persistence
3. Add privacy strings to app.json
4. Update features.md with truth

---

**End of Gaps & Risks Document**
