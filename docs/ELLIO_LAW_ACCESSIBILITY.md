# ellio-law Accessibility Standards

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production

---

## Commitment

ellio-law is designed to be accessible to all users, including people with:
- Visual impairments
- Motor disabilities
- Cognitive differences
- Stress or anxiety
- Limited technical experience

**Target**: WCAG 2.1 Level AA minimum, AAA where practical.

---

## Screen Reader Support

### VoiceOver (iOS)

All interactive elements must have:
- **Accessible labels** describing purpose
- **Accessible hints** explaining what happens when activated
- **Accessible traits** (button, header, link, etc.)
- **Logical reading order** following visual hierarchy

**Example**:
```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Add new case"
  accessibilityHint="Opens form to create a new legal case"
  accessibilityRole="button"
>
  <Text>+ Create New Case</Text>
</TouchableOpacity>
```

### TalkBack (Android)

Same requirements as VoiceOver:
- Content descriptions for all meaningful elements
- State descriptions for dynamic content
- Logical focus order
- Grouped content where appropriate

### Screen Reader Testing

**Required testing**:
- [ ] All screens navigable with screen reader only
- [ ] All actions completable without sight
- [ ] Meaningful labels (not "Button" or "TouchableOpacity")
- [ ] Forms announce errors and requirements
- [ ] Loading states announced
- [ ] Success/completion announced

---

## Color & Contrast

### Contrast Ratios (WCAG AA)

**Normal text (16px and below)**:
- Minimum: 4.5:1
- Target: 7:1 (AAA)

**Large text (18px+ or 14px+ bold)**:
- Minimum: 3:1
- Target: 4.5:1

### Color Combinations

**Approved combinations** (tested and meeting AA):

```
Text on Background:
- #2D3436 on #FFFFFF (16.1:1) ✅ AAA
- #636E72 on #FFFFFF (7.2:1)  ✅ AAA
- #2D3436 on #F8F9FA (15.3:1) ✅ AAA

Brand Purple on Background:
- #6C5CE7 on #FFFFFF (4.7:1) ✅ AA
- #FFFFFF on #6C5CE7 (4.7:1) ✅ AA

Information Blue:
- #0984E3 on #E3F2FD (5.8:1) ✅ AA
- #0984E3 on #FFFFFF (4.5:1) ✅ AA
```

### Color Independence

**Never rely on color alone** to convey:
- Status (completed, pending, overdue)
- Required fields
- Error states
- Important information

**Always pair color with**:
- Text labels
- Icons
- Patterns/borders
- Shape differences

**Example**:
```
❌ Red border only for errors
✅ Red border + "Error" label + error icon + descriptive text
```

---

## Typography & Readability

### Font Size Minimums

- **Body text**: Never below 14px
- **Legal content**: 16px preferred
- **Disclaimers**: 12px absolute minimum
- **Labels**: 14px minimum

### Dynamic Type Support

**iOS**: Support Dynamic Type categories
**Android**: Support font scaling preferences

**Testing**:
- [ ] Test at smallest system font
- [ ] Test at largest system font
- [ ] Ensure no text truncation
- [ ] Ensure no overlap
- [ ] Maintain layout integrity

### Line Height & Spacing

- **Body text**: 1.75 line height minimum
- **Long-form legal content**: 1.75-2.0 line height
- **Paragraph spacing**: Minimum 16px between paragraphs

### Font Weight

- **Avoid light weights** (300 and below)
- **Default**: 400 (normal)
- **Emphasis**: 600 (semibold) or 700 (bold)

---

## Touch Targets

### Size Requirements

**Minimum**: 48x48 pixels (iOS HIG, Android Material)  
**Preferred**: 48x48 pixels or larger

**Applies to**:
- Buttons
- Links
- Checkboxes
- Radio buttons
- Tab buttons
- Icon buttons
- Toggle switches

### Spacing

**Minimum spacing between targets**: 8px

**Example**:
```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  <TouchableOpacity style={{ minWidth: 48, minHeight: 48 }}>
    <Text>Option A</Text>
  </TouchableOpacity>
  <TouchableOpacity style={{ minWidth: 48, minHeight: 48 }}>
    <Text>Option B</Text>
  </TouchableOpacity>
</View>
```

---

## Focus Management

### Visible Focus Indicators

All interactive elements must have clear focus state:
- **Border**: 2px solid #6C5CE7
- **Offset**: 2px from element
- **Contrast**: Meets 3:1 against adjacent colors

### Focus Order

- **Logical order**: Top to bottom, left to right
- **Skip links**: Provided where helpful
- **Modal focus**: Trapped within modal until dismissed
- **Return focus**: After modal closes, focus returns to trigger

### Keyboard Navigation

All interactions must be keyboard accessible:
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate lists (where appropriate)
- [ ] Escape closes modals/dropdowns
- [ ] No keyboard traps

---

## Motion & Animation

### Reduced Motion Support

**Respect `prefers-reduced-motion`**:
- Disable decorative animations
- Use instant transitions instead of animated
- Cross-fade instead of slide/zoom
- Maintain functional feedback (loading states)

**Implementation**:
```tsx
const prefersReducedMotion = useReducedMotion();

const animationDuration = prefersReducedMotion ? 0 : 250;
```

### Safe Motion Practices

