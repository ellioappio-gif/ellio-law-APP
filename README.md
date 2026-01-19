# Ellio Law - Legal Document Management App

A comprehensive React Native mobile application designed to help self-represented litigants organize their legal cases, especially for people with no legal knowledge and limited financial resources.

## Features

### Core Case Management
- **Case Organization**: Create and manage multiple legal cases
- **Document Management**: Organize documents into categorized folders
- **Document Capture**: Take photos of documents, import from gallery, or scan PDFs
- **PDF Generation**: Convert captured documents to PDF format
- **Virginia Law Compliance**: State-specific legal resources and forms

### For Self-Represented Litigants

#### 1. Timeline Builder 📅
Build a visual chronological timeline of all events in your case:
- Add events with dates, descriptions, and importance levels
- Filter by category (incident, filing, hearing, evidence, communication, etc.)
- Attach documents to specific timeline events
- See your case story laid out chronologically

#### 2. Voice Notes 🎙
Record audio notes to capture thoughts and observations:
- Quick voice recording with one tap
- Add transcriptions and tags for easy searching
- Associate voice notes with specific case events
- Perfect for capturing details immediately after incidents or meetings

#### 3. Witness Manager 👥
Keep track of witnesses and their information:
- Store contact details (phone, email, address)
- Record witness statements and testimony
- Track witness availability
- Note witness relationships to parties involved

#### 4. Expense Tracker 💰
Monitor all case-related expenses:
- Categorize expenses (filing fees, copies, travel, postage, expert fees, etc.)
- Mark expenses as reimbursable
- Calculate total spent and reimbursable amounts
- Attach receipts and proof of payment

#### 5. Deadline Tracker ⏰
Never miss an important court deadline:
- Track filing deadlines, hearing dates, discovery deadlines
- Visual indicators for overdue and upcoming deadlines
- Set priority levels (high, medium, low)
- Mark deadlines as completed when done

#### 6. Legal Aid Finder 🆘
Find free and low-cost legal help in Virginia:
- Searchable directory of legal aid organizations
- Filter by service type and county
- Direct links to call, email, or visit websites
- Eligibility information and services offered

#### 7. Legal Glossary 📖
Understand legal terminology:
- Plain English definitions of common legal terms
- Searchable database
- Learn as you go through your case

#### 8. Court Information ⚖️
Virginia court directory and resources:
- Court locations, hours, and contact information
- Filing fees and fee waiver information
- E-filing availability
- Jurisdiction information

#### 9. Document Templates 📝
Pre-formatted legal document templates:
- Fill-in-the-blank legal forms
- Motion templates, affidavit templates, and more
- Auto-fill with your information
- Preview before sharing
- Export as PDF

#### 10. Guided Workflows 📋
Step-by-step guides for common legal procedures:
- Filing a small claims case
- Responding to a lawsuit
- Discovery processes
- Checkbox tracking of completed steps
- Tips and required documents for each step

#### 11. Settlement Calculator 🧮
Estimate potential settlement amounts:
- Calculate economic damages (medical bills, lost wages, property damage)
- Estimate non-economic damages (pain & suffering)
- Adjustable multipliers
- Educational disclaimer included

## Technology Stack

- **React Native**: 0.81.5
- **Expo**: ~54.0.31
- **TypeScript**: ~5.9.2
- **Navigation**: React Navigation 7.x
- **Storage**: AsyncStorage
- **Camera/Media**: expo-camera, expo-image-picker, expo-document-picker
- **Audio**: expo-av
- **PDF**: expo-print, expo-sharing
- **File System**: expo-file-system

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ellio-law
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npx expo start
```

4. Run on your device
- Scan the QR code with the Expo Go app (iOS/Android)
- Or press `i` for iOS simulator
- Or press `a` for Android emulator

## Project Structure

```
ellio-law/
├── App.tsx                    # Main app entry with navigation
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── DeadlineTracker.tsx
│   │   ├── DocumentCapture.tsx
│   │   ├── DocumentList.tsx
│   │   ├── ExpenseTracker.tsx
│   │   ├── SettlementCalculator.tsx
│   │   ├── TimelineBuilder.tsx
│   │   ├── VoiceNotes.tsx
│   │   └── WitnessManager.tsx
│   ├── screens/               # Full screen components
│   │   ├── CaseDetailsScreen.tsx
│   │   ├── CourtInfoScreen.tsx
│   │   ├── GlossaryScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LegalAidScreen.tsx
│   │   ├── TemplatesScreen.tsx
│   │   └── WorkflowsScreen.tsx
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │   ├── documentUtils.ts
│   │   ├── storageUtils.ts
│   │   └── summaryGenerator.ts
│   └── data/                  # Static data
│       └── legalData.ts       # VA legal resources
├── assets/                    # Images and fonts
└── package.json
```

## Features in Case Details View

When you open a case, you'll see tabs for:

1. **Documents** - Your organized document folders
2. **Timeline** - Chronological event timeline
3. **Witnesses** - Witness contact and statement management
4. **Expenses** - Case expense tracking
5. **Deadlines** - Court deadline management
6. **Notes** - Voice note recordings
7. **Calculator** - Settlement estimation tool

## Virginia-Specific Resources

This app includes resources specific to Virginia:
- Legal Aid organizations across the state
- Virginia circuit and district court information
- Virginia-specific legal forms and templates
- Virginia legal terminology and procedures

## Future Enhancements

- Cloud backup and sync
- Secure case sharing with attorneys
- Advanced document search
- Evidence checklists
- Case summary generation
- Multi-language support
- Notification reminders for deadlines

## Legal Disclaimer

This app is designed to help organize legal materials and provide general legal information. It does NOT provide legal advice. For specific legal advice, consult with a licensed attorney. The information provided is for educational purposes only.

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub or contact support.

## Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

---

Built with ❤️ to help people access justice
