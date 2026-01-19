# ellio-law Voice & Content Guidelines

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production

---

## Overview

ellio-law provides legal navigation for everyday people. Our voice must reduce anxiety, build understanding, and maintain transparency about what we do and don't do.

---

## Core Voice Principles

### The Governing Sentence

> **"We'll take this one step at a time."**

Every piece of content must reinforce this sentiment.

### Voice Attributes

1. **Calm** — Never urgent, never alarming
2. **Clear** — Plain language, no legalese unless explained
3. **Honest** — Transparent about limitations and scope
4. **Patient** — One concept at a time, no pressure
5. **Neutral** — Educational, not directive

---

## What We Are

- **Legal navigator** — We help people understand processes and organize information
- **Educational resource** — We explain concepts in plain language
- **Organizational tool** — We help keep documents and timelines in order
- **Directory** — We connect people to legal resources

---

## What We Are Not

- **Legal advisor** — We do not analyze specific situations
- **Lawyer** — We do not provide legal advice
- **Predictor** — We do not forecast case outcomes
- **Decision-maker** — We do not tell people what to do

---

## Language Patterns

### Approved Phrases

Use these patterns consistently:

```
"This usually means..."
"In many cases..."
"You might see this when..."
"This step exists to..."
"This can vary by state and situation."
"You can explore this when you're ready."
"Many people find it helpful to..."
"Courts typically require..."
"One common approach is..."
"This information is general."
```

### Forbidden Language

Never use these patterns:

```
❌ "You must..."
❌ "Immediate action required"
❌ "Failure to comply..."
❌ "Urgent deadline"
❌ "Critical warning"
❌ "You should..."
❌ "The right way is..."
❌ "Always..." / "Never..." (unless literally true)
```

---

## Content Types

### Explanations

**Purpose**: Help users understand legal concepts

**Structure**:
- Title (2-4 words)
- Body (1-2 sentences, plain language)
- Footnote (scope, limitations, variations)

**Example**:
```
Title: Filing fees

Body: Most courts charge a fee when you file paperwork. 
Fees vary by court and case type. Many courts offer fee 
waivers for people with limited income.

Footnote: Fee amounts and waiver requirements vary by 
jurisdiction.
```

### Disclaimers

**Purpose**: Set accurate expectations

**Placement**: 
- Bottom of educational screens
- Before user takes action
- In settings/about section

**Template**:
```
ellio-law provides general educational information about 
court processes and helps you organize case materials. 
This is not legal advice. Laws and procedures vary 
significantly by state and situation. For guidance about 
your specific case, consult a lawyer or legal aid 
organization.
```

### Empty States

**Purpose**: Explain what will appear and why it's useful

**Pattern**:
```
[Icon or illustration]

[Feature name]

[1-2 sentences explaining what this is for]

[1 sentence about what you can do when ready]

[Optional: "Learn more" link]
```

**Example**:
```
Timeline

A timeline helps you organize events in order. You can 
attach documents to specific dates to keep everything 
connected.

You can add your first event whenever you're ready.

[Learn more about timelines]
```

### Error Messages

**Purpose**: Explain what happened and suggest next steps

**Pattern**:
```
[What happened]
[Why it might have happened]
[What you can try]
```

**Example**:
```
We couldn't save that document.

This sometimes happens when there's a connection issue or 
the file is too large.

You can try again, or check your internet connection and 
available storage.
```

**Never**: Blame the user or use technical jargon

---

## Legal Terminology

### When to Use Legal Terms

Use legal terminology when:
- It's the standard name (e.g., "small claims court")
- Avoiding it would create confusion
- The user will encounter it in official documents

Always pair with plain-language explanation:

```
Motion for Continuance

A request asking the court for more time before a hearing 
or deadline.
```

### When to Avoid Legal Terms

Replace with plain language when possible:

```
❌ "Petitioner"
✅ "The person who filed the case"

❌ "Respondent" 
✅ "The other party"

❌ "Pro se litigant"
✅ "Someone representing themselves"
```

---

## Tone by Context

### Onboarding

**Tone**: Welcome, orient, don't overwhelm

```
✅ "ellio-law helps you organize legal documents and 
understand court processes. We'll start with a few 
quick questions."

❌ "Complete mandatory setup to access full features."
```

