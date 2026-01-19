# ellio-law Progressive Disclosure Flow

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production

---

## Purpose

This document defines how ellio-law introduces features, concepts, and complexity gradually to prevent overwhelming users while maintaining access to full functionality.

---

## Core Philosophy

### The Problem

Legal systems are inherently complex. Exposing all complexity at once creates:
- Cognitive overload
- Decision paralysis
- Anxiety and stress
- Abandonment

### The Solution

**Progressive disclosure** reveals features and information as users need them, based on:
1. Natural workflow progression
2. User-initiated exploration
3. Contextual relevance
4. Demonstrated understanding of prior concepts

---

## Disclosure Triggers

### Meaningful Triggers

Features may be introduced after:

**Completion of prior step**
```
User creates first case
  → Timeline feature introduced
```

**Intentional navigation**
```
User taps "Resources" tab
  → Legal aid directory introduced
```

**Sustained engagement**
```
User has 3+ documents in case
  → Organization tips introduced
```

**Repeated voluntary interaction**
```
User views deadline list 3 times
  → Reminder settings introduced
```

### NOT Meaningful Triggers

Never introduce features based on:
- Cold app open (user just launched)
- Resume from background
- Accidental taps
- Alert dismissal
- First screen load

---

## Onboarding Disclosure Flow

### First Launch

**Screen 1: Welcome**
```
🐘 ellio-law

Your legal navigation companion. We help you 
organize documents, understand court processes, 
and find legal resources.

This is not legal advice. We'll explain more 
as we go.

[Get started] [Learn what ellio-law does]
```

**Purpose**: Set expectations, establish voice

**Screen 2: Organization Question**
```
How do you want to organize your legal information?

○ By case
○ By topic  
○ I'll decide later

[Continue]
```

**Purpose**: First meaningful choice, reveals user intent

**Screen 3: AI Assistant Option**
```
Would you like help from our AI assistant?

The AI can answer general questions about court 
processes and help you find resources. It does 
not provide legal advice.

○ Yes, enable AI assistant
○ No, I'll explore on my own

[Continue]
```

**Purpose**: Progressive disclosure of AI feature, user choice

**Screen 4: Location Selection**
```
Which state are you in?

We'll show you resources and information specific 
to your state. Laws and procedures vary 
significantly between states.

[State dropdown]

You can change this anytime in settings.

[Done]
```

**Purpose**: Personalize experience, acknowledge variation

### Onboarding Rules

1. **Maximum 4 screens** in initial onboarding
2. **All optional** — user can skip individual screens
3. **Never auto-play** — user controls pace
4. **One concept per screen**
5. **Exit always available**

---

## In-App Feature Introduction

### First-Time Feature Use

When user navigates to a feature for the first time:

**Pattern**:
```
[Feature screen with light overlay]

[Centered card:]
━━━━━━━━━━━━━━━━━━━━━
Timeline

A timeline helps you organize events in the 
order they happened. You can attach documents 
to specific dates.

[Show me] [Got it]
━━━━━━━━━━━━━━━━━━━━━
```

**After "Show me"**: Highlight first interaction  
**After "Got it"**: Dismiss, don't show again  
**After "Dismiss"**: Suppress for 7 days

### Feature Introduction Timing

**Immediate** (on first screen load):
- Case list (core feature)
- Create case button

**After first case created**:
- Timeline tab
- Document capture
- Case details

**After 3+ documents**:
- Organization tips
- Folder suggestions

**After first deadline added**:
- Reminder settings
- Calendar integration

**User-initiated only** (never auto-introduced):
- Settlement calculator
- Voice notes
- Advanced filters

---

## Tooltip Disclosure

### Tooltip Timing Rules

1. **Maximum one tooltip per session**
2. **Only on user trigger** (tap info icon)
3. **Never on page load**
4. **Never during typing**
5. **Never during scanning/reading**
6. **Never during other modals**
7. **Never during animations**

### Tooltip Dismissal

