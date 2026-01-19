# ellio-law Navigation Map

## Generation Info
- **Generated**: 2026-01-19
- **Commit**: e4b8acfc6c45cc7c60206ed0623fa95505042bc9
- **Branch**: main
- **Method**: Evidence-based code analysis

## Entry Points

### 1. App Initialization
- **File**: [App.tsx](../App.tsx)
- **Flow**: 
  1. Check AsyncStorage for 'onboarding_complete'
  2. If false → OnboardingScreen (modal)
  3. If true → NavigationContainer with Stack Navigator → HomeScreen

### 2. Onboarding Flow
- **Screen**: OnboardingScreen
- **File**: [src/screens/OnboardingScreen.tsx](../src/screens/OnboardingScreen.tsx)
- **Entry**: App launch when onboarding not complete
- **User Action**: Select state (USState)
- **Exit**: Saves to AsyncStorage, navigates to HomeScreen
- **Data Stored**: 
  - `onboarding_complete`: 'true'
  - `user_state`: selected USState code

## Main Navigation Stack

All screens use React Navigation Stack Navigator with `headerShown: false`.

| Route Name | Component | File Path | Params |
|---|---|---|---|
| Home | HomeScreen | src/screens/HomeScreen.tsx | { userState?: USState } |
| CaseDetails | CaseDetailsScreen | src/screens/CaseDetailsScreen.tsx | { caseId: string } |
| LegalAid | LegalAidScreen | src/screens/LegalAidScreen.tsx | - |
| Glossary | GlossaryScreen | src/screens/GlossaryScreen.tsx | - |
| CourtInfo | CourtInfoScreen | src/screens/CourtInfoScreen.tsx | - |
| Templates | TemplatesScreen | src/screens/TemplatesScreen.tsx | - |
| Workflows | WorkflowsScreen | src/screens/WorkflowsScreen.tsx | - |
| CourtForms | CourtFormsScreen | src/screens/CourtFormsScreen.tsx | - |
| LegalResearch | LegalResearchScreen | src/screens/LegalResearchScreen.tsx | - |
| ProBono | ProBonoScreen | src/screens/ProBonoScreen.tsx | - |
| AppealGuide | AppealGuideScreen | src/screens/AppealGuideScreen.tsx | - |
| Chatbot | LegalChatbot | src/components/LegalChatbot.tsx | { userState?: USState } |

## HomeScreen Navigation Points

File: [src/screens/HomeScreen.tsx](../src/screens/HomeScreen.tsx)

### Active Cases Section
- **Element**: Case cards (FlatList)
- **Action**: Tap card
- **Navigates**: `navigation.navigate('CaseDetails', { caseId: item.id })`
- **Condition**: List populated from mock/stored data

### Resources Section (9 buttons)

| Button Label | Icon | Route | Line |
|---|---|---|---|
| Legal Aid | LAD | LegalAid | ~128 |
| Glossary | GLO | Glossary | ~138 |
| Courts | CRT | CourtInfo | ~148 |
| Templates | TPL | Templates | ~158 |
| Workflows | WFL | Workflows | ~168 |
| Forms | FRM | CourtForms | ~178 |
| Research | RSC | LegalResearch | ~188 |
| Pro Bono | PRO | ProBono | ~198 |
| Appeals | APL | AppealGuide | ~208 |

### Quick Actions Section
- **Element**: "Ask Legal Questions" button
- **Action**: Tap button
- **Navigates**: `navigation.navigate('Chatbot')`
- **Line**: ~286

## Screen Details

### HomeScreen
- **Reachable**: Default initial route after onboarding
- **Features**:
  - Active cases list (data source: mock/AsyncStorage)
  - Add case button
  - Resources grid (9 items)
  - Quick actions (chatbot)
- **Data Dependencies**: 
  - userState (from AsyncStorage or route params)
  - cases array (from local state/AsyncStorage)

### CaseDetailsScreen
- **Reachable**: Tap case card on HomeScreen
- **Params Required**: caseId (string)
- **Features**: Unknown (requires file inspection)

### LegalAidScreen
- **Reachable**: Tap "Legal Aid" resource button
- **Params**: None
- **Purpose**: Legal aid resources

### GlossaryScreen
- **Reachable**: Tap "Glossary" resource button
- **Params**: None
- **Purpose**: Legal terminology definitions

### CourtInfoScreen
- **Reachable**: Tap "Courts" resource button
- **Params**: None
- **Purpose**: Court information and locations

### TemplatesScreen
- **Reachable**: Tap "Templates" resource button
- **Params**: None
- **Purpose**: Document templates

