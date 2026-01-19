import { LegalAidOrganization, Court, DocumentTemplate, TemplateCategory, CaseType, Workflow, WorkflowStep } from '../types';

// Virginia Legal Aid Organizations
export const VIRGINIA_LEGAL_AID: LegalAidOrganization[] = [
  {
    id: '1',
    name: 'Legal Aid Justice Center',
    type: 'legal_aid',
    address: '1000 Preston Ave, Suite A, Charlottesville, VA 22903',
    phone: '434-977-0553',
    email: 'lajcgen@justice4all.org',
    website: 'https://www.justice4all.org',
    servicesOffered: ['Civil legal aid', 'Housing', 'Family law', 'Public benefits'],
    eligibilityCriteria: 'Income at or below 125% of federal poverty guidelines',
    counties: ['Albemarle', 'Charlottesville', 'Fluvanna', 'Greene', 'Louisa', 'Nelson'],
    languages: ['English', 'Spanish'],
  },
  {
    id: '2',
    name: 'Virginia Legal Aid Society',
    type: 'legal_aid',
    address: 'Multiple offices across Virginia',
    phone: '866-534-5243',
    website: 'https://www.vlas.org',
    servicesOffered: ['Housing', 'Family law', 'Consumer', 'Public benefits', 'Healthcare'],
    eligibilityCriteria: 'Low-income individuals and families',
    counties: ['Multiple regions throughout Virginia'],
    languages: ['English', 'Spanish'],
  },
  {
    id: '3',
    name: 'Central Virginia Legal Aid Society',
    type: 'legal_aid',
    address: '101 W Broad St #101, Richmond, VA 23220',
    phone: '804-648-1012',
    website: 'https://www.cvlas.org',
    servicesOffered: ['Housing', 'Family law', 'Consumer protection', 'Elder law'],
    eligibilityCriteria: 'Income-based eligibility',
    counties: ['Richmond', 'Henrico', 'Chesterfield', 'Hanover'],
    languages: ['English', 'Spanish'],
  },
  {
    id: '4',
    name: 'Virginia Poverty Law Center',
    type: 'legal_aid',
    address: '919 E Main St #610, Richmond, VA 23219',
    phone: '804-782-9430',
    website: 'https://www.vplc.org',
    servicesOffered: ['Public benefits', 'Healthcare', 'Education', 'Employment'],
    eligibilityCriteria: 'Low-income Virginians',
    counties: ['Statewide'],
    languages: ['English'],
  },
];

// Virginia Courts
export const VIRGINIA_COURTS: Court[] = [
  {
    id: '1',
    name: 'Fairfax County Circuit Court',
    type: 'circuit',
    address: '4110 Chain Bridge Rd, Fairfax, VA 22030',
    phone: '703-246-2221',
    website: 'https://www.fairfaxcounty.gov/circuit',
    hours: 'Mon-Fri 8:00 AM - 4:00 PM',
    efilingAvailable: true,
    filingFees: [
      { type: 'Civil suit under $50,000', amount: 96, waiverAvailable: true },
      { type: 'Civil suit over $50,000', amount: 169, waiverAvailable: true },
    ],
    jurisdiction: ['Fairfax County'],
  },
  {
    id: '2',
    name: 'City of Richmond Circuit Court',
    type: 'circuit',
    address: '400 N 9th St, Richmond, VA 23219',
    phone: '804-646-6505',
    website: 'http://www.richmondcircuitcourt.org',
    hours: 'Mon-Fri 8:30 AM - 5:00 PM',
    efilingAvailable: true,
    filingFees: [
      { type: 'Civil suit', amount: 96, waiverAvailable: true },
    ],
    jurisdiction: ['City of Richmond'],
  },
];

// Document Templates
export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Motion for Continuance',
    category: TemplateCategory.MOTION,
    caseTypes: [CaseType.SMALL_CLAIMS, CaseType.TRAFFIC, CaseType.OTHER],
    content: `VIRGINIA: IN THE [COURT NAME]

[PLAINTIFF NAME]
    Plaintiff,
v.                           Case No.: [CASE NUMBER]
[DEFENDANT NAME]
    Defendant.

MOTION FOR CONTINUANCE

COMES NOW, [YOUR NAME], [Plaintiff/Defendant], and respectfully moves this Court for a continuance of the hearing/trial scheduled for [DATE] for the following reasons:

1. [STATE REASON FOR CONTINUANCE]

2. [ADDITIONAL REASONS IF APPLICABLE]

3. This motion is made in good faith and not for purposes of delay.

WHEREFORE, [Plaintiff/Defendant] respectfully requests that this Court grant this Motion for Continuance and reschedule the matter for a later date.

Respectfully submitted,

_______________________
[YOUR NAME]
[YOUR ADDRESS]
[YOUR PHONE]
[YOUR EMAIL]`,
    fields: [
      { name: 'courtName', label: 'Court Name', type: 'text', required: true },
      { name: 'plaintiffName', label: 'Plaintiff Name', type: 'text', required: true },
      { name: 'defendantName', label: 'Defendant Name', type: 'text', required: true },
      { name: 'caseNumber', label: 'Case Number', type: 'text', required: true },
      { name: 'scheduledDate', label: 'Currently Scheduled Date', type: 'date', required: true },
      { name: 'yourName', label: 'Your Name', type: 'text', required: true },
      { name: 'reason', label: 'Reason for Continuance', type: 'text', required: true },
    ],
    instructions: 'File this motion with the court clerk and serve a copy to the opposing party. Most courts require at least 7 days notice.',
  },
  {
    id: '2',
    name: 'Affidavit Template',
    category: TemplateCategory.AFFIDAVIT,
    caseTypes: [CaseType.SMALL_CLAIMS, CaseType.PERSONAL_INJURY, CaseType.OTHER],
    content: `AFFIDAVIT OF [YOUR NAME]

COMMONWEALTH OF VIRGINIA

[CITY/COUNTY]

I, [YOUR NAME], being first duly sworn, depose and state as follows:

1. My name is [YOUR NAME]. I am over the age of 18 and competent to testify to the matters contained herein.

2. [STATEMENT OF FACTS - PARAGRAPH 1]

3. [STATEMENT OF FACTS - PARAGRAPH 2]

4. [STATEMENT OF FACTS - PARAGRAPH 3]

5. I make this affidavit based upon my personal knowledge and belief.

6. I declare under penalty of perjury that the foregoing is true and correct.

Executed this ____ day of _____________, 20___.

_______________________
[YOUR NAME]

COMMONWEALTH OF VIRGINIA
[CITY/COUNTY], to-wit:

The foregoing instrument was acknowledged before me this ____ day of _____________, 20___, by [YOUR NAME].

_______________________
Notary Public

My Commission Expires: ___________`,
    fields: [
      { name: 'yourName', label: 'Your Full Name', type: 'text', required: true },
      { name: 'cityCounty', label: 'City or County', type: 'text', required: true },
      { name: 'facts', label: 'Statement of Facts', type: 'text', required: true },
    ],
    instructions: 'This affidavit must be notarized. Bring a valid ID to the notary. Do not sign until you are in front of the notary.',
  },
];