**User can dismiss by**:
- Tapping "Got it"
- Tapping outside tooltip
- Navigating away

**Once dismissed**:
- Tooltip stored as "seen"
- Won't auto-show again
- Still accessible via info icon

---

## Complexity Layering

### Three Levels of Information

**Level 1: Essential**
- Always visible
- Required for basic function
- Minimal cognitive load

**Level 2: Helpful**
- Accessible via clear path
- Provides context and explanation
- "Learn more" links

**Level 3: Advanced**
- Behind menus or settings
- For power users
- Never required

### Example: Case Details

**Level 1 (always visible)**:
```
Smith v. Jones
Status: Pending
Next deadline: March 15, 2026
```

**Level 2 (tabs)**:
```
[Documents] [Timeline] [Witnesses] [Expenses]
```

**Level 3 (menu)**:
```
⋮ Menu:
- Export case
- Archive case
- Case settings
- Delete case
```

---

## Educational Content Disclosure

### Legal Concept Explanation

**Trigger**: User taps term or info icon  
**Display**: In-context explanation  
**Depth**: Layered

**Example** (Small claims court):

**Level 1** (inline definition):
```
Small claims court ⓘ

[User taps ⓘ]

Small claims courts handle disputes involving 
smaller amounts of money. Procedures are usually 
simpler.
```

**Level 2** (learn more):
```
[Learn more] →

Small Claims Court

Small claims courts handle disputes involving 
smaller amounts of money. Many states allow people 
to represent themselves here.

Procedures are usually simpler than other courts. 
There are dollar limits that vary by state 
(typically $2,500-$10,000).

You can find your state's small claims court 
information in the Resources tab.
```

### Educational Timing

**Never interrupt** for education:
- While user is typing
- During form completion
- While reviewing documents
- During deadline creation

**Offer education when**:
- User requests it (taps info icon)
- User is in exploration mode
- Relevant context is on screen
- User has time to absorb

---

## Feature Gating

### Soft Gates

**Purpose**: Ensure prerequisite understanding  
**Pattern**: Explanation before access

**Example** (Settlement calculator):
```
Settlement Calculator

This calculator helps you organize numbers, but it 
does not determine what you should settle for. 
Settlement value depends on many factors that vary 
by case.

For advice about settlement, consult a lawyer.

[I understand] [Learn more]
```

### No Hard Gates

**Never**:
- Lock features behind paywalls (app is free)
- Require completing tutorials
- Force linear progression
- Hide features without explanation

---

## Notification Disclosure

### Notification Opt-In Flow

**Default**: Notifications OFF  
**Introduction**: After user demonstrates need

**Trigger**: User adds third deadline

**Pattern**:
```
Deadline reminders?

You have 3 upcoming deadlines. Would you like 
reminders before they're due?

You can customize reminder timing in settings.

[Enable reminders] [Not now]
```

**Never**:
- Auto-enable notifications
- Interrupt for notification request
- Request on first app open
- Use alarming language to pressure opt-in

---

## State-Specific Disclosure

### Jurisdiction Information

**Trigger**: User selects state or views state-specific content

**Pattern**:
```
Virginia Court System

Information about Virginia courts. Court 
structures and procedures vary significantly 
by state.

This information is general. Always verify 
with your specific court.

[Circuit Courts] [General District Courts]
[Juvenile & Domestic Relations]
```

**Always include**:
- State/jurisdiction name clearly
- Variation disclaimer
- Link to official state resources

---

## Disclosure Frequency Limits

### Per-Session Limits

- **Maximum 1 tooltip** per session
- **Maximum 1 feature intro** per session
- **Maximum 1 educational modal** per session

### Per-Feature Limits

- **Feature intro**: Once per feature, ever
- **Tooltips**: On user request only
- **Reminders**: Once per week maximum (if dismissed)

### Suppression Rules

**Dismissed features**:
- Suppress for 7 days
- Then offer subtle reminder (not modal)
- After 3 dismissals, suppress permanently
- Always accessible via help/info icons

