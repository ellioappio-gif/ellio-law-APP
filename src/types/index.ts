export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  category: DocumentCategory;
  uri: string;
  date: Date;
  description?: string;
  tags?: string[];
  folderId?: string;
}

export enum DocumentType {
  PDF = 'pdf',
  IMAGE = 'image',
  PHOTO = 'photo',
}

export enum DocumentCategory {
  EVIDENCE = 'Evidence',
  COURT_DOCUMENTS = 'Court Documents',
  CORRESPONDENCE = 'Correspondence',
  MEDICAL_RECORDS = 'Medical Records',
  POLICE_REPORTS = 'Police Reports',
  WITNESS_STATEMENTS = 'Witness Statements',
  CONTRACTS = 'Contracts',
  RECEIPTS = 'Receipts & Expenses',
  PHOTOS = 'Photographic Evidence',
  OTHER = 'Other',
}

export interface Folder {
  id: string;
  name: string;
  category: DocumentCategory;
  createdDate: Date;
  documents: Document[];
}

export interface CaseInfo {
  id: string;
  name: string;
  caseNumber?: string;
  createdDate: Date;
  folders: Folder[];
  timeline?: TimelineEvent[];
  voiceNotes?: VoiceNote[];
  witnesses?: Witness[];
  expenses?: Expense[];
  deadlines?: Deadline[];
  caseType?: CaseType;
}

// Timeline Builder Types
export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  category: TimelineCategory;
  documentIds?: string[];
  importance: 'low' | 'medium' | 'high' | 'critical';
}

export enum TimelineCategory {
  INCIDENT = 'Incident',
  MEDICAL = 'Medical Event',
  LEGAL_ACTION = 'Legal Action',
  COMMUNICATION = 'Communication',
  EVIDENCE_COLLECTED = 'Evidence Collected',
  COURT_DATE = 'Court Date',
  DEADLINE = 'Deadline',
  OTHER = 'Other Event',
}

// Voice Notes Types
export interface VoiceNote {
  id: string;
  date: Date;
  duration: number; // in seconds
  audioUri: string;
  transcription?: string;
  summary?: string;
  relatedEventId?: string;
  tags?: string[];
}

