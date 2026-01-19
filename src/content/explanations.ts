/**
 * ellio-law Explanation System
 * 
 * Centralized content for tooltips, explanations, and educational disclosures.
 * 
 * Principles:
 * - Educational, never directive
 * - Calm, never urgent
 * - Transparent about limitations
 * - One concept per explanation
 * - Progressive disclosure only
 */

export interface Explanation {
  id: string;
  title: string;
  body: string;
  footnote?: string;
  learnMoreAction?: {
    label: string;
    route: string;
  };
}

export const LegalExplanations: Record<string, Explanation> = {
  // Court system
  'court-levels': {
    id: 'court-levels',
    title: 'Court levels',
    body: 'Most states have multiple court levels. Lower courts typically handle smaller disputes and initial hearings. Higher courts review decisions when someone disagrees with an outcome.',
    footnote: 'Court structures vary by state. This is general information.',
  },
  
  'jurisdiction': {
    id: 'jurisdiction',
    title: 'Jurisdiction',
    body: 'This usually means which court has authority to hear a case. It can depend on where something happened, where people live, or the type of legal issue.',
    footnote: 'Jurisdiction rules vary. This is informational only.',
  },
  
  'small-claims': {
    id: 'small-claims',
    title: 'Small claims court',
    body: 'Small claims courts handle disputes involving smaller amounts of money. Many states allow people to represent themselves here. Procedures are usually simpler than other courts.',
    footnote: 'Dollar limits and rules vary by state.',
  },
  
  'circuit-court': {
    id: 'circuit-court',
    title: 'Circuit court',
    body: 'In many states, circuit courts handle larger civil cases, family matters, and some criminal cases. The name and role can vary by state.',
    footnote: 'Court names and structures differ across states.',
  },
  
  // Filing process
  'filing-a-case': {
    id: 'filing-a-case',
    title: 'Filing a case',
    body: 'This usually means submitting paperwork to a court to start a legal process. Most courts require specific forms, a filing fee, and copies for other parties.',
    footnote: 'Requirements vary by court and case type.',
  },
  
  'filing-fee': {
    id: 'filing-fee',
    title: 'Filing fees',
    body: 'Most courts charge a fee when you file paperwork. Fees vary by court and case type. Many courts offer fee waivers for people with limited income.',
    footnote: 'Fee amounts and waiver requirements vary by jurisdiction.',
  },
  
  'fee-waiver': {
    id: 'fee-waiver',
    title: 'Fee waiver',
    body: 'A fee waiver allows someone to file without paying court fees. Courts usually require proof of income or financial hardship. You can ask for a waiver when you file.',
    footnote: 'Eligibility requirements vary by court.',
  },
  
  'service-of-process': {
    id: 'service-of-process',
    title: 'Service of process',
    body: 'This means officially delivering legal documents to someone. Courts require proof that the other party received notice. Methods can include certified mail, sheriff delivery, or professional process servers.',
    footnote: 'Service requirements vary by state and case type.',
  },
  
  // Case statuses
  'case-status-filed': {
    id: 'case-status-filed',
    title: 'Filed',
    body: 'This usually means the court has received and accepted your paperwork. It doesn\'t mean the court has made any decisions yet.',
  },
  
  'case-status-pending': {
    id: 'case-status-pending',
    title: 'Pending',
    body: 'This usually means the case is open and waiting for the next step. It could be waiting for a hearing, a response, or a decision.',
  },
  
  'case-status-closed': {
    id: 'case-status-closed',
    title: 'Closed',
    body: 'This usually means the court has finished with the case. It could be resolved, dismissed, or completed in some way.',
  },
  
  // Deadlines
  'court-deadlines': {
    id: 'court-deadlines',
    title: 'Court deadlines',
    body: 'Courts set deadlines for filing paperwork and completing steps. Missing a deadline can affect your case. If you need more time, you can usually ask the court for an extension before the deadline passes.',
    footnote: 'Deadline rules vary by court and case type. This is general information.',
  },
  
  'statute-of-limitations': {
    id: 'statute-of-limitations',
    title: 'Statute of limitations',
    body: 'This is a time limit for starting certain types of cases. The length varies by case type and state. Once this time passes, you usually cannot file that type of case.',
    footnote: 'Time limits vary significantly. Consult legal resources for specifics.',
  },
  
  // Documents
  'complaint': {
    id: 'complaint',
    title: 'Complaint',
    body: 'A complaint is a document that starts a civil case. It explains what happened, who is involved, and what you are asking for.',
    footnote: 'Format requirements vary by court.',
  },
  
  'petition': {
    id: 'petition',
    title: 'Petition',
    body: 'A petition is a formal request to a court. It can start a case or ask for a specific court action. The term is used in many types of cases.',
    footnote: 'Petition requirements vary by case type.',
  },
  
  'motion': {
    id: 'motion',
    title: 'Motion',
    body: 'A motion is a request asking the court to make a decision or take action. Common motions ask for more time, dismiss a case, or compel someone to do something.',
    footnote: 'Motion rules and procedures vary by jurisdiction.',
  },
  
  'evidence': {
    id: 'evidence',
    title: 'Evidence',
    body: 'Evidence is information presented to support your side. It can include documents, photos, videos, witness statements, or physical items. Courts have rules about what evidence is allowed.',
    footnote: 'Evidence rules vary by court and case type.',
  },
  
  // Legal help
  'legal-aid': {
    id: 'legal-aid',
    title: 'Legal aid',
    body: 'Legal aid organizations provide free or low-cost legal help to people who qualify. They often focus on specific issue types like housing, family law, or consumer cases.',
    footnote: 'Availability and eligibility vary by location and organization.',
  },
  
  'pro-bono': {
    id: 'pro-bono',
    title: 'Pro bono',
    body: 'Pro bono means free legal work. Some lawyers volunteer their time to help people who cannot afford representation. Availability varies by area and case type.',
    footnote: 'Pro bono programs vary by jurisdiction and legal issue.',
  },
  
  'self-representation': {
    id: 'self-representation',
    title: 'Self-representation',
    body: 'You have the right to represent yourself in most courts. This means handling your case without a lawyer. Courts may have resources for self-represented people, though they cannot give legal advice.',
    footnote: 'Court assistance varies. This is general information only.',
  },
  
  // ellio-law limitations
  'ellio-law-scope': {
    id: 'ellio-law-scope',
    title: 'What ellio-law does',
    body: 'ellio-law helps you organize legal documents, understand court processes, and find legal resources. It provides educational information, not legal advice.',
    footnote: 'ellio-law does not make legal recommendations or predict outcomes.',
  },
  
  'not-legal-advice': {
    id: 'not-legal-advice',
    title: 'Not legal advice',
    body: 'ellio-law provides general educational information. It does not analyze your specific situation or tell you what to do. For advice about your case, consult a lawyer or legal aid organization.',
  },
  
  'state-variations': {
    id: 'state-variations',
    title: 'State variations',
    body: 'Laws and court procedures vary significantly between states. Information in ellio-law is general. Always verify details with your local court or legal resource.',
  },
  
  // Timeline and organization
  'timeline': {
    id: 'timeline',
    title: 'Timeline',
    body: 'A timeline helps you organize events in order. It can make it easier to explain what happened and when. You can attach documents to timeline events.',
  },
  
  'document-organization': {
    id: 'document-organization',
    title: 'Document organization',
    body: 'Organizing documents by category makes them easier to find. Common categories include court filings, evidence, correspondence, and financial records.',
  },
  
  'witness-information': {
    id: 'witness-information',
    title: 'Witness information',
    body: 'A witness is someone who saw or knows something relevant to your case. Keeping track of witnesses and their contact information can help if you need them later.',
    footnote: 'Witness rules vary by court and case type.',
  },
  
  'expense-tracking': {
    id: 'expense-tracking',
    title: 'Expense tracking',
    body: 'Some legal expenses may be reimbursable depending on your case type and outcome. Tracking expenses with receipts creates a record if needed.',
    footnote: 'Reimbursement rules vary by case type and jurisdiction.',
  },
};

/**
 * Get explanation by ID
 */
export function getExplanation(id: string): Explanation | undefined {
  return LegalExplanations[id];
}

/**
 * Get explanations by category
 */
export function getExplanationsByCategory(category: string): Explanation[] {
  const categories: Record<string, string[]> = {
    courts: ['court-levels', 'jurisdiction', 'small-claims', 'circuit-court'],
    filing: ['filing-a-case', 'filing-fee', 'fee-waiver', 'service-of-process'],
    status: ['case-status-filed', 'case-status-pending', 'case-status-closed'],
    deadlines: ['court-deadlines', 'statute-of-limitations'],
    documents: ['complaint', 'petition', 'motion', 'evidence'],
    help: ['legal-aid', 'pro-bono', 'self-representation'],
    app: ['ellio-law-scope', 'not-legal-advice', 'state-variations'],
    organization: ['timeline', 'document-organization', 'witness-information', 'expense-tracking'],
  };
  
  const ids = categories[category] || [];
  return ids.map(id => LegalExplanations[id]).filter(Boolean);
}