### WorkflowsScreen
- **Reachable**: Tap "Workflows" resource button
- **Params**: None
- **Purpose**: Legal procedure workflows

### CourtFormsScreen
- **Reachable**: Tap "Forms" resource button
- **Params**: None
- **Purpose**: Virginia court forms directory
- **File**: [src/screens/CourtFormsScreen.tsx](../src/screens/CourtFormsScreen.tsx)
- **Status**: Newly added (recent implementation)

### LegalResearchScreen
- **Reachable**: Tap "Research" resource button
- **Params**: None
- **Purpose**: Legal research resources
- **File**: [src/screens/LegalResearchScreen.tsx](../src/screens/LegalResearchScreen.tsx)
- **Status**: Newly added (recent implementation)
- **External Links**: Opens URLs via Linking API

### ProBonoScreen
- **Reachable**: Tap "Pro Bono" resource button
- **Params**: None
- **Purpose**: Pro bono attorney finder
- **File**: [src/screens/ProBonoScreen.tsx](../src/screens/ProBonoScreen.tsx)
- **Status**: Newly added (recent implementation)
- **Features**: ZIP code search, organization listings

### AppealGuideScreen
- **Reachable**: Tap "Appeals" resource button
- **Params**: None
- **Purpose**: Appeal process guide
- **File**: [src/screens/AppealGuideScreen.tsx](../src/screens/AppealGuideScreen.tsx)
- **Status**: Newly added (recent implementation)
- **Features**: Expandable information sections

### LegalChatbot (Screen/Component Hybrid)
- **Reachable**: Tap "Ask Legal Questions" button on HomeScreen
- **Params**: { userState?: USState }
- **Purpose**: AI-powered legal Q&A
- **File**: [src/components/LegalChatbot.tsx](../src/components/LegalChatbot.tsx)
- **Status**: Implementation details require inspection

## Component-Based Features (Not Directly Routable)

These components are referenced in the codebase but not registered as navigation routes. They require parent screen integration:

| Component | File | Likely Integration Point |
|---|---|---|
| AttorneyHandoff | src/components/AttorneyHandoff.tsx | CaseDetailsScreen or new route |
| CaseJournal | src/components/CaseJournal.tsx | CaseDetailsScreen or new route |
| CaseStatusDashboard | src/components/CaseStatusDashboard.tsx | CaseDetailsScreen or new route |
| CourtAppearancePrep | src/components/CourtAppearancePrep.tsx | CaseDetailsScreen or new route |
| CourtroomAccess | src/components/CourtroomAccess.tsx | Resource screen or new route |
| DeadlineTracker | src/components/DeadlineTracker.tsx | CaseDetailsScreen or HomeScreen |
| DiscoveryManager | src/components/DiscoveryManager.tsx | CaseDetailsScreen or new route |
| DocumentCapture | src/components/DocumentCapture.tsx | CaseDetailsScreen |
| DocumentList | src/components/DocumentList.tsx | CaseDetailsScreen |
| EvidenceOrganizer | src/components/EvidenceOrganizer.tsx | CaseDetailsScreen or new route |
| ExpenseTracker | src/components/ExpenseTracker.tsx | CaseDetailsScreen or new route |
| HearingOutcomes | src/components/HearingOutcomes.tsx | CaseDetailsScreen or new route |
| MediationPrep | src/components/MediationPrep.tsx | CaseDetailsScreen or new route |
| ServiceTracker | src/components/ServiceTracker.tsx | CaseDetailsScreen or new route |
| SettlementCalculator | src/components/SettlementCalculator.tsx | CaseDetailsScreen or new route |
| TimelineBuilder | src/components/TimelineBuilder.tsx | CaseDetailsScreen or new route |
| VoiceNotes | src/components/VoiceNotes.tsx | CaseDetailsScreen or new route |
| WitnessManager | src/components/WitnessManager.tsx | CaseDetailsScreen or new route |

## Deep Link Support
- **Status**: No deep link configuration detected
- **File**: app.json (no linking configuration found)

## Missing/Unimplemented Routes
None detected. All registered routes have corresponding component files.

## Navigation Gaps Requiring Verification
1. **Component Integration**: 18 feature components exist but are not accessible via navigation
2. **CaseDetailsScreen Content**: Unknown which components are integrated in CaseDetailsScreen
3. **Add Case Flow**: HomeScreen has "Add Case" button, but target unclear
4. **Back Navigation**: No custom back button handling visible (relies on Stack Navigator default)

## Recommendations for Phase 2
1. Inspect CaseDetailsScreen to document which components are integrated
2. Verify all 11 resource screens render correctly and have content
3. Test chatbot screen functionality
4. Verify onboarding flow can be reset for testing
5. Test case creation/management flow
