import { LegalAidOrganization, Court, DocumentTemplate, Workflow, TemplateCategory, TemplateField, CaseType } from '../types';
import { StateConfig, USState } from '../types/extended';

// Sample data for all 50 states - in production this would be a comprehensive database
export const ALL_STATE_DATA: Partial<Record<USState, StateConfig>> = {
  [USState.ALABAMA]: {
    state: USState.ALABAMA,
    abbreviation: 'AL',
    legalAidOrganizations: [
      {
        id: 'al-legal-services-1',
        name: 'Legal Services Alabama',
        type: 'legal_aid',
        address: '207 Montgomery St, Montgomery, AL 36104',
        phone: '(334) 832-4570',
        email: 'info@legalservicesalabama.org',
        website: 'https://www.legalservicesalabama.org',
        servicesOffered: ['Family Law', 'Housing', 'Consumer Rights', 'Public Benefits'],
        eligibilityCriteria: 'Income at or below 125% of federal poverty guidelines',
        counties: ['All Alabama Counties'],
        languages: ['English', 'Spanish'],
      },
    ],
    courts: [
      {
        id: 'al-circuit-montgomery',
        name: 'Montgomery Circuit Court',
        type: 'circuit',
        address: '251 S Lawrence St, Montgomery, AL 36104',
        phone: '(334) 832-1260',
        website: 'https://montgomerycountyalabama.gov',
        hours: 'Monday-Friday 8:00 AM - 5:00 PM',
        efilingAvailable: true,
        filingFees: [
          { type: 'Civil Filing', amount: 202, waiverAvailable: true },
          { type: 'Small Claims', amount: 94, waiverAvailable: true },
        ],
        jurisdiction: ['Civil', 'Criminal', 'Family'],
      },
    ],
    templates: [
      {
        id: 'al-template-1',
        name: 'Motion for Continuance',
        category: TemplateCategory.MOTION,
        caseTypes: [CaseType.SMALL_CLAIMS, CaseType.OTHER],
        fields: [
          { name: 'yourName', label: 'Your Name', type: 'text' as const, required: true },
          { name: 'caseNumber', label: 'Case Number', type: 'text' as const, required: true },
          { name: 'courtName', label: 'Court Name', type: 'text' as const, required: true },
          { name: 'reason', label: 'Reason for Continuance', type: 'text' as const, required: true },
        ],
        content: 'IN THE [Court Name]\\n\\n[Your Name], Plaintiff\\nv.\\nCase No. [Case Number]\\n\\nMOTION FOR CONTINUANCE',
        instructions: 'Fill in all fields. File with the court clerk at least 2 weeks before your hearing date.',
      },
    ],
    workflows: [
      {
        id: 'al-workflow-small-claims',
        title: 'Filing a Small Claims Case in Alabama',
        caseType: CaseType.SMALL_CLAIMS,
        estimatedTime: '2-3 hours',
        steps: [
          {
            id: 'step-1',
            title: 'Verify jurisdiction and amount',
            description: 'Alabama small claims courts handle cases up to $6,000',
            requiredDocuments: [],
            tips: ['Small claims are for money damages only'],
            completed: false,
          },
        ],
      },
    ],
  },
  
  [USState.CALIFORNIA]: {
    state: USState.CALIFORNIA,
    abbreviation: 'CA',
    legalAidOrganizations: [
      {
        id: 'ca-legal-aid-1',
        name: 'Legal Aid Foundation of Los Angeles',
        type: 'legal_aid',
        address: '1102 S Crenshaw Blvd, Los Angeles, CA 90019',
        phone: '(800) 399-4529',
        email: 'intake@lafla.org',
        website: 'https://www.lafla.org',
        servicesOffered: ['Housing', 'Family Law', 'Immigration', 'Consumer Rights'],
        eligibilityCriteria: 'Income at or below 200% of federal poverty guidelines',
        counties: ['Los Angeles'],
        languages: ['English', 'Spanish', 'Korean', 'Chinese'],
      },
    ],
    courts: [
      {
        id: 'ca-superior-la',
        name: 'Los Angeles Superior Court - Stanley Mosk Courthouse',
        type: 'circuit',
        address: '111 N Hill St, Los Angeles, CA 90012',
        phone: '(213) 830-0800',
        website: 'https://www.lacourt.org',
        hours: 'Monday-Friday 8:30 AM - 4:30 PM',
        efilingAvailable: true,
        filingFees: [
          { type: 'Civil Limited', amount: 240, waiverAvailable: true },
          { type: 'Civil Unlimited', amount: 435, waiverAvailable: true },
          { type: 'Small Claims', amount: 75, waiverAvailable: true },
        ],
        jurisdiction: ['Civil', 'Criminal', 'Family', 'Probate'],
      },
    ],
    templates: [
      {
        id: 'ca-template-1',
        name: 'Motion for Continuance',
        category: TemplateCategory.MOTION,
        caseTypes: [CaseType.SMALL_CLAIMS, CaseType.OTHER],
        fields: [
          { name: 'yourName', label: 'Your Name', type: 'text' as const, required: true },
          { name: 'caseNumber', label: 'Case Number', type: 'text' as const, required: true },
        ],
        content: 'SUPERIOR COURT OF CALIFORNIA\\nCOUNTY OF LOS ANGELES\\n\\n[Your Name], Plaintiff\\nv.\\nCase No. [Case Number]\\n\\nMOTION FOR CONTINUANCE',
        instructions: 'File form at least 3 weeks before hearing.',
      },
    ],
    workflows: [],
  },

  [USState.VIRGINIA]: {
    state: USState.VIRGINIA,
    abbreviation: 'VA',
    legalAidOrganizations: [
      {
        id: 'va-legal-aid-1',
        name: 'Legal Aid Justice Center',
        type: 'legal_aid',
        address: '1000 Preston Ave, Charlottesville, VA 22903',
        phone: '(434) 977-0553',
        email: 'intake@justice4all.org',
        website: 'https://www.justice4all.org',
        servicesOffered: ['Housing', 'Family Law', 'Immigration', 'Education'],
        eligibilityCriteria: 'Income at or below 200% of federal poverty guidelines',
        counties: ['Charlottesville', 'Richmond', 'Petersburg'],
        languages: ['English', 'Spanish'],
      },
    ],
    courts: [
      {
        id: 'va-circuit-fairfax',
        name: 'Fairfax County Circuit Court',
        type: 'circuit',
        address: '4110 Chain Bridge Rd, Fairfax, VA 22030',
        phone: '(703) 246-2775',
        website: 'https://www.fairfaxcounty.gov/circuit',
        hours: 'Monday-Friday 8:00 AM - 4:00 PM',
        efilingAvailable: true,
        filingFees: [
          { type: 'Civil Filing', amount: 86, waiverAvailable: true },
          { type: 'Divorce', amount: 86, waiverAvailable: true },
        ],
        jurisdiction: ['Civil over $4,500', 'Felony Criminal', 'Divorce'],
      },
    ],
    templates: [],
    workflows: [],
  },
};

