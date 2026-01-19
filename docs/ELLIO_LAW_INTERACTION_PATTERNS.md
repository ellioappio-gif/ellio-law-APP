# ellio-law Interaction Patterns

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production

---

## Purpose

This document defines how users interact with ellio-law, ensuring consistent, calm, and understandable experiences throughout the app.

---

## Core Interaction Principles

### 1. One Next Step

Present one clear next action, not overwhelming choices.

**Bad**:
```
What would you like to do?
- Create case
- Add document  
- View timeline
- Track expenses
- Add witness
- Set deadline
- Record voice note
- Calculate settlement
```

**Good**:
```
Your cases

[Case list or empty state]

[+ Create new case]

[Other features accessible via tabs]
```

### 2. Progressive Disclosure

Reveal complexity gradually as users need it.

**Pattern**:
1. Show essential information first
2. Provide "Learn more" for details
3. Advanced features behind clear paths
4. Never hide critical information

**Example** (Case details):
```
Level 1: Case name, status, key deadline
Level 2: Full timeline, documents (via tabs)
Level 3: Advanced filters, exports (via menu)
```

### 3. Calm Defaults

Default states should reduce anxiety, not create it.

**Notifications**:
- Default: OFF or minimal
- User opts IN to deadline reminders
- Never alarming notification tones

**Colors**:
- Default: Neutral informational
- Deadline colors only when necessary
- Never alarming by default

### 4. Escape Hatches

Always provide a way out without losing work.

- **Cancel** buttons always visible
- **Drafts** saved automatically
- **Back** navigation always available
- **Undo** for destructive actions

---

## Navigation Patterns

### Primary Navigation (Tabs)

**Pattern**: Bottom tab bar (iOS/Android standard)

**Tab structure**:
```
Home | Timeline | Resources | Profile
```

**Rules**:
- Maximum 5 tabs
- Icons + labels always
- Current tab clearly indicated
- Consistent across app

### Secondary Navigation

**Back Button**:
- Top left (iOS) or top left/Android back button
- Always functional
- Returns to previous screen
- Never disappears unexpectedly

**Breadcrumbs** (when helpful):
```
Cases > Smith v. Jones > Documents
```

### Modal Hierarchy

**Full Screen Modals**: Major workflows
- Creating a case
- Onboarding
- Settings

**Sheet Modals**: Focused actions
- Adding a document
- Editing a deadline
- Filters

**Popups/Alerts**: Confirmations only
- Delete confirmations
- Leaving unsaved work
- Critical errors

---

## Button Patterns

### Primary Action

**Usage**: Most important action on screen  
**Style**: Filled, brand purple  
**Placement**: Bottom or top right  
**Label**: Verb-first, specific

**Examples**:
- "Create case"
- "Add document"
- "Save changes"

### Secondary Action

**Usage**: Alternative or less common action  
**Style**: Outlined or text button  
**Placement**: Left of primary or in menu  

**Examples**:
- "Cancel"
- "Skip for now"
- "Learn more"

### Destructive Action

**Usage**: Deletes or removes  
**Style**: Red text, never filled red  
**Confirmation**: Always required  

**Example**:
```
[Delete case]

Modal:
"Delete this case?

This will permanently remove the case and all 
associated documents. This cannot be undone.

[Cancel] [Delete case]
```

### Disabled States

**Visual**:
- Reduced opacity (38%)
- Neutral gray
- No interaction

**Reason**:
- Text explaining why disabled
- Clear path to enable

**Example**:
```
[Save case] (disabled)

"Enter a case name to save"
```

---

## Form Patterns

### Input Fields

**Label placement**: Above field  
**Required indicator**: " *" or "(required)" text  
**Helper text**: Below field, small, gray  
**Error text**: Below field, small, critical color  

**Pattern**:
```
Case name *

[Text input field]

This helps you identify the case later.
```

**With error**:
```
Case name *

[Text input field with error border]

Case name is required.
```

### Field Validation

**When to validate**:
- On blur (lose focus)
- On submit attempt
- Never on every keystroke (too aggressive)

**Error messages**:
- Specific: "Email address is required"
- Not generic: "Error" or "Invalid"
- Calm tone: Explanatory, not accusatory

### Form Submission

**Loading states**:
- Disable submit button
- Show loading indicator
- Prevent multiple submissions

**Success states**:
- Clear confirmation
- Redirect to next logical step
- Offer related actions

**Pattern**:
```
Submitting:
[Creating case...] (loading spinner)

Success:
"Case created"

[View case] [Add documents]
```

---

## List & Card Patterns

### List Items

**Tappable area**: Entire card/row  
**Min height**: 64px (allows two lines + breathing room)  
**Dividers**: Subtle, or no dividers with card shadows

**Content hierarchy**:
```
[Primary text - Title]
[Secondary text - Details]
[Tertiary text - Metadata]
[Action icons] (right side, optional)
```

### Empty States

**Components**:
1. Illustration or icon (calm, not sad)
2. Heading (what this screen is for)
3. Body text (1-2 sentences explaining benefit)
4. Primary action (when ready)
5. Optional: Link to learn more

**Pattern**:
```
[Simple illustration]

Timeline

A timeline helps you organize events in the order 
they happened. You can attach documents to specific 
dates.

[Add your first event]

[Learn more about timelines]
```

**Never**:
- Sad/negative imagery
- "Uh oh!" or "Nothing here!"
- Pressure to act immediately

### Loading States

