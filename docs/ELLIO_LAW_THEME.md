# ellio-law Design System

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production

---

## Overview

ellio-law inherits the ellio core design system and extends it with legal-context semantics. This document defines the complete visual and interaction language for the application.

---

## Design Philosophy

### Core Principles

1. **Calm over urgency** — No alarm colors, no aggressive contrast, no urgency patterns
2. **Clarity over density** — Generous spacing, clear hierarchy, readable text
3. **Trust over authority** — Neutral presentation, educational tone, transparent limitations
4. **One step at a time** — Progressive disclosure, focused interactions, minimal cognitive load

### Legal Context Requirements

- **Educational, not directive** — We explain, never command
- **Neutral, not authoritative** — We inform, never prescribe  
- **Transparent about scope** — We clarify what we do and don't do
- **Calm about deadlines** — We explain timeframes, not create panic

---

## Color System

### Brand Colors

```
Primary Purple: #6C5CE7  (EllioPrimaryColors.primary700)
Light Purple:   #A29BFE  (EllioPrimaryColors.primary300)
Dark Purple:    #4C3D99  (EllioPrimaryColors.primary900)
```

**Usage**: Branding, primary actions, focus states, interactive elements

### Neutral Colors

```
Background:     #F8F9FA  (EllioNeutralColors.neutral100)
Surface:        #FFFFFF  (EllioNeutralColors.white)
Text Primary:   #2D3436  (EllioNeutralColors.neutral900)
Text Secondary: #636E72  (EllioNeutralColors.neutral600)
Text Tertiary:  #B2BEC3  (EllioNeutralColors.neutral300)
Border:         #DFE6E9  (EllioNeutralColors.neutral200)
```

**Usage**: Text hierarchy, surfaces, dividers, backgrounds

### Semantic Colors

#### Information (Neutral Blue)
```
Information:       #74B9FF  (EllioSemanticColors.info700)
Info Background:   #E3F2FD  (EllioSemanticColors.info100)
Info Text:         #0984E3  (EllioSemanticColors.info900)
```

**Usage**: Educational tooltips, informational cards, neutral guidance

#### Completion (Blue, not green)
```
Completion:           #74B9FF  (EllioSemanticColors.success700)
Completion Background: #E3F2FD  (EllioSemanticColors.success100)
Completion Text:      #0984E3  (EllioSemanticColors.success900)
```

**Usage**: Understanding achieved, task completed, progress indicators

**Rationale**: Blue conveys calm completion. Green can imply "correct" which is inappropriate for legal navigation.

#### Important (Warm, not urgent)
```
Important:           #FDCB6E  (EllioSemanticColors.caution900)
Important Background: #FFFBF0  (EllioSemanticColors.caution100)
```

**Usage**: Needs attention, but not urgent or alarming

#### Deadline (Use sparingly)
```
Deadline:           #FF7675  (EllioSemanticColors.critical700)
Deadline Background: #FFE5E5  (EllioSemanticColors.critical100)
Deadline Text:      #D63031  (EllioSemanticColors.critical900)
```

**Usage**: Court deadlines only, always with explanation of what it means and options

**Critical Rule**: Never use for general warnings or fear-based messaging

---

## Typography

### Font Family

```
Primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
Mono: "SF Mono", Monaco, Consolas, monospace (for case numbers only)
```

### Type Scale

```
Heading 1:    28px / Bold   / 1.25 line height
Heading 2:    24px / Semibold / 1.25 line height
Heading 3:    20px / Semibold / 1.5 line height
Heading 4:    18px / Medium / 1.5 line height

Body Large:   18px / Normal / 1.75 line height
Body:         16px / Normal / 1.75 line height (default)
Body Small:   14px / Normal / 1.5 line height

Caption:      12px / Normal / 1.5 line height
Label:        14px / Medium / 1.5 line height
```

### Typography Rules

1. **Never go below 14px for body copy** — Minimum readability standard
2. **Use relaxed line height (1.75) for legal text** — Improves comprehension
3. **Favor structure over weight** — Avoid walls of bold text
4. **Use emphasis sparingly** — Bold should be meaningful, not decorative

### Legal-Specific Typography

**Legal definitions**: 16px, 1.75 line height, normal weight  
**Disclaimers**: 12px minimum, 1.75 line height, tertiary color

---

## Spacing System

Base unit: **4px**

```
xxxs: 2px
xxs:  4px
xs:   8px
sm:   12px
md:   16px  (default)
lg:   24px
xl:   32px
xxl:  48px
xxxl: 64px
```

### Layout Spacing

```
Screen padding horizontal: 16px
Screen padding vertical:   24px
Card padding:             16px
Section spacing:          32px
```

---

## Border Radius

```
Small:  4px   (tags, small buttons)
Medium: 8px   (buttons, inputs)
Large:  12px  (cards)
XL:     16px  (modals)
Full:   9999px (pills, badges)
```

---