---

## Progressive Disclosure by User Type

### First-Time User

**Day 1**:
- Onboarding (4 screens max)
- Case creation intro
- Empty state explanations

**Week 1**:
- Timeline intro (after first case)
- Document capture intro (when relevant)
- One feature intro per session max

**Month 1**:
- Organization tips (as cases grow)
- Advanced features (user-initiated only)

### Returning User

**Resume**:
- No interruptions
- Direct to last viewed screen
- Persistent navigation state

**New features**:
- Subtle indicator ("New" badge)
- Opt-in announcement (in updates section)
- Never auto-show modals

### Power User

**Characteristics**:
- 10+ cases
- Daily active use
- Engages with advanced features

**Disclosure approach**:
- Minimal interruptions
- Advanced features readily accessible
- Shortcuts and efficiency tools
- Still maintain calm voice

---

## Disclosure Content Rules

### Every Disclosure Should Include

1. **What this is**: Feature/concept name and purpose
2. **Why it exists**: Benefit or use case
3. **What it does**: Specific functionality
4. **What it doesn't do**: Limitations
5. **How to proceed**: Clear next action

### Example (Witness Manager):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Witness Manager

A witness is someone who saw or knows something 
relevant to your case. This feature helps you 
keep track of witnesses and their contact 
information.

You can record witness details here. This is for 
organization only — ellio-law does not contact 
witnesses or determine who you should call.

[Add first witness] [Learn more] [Not now]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Anti-Patterns to Avoid

### ❌ Aggressive Prompting
```
Complete your profile! →
Enable notifications! →
Rate us 5 stars! →
```

### ❌ Feature Overload
```
16 new features available!
[Giant list of features]
```

### ❌ Fake Urgency
```
⚠️ COMPLETE SETUP NOW
Only 3 hours left!
```

### ❌ Interruption Spam
```
[Tooltip appears while user is typing]
[Modal appears on page load]
[Notification while user is reading]
```

### ❌ Hidden Complexity
```
[Dropdown with 47 options]
[Form with 23 fields]
[Settings with no explanation]
```

---

## Disclosure Testing

### Before Shipping Disclosure Flow

**Test**:
- [ ] Can user complete core task without disclosures?
- [ ] Is timing based on meaningful interaction?
- [ ] Does disclosure explain clearly and calmly?
- [ ] Can user dismiss easily?
- [ ] Does dismissal persist appropriately?
- [ ] Is there an escape hatch?
- [ ] Does it respect frequency limits?
- [ ] Is content accurate and honest?
- [ ] Does it match ellio voice?

### User Testing Questions

- "Did you feel overwhelmed?"
- "Was this helpful or distracting?"
- "Did you understand what to do next?"
- "Could you find features when you wanted them?"
- "Did anything interrupt your workflow?"

---

## Disclosure Documentation

### Feature Introduction Inventory

Maintain inventory of all feature introductions:

| Feature | Trigger | Frequency | Content | Status |
|---------|---------|-----------|---------|---------|
| Timeline | First case created | Once | Timeline explanation | Active |
| Deadlines | User adds deadline | Once | Reminder settings | Active |
| Voice notes | User-initiated | Once | Voice note intro | Active |

### Disclosure Audit

**Quarterly review**:
- Are disclosures still relevant?
- Are frequency limits appropriate?
- Are triggers meaningful?
- Is content accurate?
- Does voice match standards?

---

## Disclosure Checklist

Before shipping any disclosure:

- [ ] Meaningful trigger (not cold open)
- [ ] One concept only
- [ ] User can dismiss
- [ ] Dismissal persists appropriately
- [ ] Respects frequency limits
- [ ] Content is calm and clear
- [ ] Explains what/why/how/limitations
- [ ] Accessible (screen reader, keyboard)
- [ ] Tested with real users
- [ ] Documented in inventory

---

**Remember**: Progressive disclosure is about revealing complexity gradually, not hiding it. Every feature should be discoverable when users need it, never forced when they don't.