### Deadlines

**Tone**: Informative, not alarming

```
✅ "You have a filing deadline on [date]. Courts 
typically allow extensions if requested before the 
deadline."

❌ "URGENT: CRITICAL DEADLINE APPROACHING"
```

### Complex Procedures

**Tone**: Patient, step-by-step

```
✅ "Court filing usually involves several steps. We'll 
walk through them one at a time."

❌ "Filing is complicated. Follow these 12 steps 
exactly."
```

### Missing Information

**Tone**: Helpful, not directive

```
✅ "Some courts require specific information. You can 
check with your local court to see what they need."

❌ "You must contact the court immediately for 
requirements."
```

---

## State Variation Handling

### Acknowledging Differences

Always include when describing procedures:

```
"This process varies by state."
"Court structures differ across states."
"Check with your local court for specifics."
"Requirements vary by jurisdiction."
```

### Avoiding False Universality

Don't:
```
❌ "All courts require..."
❌ "The deadline is always..."
❌ "Every state has..."
```

Do:
```
✅ "Many courts require..."
✅ "Deadlines typically range from..."
✅ "Most states have..."
```

---

## Scope Transparency

### Every Feature Should Explain

1. **What this is**: "A timeline helps organize events..."
2. **Why it exists**: "Courts often want to know when things happened..."
3. **What ellio-law does**: "We help you keep track..."
4. **What ellio-law doesn't do**: "This is for organization, not legal advice about what events to include."

### Regular Reminders

Place scope reminders:
- In feature introductions
- In tooltips
- In settings/about
- After significant user actions

---

## Copy Length Guidelines

### Headlines
- Maximum: 60 characters
- Ideal: 30-40 characters

### Body Text
- Maximum paragraph: 3-4 sentences
- Break up long explanations into sections
- Use bullets for lists

### Button Text
- Maximum: 20 characters
- Verb-first when possible
- Avoid "Click here" or "Learn more" without context

**Examples**:
```
✅ "Add event"
✅ "See legal aid options"
✅ "Learn about filing fees"

❌ "Click"
❌ "Learn more" (without context)
❌ "Proceed to next step"
```

---

## Content Checklist

Before shipping any copy:

- [ ] Calm, not urgent
- [ ] Educational, not directive
- [ ] Acknowledges state variation
- [ ] Explains scope/limitations
- [ ] Plain language or terms defined
- [ ] No "must" or "should"
- [ ] No emojis
- [ ] One concept per paragraph
- [ ] Feels patient and clear

---

## Special Situations

### Court Deadlines

Pattern:
```
[Date and what it's for]
[What it means in plain language]
[Options if they need more time]
[Reassurance that questions are normal]
```

Example:
```
Filing deadline: March 15, 2026

This is when your response is due to the court.

If you need more time, you can file a motion for 
continuance before this date. Many courts grant these 
requests.

If you have questions about this deadline, the court 
clerk or a legal aid organization can help explain your 
options.
```

### Missing Resources

When we don't have data:

```
✅ "We're still gathering legal aid information for 
[State]. You can search [State] Legal Aid online or call 
211 for local referrals."

❌ "Information unavailable."
```

### Technical Errors

```
✅ "Something went wrong while saving. This is usually 
temporary. You can try again or contact us if it keeps 
happening."

❌ "Error 500: Internal server error."
```

---

## Voice in Action: Examples

### Bad Example
```
⚠️ URGENT DEADLINE ALERT

You must file your response within 20 days or your case 
will be dismissed! Failure to comply will result in 
default judgment. Click here immediately to view 
requirements.
```

**Problems**: Alarming, directive, pressure-creating, not educational

### Good Example
```
Response deadline

Courts typically give 20-30 days to respond after you 
receive a complaint. Your deadline is March 15, 2026.

If you need more time, you can usually request an 
extension before the deadline. The court clerk can 
explain the process for your court.

You can view the requirements whenever you're ready.
```

**Strengths**: Calm, educational, acknowledges variations, offers options, no pressure

---

## Questions or Clarifications

For voice and content questions:
1. Consult this document
2. Review `src/content/explanations.ts`
3. Check existing shipped copy for patterns

**Remember**: If it creates anxiety or pressure, it violates the ellio voice standard.