// Witness Manager Types
export interface Witness {
  id: string;
  name: string;
  contactInfo: ContactInfo;
  relationship: string;
  statements: WitnessStatement[];
  availability?: string;
  notes?: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

export interface WitnessStatement {
  id: string;
  date: Date;
  content: string;
  documentUri?: string;
  signed: boolean;
}

// Expense Tracker Types
export interface Expense {
  id: string;
  date: Date;
  category: ExpenseCategory;
  amount: number;
  description: string;
  receiptUri?: string;
  reimbursable: boolean;
  status: 'pending' | 'approved' | 'denied' | 'paid';
}

export enum ExpenseCategory {
  MEDICAL = 'Medical Expenses',
  LEGAL_FEES = 'Legal Fees',
  COURT_COSTS = 'Court Costs',
  LOST_WAGES = 'Lost Wages',
  PROPERTY_DAMAGE = 'Property Damage',
  TRAVEL = 'Travel',
  EXPERT_WITNESS = 'Expert Witness',
  FILING_FEES = 'Filing Fees',
  OTHER = 'Other',
}

// Deadlines Types
export interface Deadline {
  id: string;
  title: string;
  date: Date;
  type: DeadlineType;
  description: string;
  completed: boolean;
  reminderDays?: number[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export enum DeadlineType {
  FILING = 'Filing Deadline',
  COURT_APPEARANCE = 'Court Appearance',
  DISCOVERY = 'Discovery Deadline',
  RESPONSE = 'Response Due',
  STATUTE_OF_LIMITATIONS = 'Statute of Limitations',
  PAYMENT = 'Payment Due',
  OTHER = 'Other',
}

// Case Type for Templates and Workflows
export enum CaseType {
  SMALL_CLAIMS = 'Small Claims',
  LANDLORD_TENANT = 'Landlord/Tenant',
  TRAFFIC = 'Traffic Violation',
  FAMILY_LAW = 'Family Law',
  EMPLOYMENT = 'Employment',
  PERSONAL_INJURY = 'Personal Injury',
  CONTRACT_DISPUTE = 'Contract Dispute',
  CRIMINAL = 'Criminal',
  OTHER = 'Other',
}

// Document Template Types
export interface DocumentTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  caseTypes: CaseType[];
  content: string;
  fields: TemplateField[];
  instructions: string;
}

export enum TemplateCategory {
  MOTION = 'Motion',
  AFFIDAVIT = 'Affidavit',
  LETTER = 'Letter',
  NOTICE = 'Notice',
  COMPLAINT = 'Complaint',
  ANSWER = 'Answer',
  DISCOVERY = 'Discovery',
  OTHER = 'Other',
}

export interface TemplateField {
  name: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'select';
  required: boolean;
  options?: string[];
}

// Workflow Types
export interface Workflow {
  id: string;
  title: string;
  caseType: CaseType;
  steps: WorkflowStep[];
  estimatedTime: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  requiredDocuments?: string[];
  tips?: string[];
  resources?: Resource[];
}

export interface Resource {
  title: string;
  url?: string;
  description: string;
  type: 'article' | 'video' | 'form' | 'link';
}

// Legal Aid Types
export interface LegalAidOrganization {
  id: string;
  name: string;
  type: 'legal_aid' | 'pro_bono' | 'self_help' | 'law_school_clinic';
  address: string;
  phone: string;
  email?: string;
  website?: string;
  servicesOffered: string[];
  eligibilityCriteria: string;
  counties: string[];
  languages: string[];
}

// Court Information Types
export interface Court {
  id: string;
  name: string;
  type: 'circuit' | 'general_district' | 'juvenile_domestic' | 'magistrate';
  address: string;
  phone: string;
  website?: string;
  hours: string;
  efilingAvailable: boolean;
  filingFees: FilingFee[];
  jurisdiction: string[];
}

export interface FilingFee {
  type: string;
  amount: number;
  waiverAvailable: boolean;
}

// Settlement Calculator Types
export interface SettlementCalculation {
  medicalExpenses: number;
  lostWages: number;
  propertyDamage: number;
  painAndSuffering?: number;
  total: number;
  notes: string;
}

// Sharing Types
export interface ShareLink {
  id: string;
  createdDate: Date;
  expiresDate: Date;
  password?: string;
  documentIds: string[];
  accessCount: number;
  maxAccess?: number;
}
// New Feature Types - Court Preparation & Case Management

// Service of Process Tracking
export interface ServiceRecord {
  id: string;
  partyName: string;
  partyRole: 'defendant' | 'plaintiff' | 'witness' | 'other';
  attempts: ServiceAttempt[];
  deadline?: Date;
  completed: boolean;
  proofOfServiceUri?: string;
}

export interface ServiceAttempt {
  id: string;
  date: Date;
  method: 'personal' | 'substitute' | 'certified-mail' | 'publication' | 'other';
  location: string;
  servedBy: string;
  result: 'successful' | 'unsuccessful' | 'pending';
  notes: string;
}

// Discovery Management
export interface DiscoveryRequest {
  id: string;
  type: 'interrogatories' | 'production' | 'admissions' | 'deposition';
  direction: 'received' | 'sent';
  dateSentReceived: Date;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue' | 'extended';
  description: string;
  responseUri?: string;
  notes?: string;
}

// Hearing Outcomes
export interface HearingOutcome {
  id: string;
  hearingDate: Date;
  hearingType: string;
  judge: string;
  motions: MotionOutcome[];
  generalNotes: string;
  nextSteps: string[];
  appealDeadline?: Date;
}

export interface MotionOutcome {
  id: string;
  motionTitle: string;
  result: 'granted' | 'denied' | 'granted-in-part' | 'continued';
  reasoning?: string;
  conditions?: string;
}

// Evidence Organization
export interface EvidenceItem {
  id: string;
  name: string;
  type: 'photo' | 'document' | 'physical' | 'testimonial' | 'electronic';
  dateObtained: Date;
  relevantClaims: string[];
  supportedFacts: string[];
  chainOfCustody: ChainOfCustodyEntry[];
  admissibilityNotes?: string;
  uri?: string;
}

export interface ChainOfCustodyEntry {
  id: string;
  date: Date;
  who: string;
  action: string;
  notes?: string;
}

// Case Journal
export interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  category: 'observation' | 'question' | 'concern' | 'progress' | 'general';
  tags: string[];
}

// Attorney Handoff
export interface HandoffPackage {
  id: string;
  createdDate: Date;
  caseId: string;
  selectedSections: string[];
  exportFormat: 'pdf' | 'folder';
}