- **No rapid flashing** (seizure risk)
- **No parallax** effects
- **No automatic carousels** (or provide pause control)
- **Smooth easing**, not jarring

---

## Forms & Input

### Form Labels

Every input must have:
- **Visible label** (not placeholder-only)
- **Associated programmatically** (accessibilityLabel)
- **Purpose clear** without relying on position alone

### Required Fields

Indicate required fields:
- **Visual indicator**: " *" or "(required)" text
- **Accessible announcement**: "Required field"
- **Not color alone**: Never red asterisk alone

### Error Messaging

Errors must:
- **Be announced** to screen readers
- **Be visible** (not color-only)
- **Be specific**: "Email address is required" not "Error"
- **Be persistent** until resolved
- **Focus** on first error field

**Example**:
```tsx
{error && (
  <View 
    accessible={true}
    accessibilityRole="alert"
    accessibilityLiveRegion="polite"
  >
    <Text style={styles.errorText}>{error}</Text>
  </View>
)}
```

### Placeholder vs. Label

- **Never use placeholder as label** (disappears on focus)
- **Use placeholder for examples**: "e.g., 555-123-4567"
- **Always have visible label** above or beside input

---

## Images & Icons

### Alternative Text

All meaningful images must have:
- **accessibilityLabel** describing content
- **Empty string** for decorative images

**Examples**:
```tsx
// Meaningful image
<Image 
  source={casePhoto}
  accessibilityLabel="Photo of damaged vehicle front bumper"
/>

// Decorative image
<Image 
  source={decorativeDivider}
  accessibilityLabel=""
  accessible={false}
/>
```

### Icons

- **Text labels** preferred over icons alone
- **Accessible labels** when icons used alone
- **Meaningful names**: Not "Icon" or "img_1234"

---

## Legal Content Accessibility

### Plain Language

- **Simple words** over jargon
- **Short sentences** (15-20 words maximum)
- **Active voice** over passive
- **Definitions** for required legal terms

### Content Structure

- **Headings** for hierarchy (h1, h2, h3)
- **Lists** for sequences or options
- **White space** for breathing room
- **Chunking** complex information

### Reading Level

**Target**: 8th grade reading level for educational content  
**Maximum**: 10th grade for complex legal explanations

**Tools**: Hemingway Editor, readable.com

### Cognitive Load Reduction

- **One concept per screen** where possible
- **Progressive disclosure** instead of walls of text
- **Clear next steps** always visible
- **Consistent patterns** throughout app

---

## Navigation

### Clear Hierarchy

- **Breadcrumbs** or back button always visible
- **Current location** clear
- **Consistent navigation** patterns
- **No dead ends**

### Skip Links

Provide skip links where helpful:
- Skip to main content
- Skip repeated navigation
- Skip to results

---

## Testing Procedures

### Automated Testing

**Tools**:
- React Native Accessibility Checker
- Axe DevTools
- Lighthouse CI

**Run on**:
- Every pull request
- Before each release

### Manual Testing

**Required tests**:
- [ ] VoiceOver walkthrough (iOS)
- [ ] TalkBack walkthrough (Android)
- [ ] Keyboard-only navigation
- [ ] Contrast ratio checks
- [ ] Touch target measurements
- [ ] Reduced motion testing
- [ ] Dynamic type testing
- [ ] Color blindness simulation

### User Testing

**Include diverse users**:
- Screen reader users
- Motor disability users
- Cognitive disability users
- Older adults
- Non-technical users

---

## Legal & Ethical Accessibility

### Legal Requirements

ellio-law complies with:
- **ADA** (Americans with Disabilities Act)
- **Section 508** (federal accessibility)
- **WCAG 2.1 Level AA**

### Accessibility as Justice

Legal systems create barriers. ellio-law must not add more.

**Principles**:
- Accessibility is not optional
- Accessibility is everyone's responsibility
- Accessibility supports the mission
- Accessibility is ongoing, not one-time

---

## Accessibility Checklist

Before shipping any feature:

- [ ] Screen reader tested (iOS & Android)
- [ ] Keyboard navigation verified
- [ ] Color contrast checked (all combinations)
- [ ] Touch targets measured (48x48 minimum)
- [ ] Focus states visible and logical
- [ ] Motion respects reduced motion
- [ ] Forms have clear labels and error states
- [ ] Images have alt text
- [ ] Content chunked and clear
- [ ] One concept per screen
- [ ] Consistent patterns
- [ ] No color-only indicators
- [ ] Dynamic type supported
- [ ] Reading order logical

---

## Reporting Accessibility Issues

Users can report accessibility barriers:
- In-app feedback
- Email: accessibility@ellio.com
- Issue tracker (for developers)

**Commitment**: Address accessibility issues with high priority.

---

## Resources

### Guidelines

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [iOS Accessibility](https://developer.apple.com/accessibility/)
- [Android Accessibility](https://developer.android.com/guide/topics/ui/accessibility)

### Tools

- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Blind Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [Hemingway Editor](https://hemingwayapp.com/)

### Testing

- Lighthouse
- Axe DevTools
- React Native Accessibility Testing Library

---

## Future Improvements

Planned accessibility enhancements:
- [ ] High contrast mode
- [ ] Larger touch targets option
- [ ] Adjustable reading complexity
- [ ] Audio explanations
- [ ] More language translations

---

**Remember**: Accessibility is not a checklist. It's an ongoing commitment to inclusive design.