**Skeleton screens**: Preferred over spinners  
**Progress indicators**: When duration known  
**Text**: "Loading..." or specific ("Getting your cases...")  

**Pattern**:
```
[Skeleton card outlines]

Loading your cases...
```

---

## Disclosure Patterns

### Tooltips

**Trigger**: User taps "?" icon or info icon  
**Display**: Small popup with arrow  
**Content**: Title + 1-2 sentences  
**Dismissal**: Tap outside or "Got it" button  

**Pattern**:
```
[ⓘ] → Tooltip appears:

━━━━━━━━━━━━━━━━
Filing fees

Most courts charge a fee when you file. Many 
courts offer waivers for people with limited 
income.

[Got it]
━━━━━━━━━━━━━━━━
```

### Explanations

**Trigger**: "Learn more" link or educational section  
**Display**: In-page expandable or dedicated screen  
**Content**: Detailed explanation with structure  

**Pattern**:
```
What is small claims court? [▼]

Expands to show:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Small claims courts handle disputes involving 
smaller amounts of money. Many states allow 
people to represent themselves.

Procedures are usually simpler than other 
courts. Dollar limits vary by state.

[Source: General court information]
━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Contextual Help

**Placement**: Where user needs it  
**Style**: Subtle, not intrusive  
**Frequency**: One disclosure per session maximum  

**Example** (first-time feature use):
```
You added your first timeline event!

You can attach documents to events to keep 
everything organized.

[Show me] [Got it]
```

---

## Confirmation Patterns

### Destructive Actions

Always confirm before:
- Deleting cases
- Removing documents
- Clearing data

**Pattern**:
```
Delete "Smith v. Jones"?

This will permanently remove the case and all 
documents. This cannot be undone.

[Cancel] [Delete]
```

### Non-Destructive Actions

Generally don't confirm:
- Saving changes (auto-save when possible)
- Adding items
- Navigating away (unless unsaved work)

### Leaving Unsaved Work

**Pattern**:
```
Unsaved changes

You have unsaved changes. What would you like 
to do?

[Discard] [Save draft] [Keep editing]
```

---

## Error Patterns

### Error Messages

**Structure**:
1. What happened (plain language)
2. Why it might have happened (if known)
3. What user can try (concrete steps)

**Pattern**:
```
Couldn't save document

This sometimes happens when there's a connection 
issue or the file is too large.

You can try again, or check your internet 
connection and available storage.

[Try again] [Cancel]
```

**Never**:
- Technical error codes alone
- Blame the user
- Panic-inducing language
- Dead ends without options

### Offline States

**Pattern**:
```
You're offline

Some features require internet connection. You 
can still view saved cases and documents.

ellio-law will reconnect automatically when 
you're back online.
```

---

## Notification Patterns

### In-App Notifications

**Toast/Banner**: Brief, auto-dismiss  
**Duration**: 3-5 seconds  
**Dismissible**: Tap to dismiss early  

**Pattern**:
```
┌────────────────────┐
│ Case saved         │
└────────────────────┘
```

### Push Notifications

**Default**: OFF or minimal  
**User control**: Granular opt-in  
**Tone**: Never alarming  

**Pattern**:
```
Upcoming deadline

Your filing is due in 3 days (March 15).

[View case]
```

**Never**:
- "URGENT" or "!!! ALERT !!!"
- Excessive notifications
- Notifications user didn't choose

---

## Search & Filtering

### Search

**Placement**: Top of list screens  
**Behavior**: Live filtering (debounced)  
**Scope**: Clear what's being searched  

**Empty results**:
```
No cases found for "Smith"

Try different keywords or check spelling.
```

### Filters

**Trigger**: Filter icon/button  
**Display**: Modal or expandable section  
**Clear indicators**: Show active filters  
**Reset**: Clear all filters option  

**Pattern**:
```
Filter cases

Status: [All ▾]
Type: [All ▾]  
Date range: [Any ▾]

[Clear filters] [Apply]
```

---

## Accessibility Interactions

### Screen Reader

- All interactive elements labeled
- State changes announced
- Loading/errors announced
- Logical reading order

### Keyboard Navigation

- Tab through all elements
- Enter/Space activate
- Escape dismisses
- Arrow keys navigate (where appropriate)

### Touch

- 48x48px minimum touch targets
- Clear tap feedback
- Swipe gestures optional, never required

---

## Interaction Anti-Patterns

**Avoid**:

### ❌ Aggressive Urgency
```
⚠️ URGENT ACTION REQUIRED ⚠️
```

### ❌ Dark Patterns
- Hidden cancel buttons
- Confusing double negatives
- Pre-checked unwanted options
- Fake countdown timers

### ❌ Interruptions
- Auto-playing videos
- Popup ads/promotions
- Forced rating requests
- Unexpected modals

### ❌ Cognitive Overload
- Too many choices
- Dense text walls
- Unexplained jargon
- Complex multi-step forms

---

## Interaction Checklist

Before shipping any interaction:

- [ ] One clear next step
- [ ] Escape hatch provided
- [ ] Calm default state
- [ ] Progressive disclosure (not overwhelming)
- [ ] Error states handled gracefully
- [ ] Loading states clear
- [ ] Success confirmation
- [ ] Accessible (screen reader, keyboard, touch)
- [ ] Consistent with patterns
- [ ] No dark patterns
- [ ] No unnecessary confirmations
- [ ] No aggressive urgency

---

**Remember**: Every interaction should reduce stress, never create it.
