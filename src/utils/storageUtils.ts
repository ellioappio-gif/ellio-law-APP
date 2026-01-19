import AsyncStorage from '@react-native-async-storage/async-storage';
import { Document, Folder, CaseInfo } from '../types';

const CASES_KEY = '@ellio_law_cases';

/**
 * Save case information to local storage
 */
export const saveCase = async (caseInfo: CaseInfo): Promise<void> => {
  try {
    const cases = await getCases();
    const existingIndex = cases.findIndex(c => c.id === caseInfo.id);
    
    if (existingIndex >= 0) {
      cases[existingIndex] = caseInfo;
    } else {
      cases.push(caseInfo);
    }
    
    await AsyncStorage.setItem(CASES_KEY, JSON.stringify(cases));
  } catch (error) {
    console.error('Error saving case:', error);
    throw error;
  }
};

/**
 * Get all cases from local storage
 */
export const getCases = async (): Promise<CaseInfo[]> => {
  try {
    const casesJson = await AsyncStorage.getItem(CASES_KEY);
    if (!casesJson) return [];
    
    const cases = JSON.parse(casesJson);
    // Convert date strings back to Date objects
    return cases.map((c: any) => ({
      ...c,
      createdDate: new Date(c.createdDate),
      folders: c.folders.map((f: any) => ({
        ...f,
        createdDate: new Date(f.createdDate),
        documents: f.documents.map((d: any) => ({
          ...d,
          date: new Date(d.date),
        })),
      })),
    }));
  } catch (error) {
    console.error('Error getting cases:', error);
    return [];
  }
};

/**
 * Get a single case by ID
 */
export const getCase = async (caseId: string): Promise<CaseInfo | null> => {
  const cases = await getCases();
  return cases.find(c => c.id === caseId) || null;
};

/**
 * Delete a case
 */
export const deleteCase = async (caseId: string): Promise<void> => {
  try {
    const cases = await getCases();
    const filteredCases = cases.filter(c => c.id !== caseId);
    await AsyncStorage.setItem(CASES_KEY, JSON.stringify(filteredCases));
  } catch (error) {
    console.error('Error deleting case:', error);
    throw error;
  }
};

/**
 * Add document to a folder
 */
export const addDocumentToFolder = async (
  caseId: string,
  folderId: string,
  document: Document
): Promise<void> => {
  const caseInfo = await getCase(caseId);
  if (!caseInfo) throw new Error('Case not found');
  
  const folder = caseInfo.folders.find(f => f.id === folderId);
  if (!folder) throw new Error('Folder not found');
  
  folder.documents.push(document);
  await saveCase(caseInfo);
};

/**
 * Create a new folder in a case
 */
export const createFolder = async (
  caseId: string,
  folder: Folder
): Promise<void> => {
  const caseInfo = await getCase(caseId);
  if (!caseInfo) throw new Error('Case not found');
  
  caseInfo.folders.push(folder);
  await saveCase(caseInfo);
};

/**
 * Delete a folder from a case
 */
export const deleteFolder = async (
  caseId: string,
  folderId: string
): Promise<void> => {
  const caseInfo = await getCase(caseId);
  if (!caseInfo) throw new Error('Case not found');
  
  caseInfo.folders = caseInfo.folders.filter(f => f.id !== folderId);
  await saveCase(caseInfo);
};
