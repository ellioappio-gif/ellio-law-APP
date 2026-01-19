import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Document, DocumentCategory, DocumentType } from '../types';

/**
 * Convert image to PDF
 */
export const convertImageToPDF = async (imageUri: string, documentName: string): Promise<string> => {
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body {
            margin: 0;
            padding: 0;
          }
          img {
            width: 100%;
            height: auto;
            display: block;
          }
        </style>
      </head>
      <body>
        <img src="${imageUri}" />
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  
  const pdfName = `${documentName}_${Date.now()}.pdf`;
  const pdfUri = `${FileSystem.documentDirectory}${pdfName}`;
  
  await FileSystem.moveAsync({
    from: uri,
    to: pdfUri,
  });

  return pdfUri;
};

/**
 * Categorize document based on name and content analysis
 */
export const categorizeDocument = (fileName: string, description?: string): DocumentCategory => {
  const lowerFileName = fileName.toLowerCase();
  const lowerDescription = description?.toLowerCase() || '';
  const combined = `${lowerFileName} ${lowerDescription}`;

  // Evidence keywords
  if (combined.match(/photo|picture|image|scene|damage|injury|evidence/)) {
    return DocumentCategory.EVIDENCE;
  }

  // Court documents
  if (combined.match(/court|filing|motion|pleading|summons|subpoena|order|judgment/)) {
    return DocumentCategory.COURT_DOCUMENTS;
  }

  // Correspondence
  if (combined.match(/letter|email|correspondence|communication/)) {
    return DocumentCategory.CORRESPONDENCE;
  }

  // Medical records
  if (combined.match(/medical|doctor|hospital|health|treatment|diagnosis|prescription/)) {
    return DocumentCategory.MEDICAL_RECORDS;
  }

  // Police reports
  if (combined.match(/police|officer|report|incident|accident|citation/)) {
    return DocumentCategory.POLICE_REPORTS;
  }

  // Witness statements
  if (combined.match(/witness|statement|testimony|affidavit/)) {
    return DocumentCategory.WITNESS_STATEMENTS;
  }

  // Contracts
  if (combined.match(/contract|agreement|lease|deed/)) {
    return DocumentCategory.CONTRACTS;
  }

  // Receipts
  if (combined.match(/receipt|expense|payment|invoice|bill/)) {
    return DocumentCategory.RECEIPTS;
  }

  return DocumentCategory.OTHER;
};

/**
 * Generate a standardized document name based on Virginia law requirements
 */
export const generateDocumentName = (
  category: DocumentCategory,
  date: Date,
  customName?: string
): string => {
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
  const categoryPrefix = category.replace(/\s+/g, '_').toUpperCase();
  
  if (customName) {
    return `${categoryPrefix}_${dateStr}_${customName}`;
  }
  
  return `${categoryPrefix}_${dateStr}`;
};

/**
 * Share document with external apps
 */
export const shareDocument = async (uri: string) => {
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri);
  } else {
    throw new Error('Sharing is not available on this device');
  }
};

/**
 * Sort documents chronologically
 */
export const sortDocumentsChronologically = (documents: Document[]): Document[] => {
  return [...documents].sort((a, b) => b.date.getTime() - a.date.getTime());
};

/**
 * Virginia law compliance check for document naming
 */
export const isVirginiaLawCompliant = (documentName: string): boolean => {
  // Virginia law requires clear dating and identification
  // Document names should include date and clear description
  const hasDate = /\d{4}-\d{2}-\d{2}/.test(documentName);
  const hasCategory = /[A-Z_]+/.test(documentName);
  
  return hasDate && hasCategory && documentName.length > 10;
};
