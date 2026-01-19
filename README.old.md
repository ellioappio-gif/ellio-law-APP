# Ellio Law - Legal Document Management App

A mobile application designed to help individuals navigate the legal system by managing legal documents, evidence, and case materials with Virginia law compliance.

## Features

### 📷 Document Capture
- Use your phone's camera to capture photos of legal documents and evidence
- Upload from device photo library, iCloud, and Google Drive
- Browse and select files from your device

### 📄 Automatic PDF Conversion
- All captured images are automatically converted to PDF format
- Ensures professional, court-ready document formatting
- Maintains high quality for readability

### 🗂️ Intelligent Organization
- Automatic categorization based on document content and description
- Categories include:
  - Evidence
  - Court Documents
  - Correspondence
  - Medical Records
  - Police Reports
  - Witness Statements
  - Contracts
  - Receipts & Expenses
  - Photographic Evidence
  - Other

### 📅 Chronological Sorting
- Documents are automatically sorted by date
- Easy timeline tracking for your case
- Quick access to recent documents

### ⚖️ Virginia Law Compliance
- Document naming follows legal standards
- Automatic date stamping
- Clear categorization for court submission
- Organized folder structure

### 📊 Case Management
- Create multiple cases
- Organize documents into folders by category
- Track case numbers and dates
- Easy sharing with attorneys

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (installed automatically)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Navigate to the project directory:
```bash
cd ellio-law
```

2. Install dependencies (already completed):
```bash
npm install
```

### Running the App

#### iOS (Mac only)
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Web Browser (for testing)
```bash
npm run web
```

### Development

To start the Expo development server:
```bash
npm start
```

This will open the Expo DevTools in your browser where you can:
- Run on iOS simulator
- Run on Android emulator
- Scan QR code to run on your physical device using Expo Go app

## Project Structure

```
ellio-law/
├── src/
│   ├── components/
│   │   ├── DocumentCapture.tsx    # Camera and file upload component
│   │   └── DocumentList.tsx       # Document display and management
│   ├── screens/
│   │   ├── HomeScreen.tsx         # Case list and creation
│   │   └── CaseDetailsScreen.tsx  # Folder and document management
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   └── utils/
│       ├── documentUtils.ts       # PDF conversion and categorization
│       └── storageUtils.ts        # Local storage management
├── App.tsx                        # Main app navigation
├── app.json                       # Expo configuration
├── package.json                   # Dependencies
└── tsconfig.json                  # TypeScript configuration
```

## Key Technologies

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tooling
- **TypeScript**: Type-safe code
- **React Navigation**: Screen navigation
- **Expo Camera**: Camera access
- **Expo Image Picker**: Photo library access
- **Expo Document Picker**: File system access
- **Expo Print**: PDF generation
- **AsyncStorage**: Local data persistence

## Usage Guide

### Creating a Case
1. Open the app
2. Tap "Create New Case"
3. Enter case name and optional case number
4. Tap "Create"

### Creating Folders
1. Select a case
2. Tap "Create Folder"
3. Enter folder name
4. Select category
5. Tap "Create"

### Adding Documents
1. Open a folder
2. Tap "Add Document"
3. Choose capture method:
   - **Take Photo**: Use camera to capture document
   - **Photo Library**: Select from existing photos
   - **Browse Files**: Select PDF or image files
4. Optionally add name and description
5. Document is automatically converted to PDF and categorized

### Managing Documents
- **View**: Tap on any document to view details
- **Share**: Send documents to attorneys or other apps
- **Delete**: Remove unwanted documents
- **Organize**: Documents are automatically sorted chronologically

## Virginia Law Compliance

The app ensures all documents meet Virginia legal standards:

- **Standardized Naming**: `CATEGORY_YYYY-MM-DD_CustomName`
- **Date Stamping**: All documents include creation date
- **Categorization**: Clear organization by document type
- **PDF Format**: Court-ready document format
- **Chronological Order**: Timeline-based organization

## Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

Note: Requires Expo Application Services (EAS) account. Visit https://expo.dev for setup.

## Support

For issues or questions about the app, please refer to:
- React Native documentation: https://reactnative.dev
- Expo documentation: https://docs.expo.dev

## License

This project is created for personal legal document management.

## Disclaimer

This app is designed to help organize legal documents. It does not provide legal advice. Always consult with a qualified attorney for legal guidance.
