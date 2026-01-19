import {
  Folder,
  Document,
  DocumentCategory,
  TimelineEvent,
  VoiceNote,
  Witness,
  Expense,
  Deadline,
  LegalAidOrganization,
  Court,
  DocumentTemplate,
  Workflow,
} from './index';

// Re-export types from index for external use
export {
  Folder,
  Document,
  DocumentCategory,
  TimelineEvent,
  VoiceNote,
  Witness,
  Expense,
  Deadline,
  LegalAidOrganization,
  Court,
  DocumentTemplate,
  Workflow,
};

export enum USState {
  ALABAMA = 'Alabama',
  ALASKA = 'Alaska',
  ARIZONA = 'Arizona',
  ARKANSAS = 'Arkansas',
  CALIFORNIA = 'California',
  COLORADO = 'Colorado',
  CONNECTICUT = 'Connecticut',
  DELAWARE = 'Delaware',
  FLORIDA = 'Florida',
  GEORGIA = 'Georgia',
  HAWAII = 'Hawaii',
  IDAHO = 'Idaho',
  ILLINOIS = 'Illinois',
  INDIANA = 'Indiana',
  IOWA = 'Iowa',
  KANSAS = 'Kansas',
  KENTUCKY = 'Kentucky',
  LOUISIANA = 'Louisiana',
  MAINE = 'Maine',
  MARYLAND = 'Maryland',
  MASSACHUSETTS = 'Massachusetts',
  MICHIGAN = 'Michigan',
  MINNESOTA = 'Minnesota',
  MISSISSIPPI = 'Mississippi',
  MISSOURI = 'Missouri',
  MONTANA = 'Montana',
  NEBRASKA = 'Nebraska',
  NEVADA = 'Nevada',
  NEW_HAMPSHIRE = 'New Hampshire',
  NEW_JERSEY = 'New Jersey',
  NEW_MEXICO = 'New Mexico',
  NEW_YORK = 'New York',
  NORTH_CAROLINA = 'North Carolina',
  NORTH_DAKOTA = 'North Dakota',
  OHIO = 'Ohio',
  OKLAHOMA = 'Oklahoma',
  OREGON = 'Oregon',
  PENNSYLVANIA = 'Pennsylvania',
  RHODE_ISLAND = 'Rhode Island',
  SOUTH_CAROLINA = 'South Carolina',
  SOUTH_DAKOTA = 'South Dakota',
  TENNESSEE = 'Tennessee',
  TEXAS = 'Texas',
  UTAH = 'Utah',
  VERMONT = 'Vermont',
  VIRGINIA = 'Virginia',
  WASHINGTON = 'Washington',
  WEST_VIRGINIA = 'West Virginia',
  WISCONSIN = 'Wisconsin',
  WYOMING = 'Wyoming',
  DISTRICT_OF_COLUMBIA = 'District of Columbia',
}

export interface StateConfig {
  state: USState;
  abbreviation: string;
  legalAidOrganizations: LegalAidOrganization[];
  courts: Court[];
  templates: DocumentTemplate[];
  workflows: Workflow[];
  specificLaws?: StateLaw[];
}

export interface StateLaw {
  id: string;
  category: string;
  title: string;
  description: string;
  statute: string;
  effectiveDate?: Date;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  helpful?: boolean;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}

export interface UserProfile {
  id: string;
  name?: string;
  state: USState;
  hasCompletedOnboarding: boolean;
  preferredLanguage: 'en' | 'es';
  createdDate: Date;
}

// Note: Re-exporting happens at the end of this file
// export * from './index';