## Shadows & Elevation

```
None: none
Small:  0 1px 2px rgba(0,0,0,0.05)
Base:   0 1px 3px rgba(0,0,0,0.1)
Medium: 0 4px 6px rgba(0,0,0,0.1)
Large:  0 10px 15px rgba(0,0,0,0.1)
XL:     0 20px 25px rgba(0,0,0,0.1)
```

**Usage**: Subtle depth only. Never use heavy shadows for urgency.

---

## Component Patterns

### Cards

**Default Card**
- Background: White
- Border radius: 12px
- Padding: 16px
- Shadow: Small
- Border: None

**Outlined Card** (for less emphasis)
- Background: White
- Border: 1px solid #DFE6E9
- Border radius: 12px
- Padding: 16px
- Shadow: None

### Buttons

**Primary Button**
- Background: #6C5CE7
- Text: White, 16px semibold
- Padding: 12px 24px
- Min height: 48px
- Border radius: 8px

**Secondary Button**
- Background: Transparent
- Border: 1px solid #DFE6E9
- Text: #2D3436, 16px semibold
- Padding: 12px 24px
- Min height: 48px
- Border radius: 8px

**Text Button**
- Background: Transparent
- Text: #6C5CE7, 16px semibold
- Padding: 12px 16px
- Min height: 48px

### Input Fields

- Background: White
- Border: 1px solid #DFE6E9
- Border radius: 8px
- Padding: 12px 16px
- Min height: 48px
- Font size: 16px
- Focus border: #6C5CE7, 2px

### Explanations & Tooltips

**Explanation Block**
- Background: #E3F2FD (info background)
- Border left: 4px solid #74B9FF
- Border radius: 12px
- Padding: 16px

**Tooltip**
- Background: #2D3436 (dark)
- Text: White, 14px
- Border radius: 8px
- Padding: 12px
- Max width: 280px
- Shadow: Large

---

## Icons & Visuals

### Icon Guidelines

- **No emojis** — Use text labels or proper icon libraries only
- **Minimum size**: 24x24px for touch targets
- **Color**: Match text hierarchy (primary, secondary, brand)
- **Style**: Outline or filled, consistent throughout

### Illustrations

- **Style**: Calm, friendly, not cutesy
- **Color**: Primarily purple palette
- **Usage**: Onboarding, empty states, educational sections only

---

## Accessibility

### Touch Targets

- **Minimum**: 48x48px for all interactive elements
- **Spacing**: 8px minimum between adjacent touch targets

### Focus States

- **Focus ring**: 2px solid #6C5CE7
- **Focus offset**: 2px
- **Visible on all interactive elements**

### Contrast Requirements

- **Normal text**: 4.5:1 minimum (WCAG AA)
- **Large text**: 3:1 minimum (WCAG AA)
- **Target**: 7:1 where practical (WCAG AAA)

### Color Independence

- Never rely on color alone to convey meaning
- Always pair color with text, icons, or patterns

---

## Animation & Motion

### Timing

```
Instant: 0ms
Fast:    150ms  (simple state changes)
Base:    250ms  (default)
Slow:    350ms  (complex transitions)
Slower:  500ms  (modals, sheets)
```

### Easing

- **Default**: ease-out (0, 0, 0.2, 1)
- **Entrance**: ease-out
- **Exit**: ease-in (0.4, 0, 1, 1)

### Motion Principles

1. **Calm, never jarring** — Smooth, predictable transitions
2. **Purposeful, never decorative** — Motion explains spatial relationships
3. **Respect reduced motion** — Disable animations when user prefers

---

## Dark Mode

**Status**: Not currently implemented

**Future Consideration**: Legal documents are typically light. Dark mode must not compromise readability or create unintended urgency through contrast.

---

## Implementation

### Token Files

- `src/theme/ellioTokens.ts` — Core ellio design tokens
- `src/theme/ellioLawTokens.ts` — Legal-context semantic extensions

### Usage

```typescript
import { EllioLawColors, EllioLawTypography } from '../theme/ellioLawTokens';

const styles = StyleSheet.create({
  container: {
    backgroundColor: EllioLawColors.background,
    padding: EllioSpacing.md,
  },
  heading: {
    ...EllioLawTypography.heading2,
  },
});
```

---

## Design Review Checklist

Before shipping any UI:

- [ ] No emojis anywhere
- [ ] No alarm red unless legally required
- [ ] No "urgent" or "critical" language
- [ ] All text minimum 14px
- [ ] All touch targets minimum 48px
- [ ] Contrast ratio meets WCAG AA
- [ ] Focus states visible
- [ ] Color not sole indicator
- [ ] Motion respects reduced motion preference
- [ ] Feels calm, not rushed

---

## Questions or Clarifications

For design system questions, consult:
1. This document
2. `ellioTokens.ts` source code
3. ellio core brand guidelines

**Remember**: If it feels urgent, alarming, or stressful — it fails the ellio standard.