// For states without specific data yet, return empty config
const getDefaultStateConfig = (state: USState): StateConfig => ({
  state,
  abbreviation: getStateAbbreviation(state),
  legalAidOrganizations: [],
  courts: [],
  templates: [],
  workflows: [],
});

function getStateAbbreviation(state: USState): string {
  const abbreviations: Record<string, string> = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'District of Columbia': 'DC',
  };
  return abbreviations[state] || 'XX';
}

export const US_STATES = [
  { code: USState.ALABAMA, name: 'Alabama' },
  { code: USState.ALASKA, name: 'Alaska' },
  { code: USState.ARIZONA, name: 'Arizona' },
  { code: USState.ARKANSAS, name: 'Arkansas' },
  { code: USState.CALIFORNIA, name: 'California' },
  { code: USState.COLORADO, name: 'Colorado' },
  { code: USState.CONNECTICUT, name: 'Connecticut' },
  { code: USState.DELAWARE, name: 'Delaware' },
  { code: USState.FLORIDA, name: 'Florida' },
  { code: USState.GEORGIA, name: 'Georgia' },
  { code: USState.HAWAII, name: 'Hawaii' },
  { code: USState.IDAHO, name: 'Idaho' },
  { code: USState.ILLINOIS, name: 'Illinois' },
  { code: USState.INDIANA, name: 'Indiana' },
  { code: USState.IOWA, name: 'Iowa' },
  { code: USState.KANSAS, name: 'Kansas' },
  { code: USState.KENTUCKY, name: 'Kentucky' },
  { code: USState.LOUISIANA, name: 'Louisiana' },
  { code: USState.MAINE, name: 'Maine' },
  { code: USState.MARYLAND, name: 'Maryland' },
  { code: USState.MASSACHUSETTS, name: 'Massachusetts' },
  { code: USState.MICHIGAN, name: 'Michigan' },
  { code: USState.MINNESOTA, name: 'Minnesota' },
  { code: USState.MISSISSIPPI, name: 'Mississippi' },
  { code: USState.MISSOURI, name: 'Missouri' },
  { code: USState.MONTANA, name: 'Montana' },
  { code: USState.NEBRASKA, name: 'Nebraska' },
  { code: USState.NEVADA, name: 'Nevada' },
  { code: USState.NEW_HAMPSHIRE, name: 'New Hampshire' },
  { code: USState.NEW_JERSEY, name: 'New Jersey' },
  { code: USState.NEW_MEXICO, name: 'New Mexico' },
  { code: USState.NEW_YORK, name: 'New York' },
  { code: USState.NORTH_CAROLINA, name: 'North Carolina' },
  { code: USState.NORTH_DAKOTA, name: 'North Dakota' },
  { code: USState.OHIO, name: 'Ohio' },
  { code: USState.OKLAHOMA, name: 'Oklahoma' },
  { code: USState.OREGON, name: 'Oregon' },
  { code: USState.PENNSYLVANIA, name: 'Pennsylvania' },
  { code: USState.RHODE_ISLAND, name: 'Rhode Island' },
  { code: USState.SOUTH_CAROLINA, name: 'South Carolina' },
  { code: USState.SOUTH_DAKOTA, name: 'South Dakota' },
  { code: USState.TENNESSEE, name: 'Tennessee' },
  { code: USState.TEXAS, name: 'Texas' },
  { code: USState.UTAH, name: 'Utah' },
  { code: USState.VERMONT, name: 'Vermont' },
  { code: USState.VIRGINIA, name: 'Virginia' },
  { code: USState.WASHINGTON, name: 'Washington' },
  { code: USState.WEST_VIRGINIA, name: 'West Virginia' },
  { code: USState.WISCONSIN, name: 'Wisconsin' },
  { code: USState.WYOMING, name: 'Wyoming' },
  { code: USState.DISTRICT_OF_COLUMBIA, name: 'District of Columbia' },
];

export const getStateData = (state: USState): StateConfig => {
  return ALL_STATE_DATA[state] || getDefaultStateConfig(state);
};