// Guided Workflows
export const WORKFLOWS: Workflow[] = [
  {
    id: '1',
    title: 'Filing a Small Claims Case',
    caseType: CaseType.SMALL_CLAIMS,
    estimatedTime: '2-4 hours',
    steps: [
      {
        id: 'step1',
        title: 'Determine if Small Claims is Appropriate',
        description: 'Small claims cases are for amounts up to $5,000 in Virginia General District Court.',
        completed: false,
        tips: [
          'Calculate your damages accurately',
          'Ensure the defendant is in Virginia or the incident occurred in Virginia',
          'Check the statute of limitations for your claim type',
        ],
        resources: [
          {
            title: 'Virginia Small Claims Limits',
            description: 'Information about small claims court jurisdictional limits',
            type: 'article',
          },
        ],
      },
      {
        id: 'step2',
        title: 'Gather Your Evidence',
        description: 'Collect all documents, photos, receipts, and other evidence supporting your claim.',
        completed: false,
        requiredDocuments: ['Receipts', 'Contracts', 'Photos of damage', 'Correspondence'],
        tips: [
          'Make copies of all documents',
          'Organize chronologically',
          'Label everything clearly',
        ],
      },
      {
        id: 'step3',
        title: 'Complete the Warrant in Debt Form',
        description: 'File a Warrant in Debt form at the General District Court clerk\'s office.',
        completed: false,
        tips: [
          'Use the defendant\'s full legal name and current address',
          'Describe your claim clearly and concisely',
          'State the exact amount you are owed',
        ],
      },
      {
        id: 'step4',
        title: 'Pay Filing Fee',
        description: 'Pay the filing fee (typically $30-$50) or request a fee waiver if you qualify.',
        completed: false,
        tips: [
          'Ask about fee waivers if you have low income',
          'Keep your receipt',
        ],
      },
      {
        id: 'step5',
        title: 'Serve the Defendant',
        description: 'The court will arrange for the sheriff to serve the defendant with notice of the lawsuit.',
        completed: false,
        tips: [
          'Verify the defendant\'s address is current',
          'Service typically takes 1-3 weeks',
        ],
      },
      {
        id: 'step6',
        title: 'Prepare for Court',
        description: 'Organize your evidence and prepare to present your case clearly and concisely.',
        completed: false,
        requiredDocuments: ['All evidence', 'Witness list', 'Timeline of events'],
        tips: [
          'Practice explaining your case in 5 minutes or less',
          'Bring 3 copies of all documents (judge, defendant, your copy)',
          'Arrive 30 minutes early',
          'Dress professionally',
        ],
      },
    ],
  },
];

// Legal Glossary
export const LEGAL_GLOSSARY = [
  {
    term: 'Affidavit',
    definition: 'A written statement confirmed by oath or affirmation, for use as evidence in court.',
  },
  {
    term: 'Complaint',
    definition: 'The initial pleading that starts a civil lawsuit, stating the facts and legal basis for the claim.',
  },
  {
    term: 'Continuance',
    definition: 'Postponement of a court hearing or trial to a later date.',
  },
  {
    term: 'Defendant',
    definition: 'The person being sued in a civil case or charged in a criminal case.',
  },
  {
    term: 'Discovery',
    definition: 'The pre-trial process where parties exchange information and evidence.',
  },
  {
    term: 'Motion',
    definition: 'A request filed with the court asking for a specific ruling or order.',
  },
  {
    term: 'Plaintiff',
    definition: 'The person who initiates a lawsuit by filing a complaint.',
  },
  {
    term: 'Service of Process',
    definition: 'The procedure by which a party to a lawsuit gives appropriate notice of initial legal action to another party.',
  },
  {
    term: 'Statute of Limitations',
    definition: 'The time limit within which a lawsuit must be filed.',
  },
  {
    term: 'Subpoena',
    definition: 'A court order requiring a person to appear in court or produce documents.',
  },
  {
    term: 'Venue',
    definition: 'The specific court location where a case should be filed and heard.',
  },
  {
    term: 'Warrant in Debt',
    definition: 'A legal document used to initiate a small claims case in Virginia for money owed.',
  },
];
