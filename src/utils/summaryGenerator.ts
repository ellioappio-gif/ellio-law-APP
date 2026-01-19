import { CaseInfo, TimelineEvent, Document } from '../types';

/**
 * Generate a comprehensive case summary from documents, timeline, and other case data
 */
export const generateCaseSummary = (caseInfo: CaseInfo): string => {
  const timeline = caseInfo.timeline || [];
  const allDocuments: Document[] = caseInfo.folders.flatMap(f => f.documents);
  const witnesses = caseInfo.witnesses || [];
  const expenses = caseInfo.expenses || [];
  
  let summary = `CASE SUMMARY\n`;
  summary += `Case Name: ${caseInfo.name}\n`;
  if (caseInfo.caseNumber) {
    summary += `Case Number: ${caseInfo.caseNumber}\n`;
  }
  summary += `Created: ${caseInfo.createdDate.toLocaleDateString()}\n`;
  if (caseInfo.caseType) {
    summary += `Type: ${caseInfo.caseType}\n`;
  }
  summary += `\n`;

  // Timeline Summary
  if (timeline.length > 0) {
    summary += `TIMELINE OF EVENTS\n`;
    summary += `─────────────────\n`;
    const sortedTimeline = [...timeline].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    sortedTimeline.forEach(event => {
      summary += `${new Date(event.date).toLocaleDateString()}: ${event.title}\n`;
      if (event.description) {
        summary += `  ${event.description}\n`;
      }
    });
    summary += `\n`;
  }

  // Documents Summary
  if (allDocuments.length > 0) {
    summary += `DOCUMENTS (${allDocuments.length} total)\n`;
    summary += `─────────────────\n`;
    const docsByCategory: Record<string, number> = {};
    allDocuments.forEach(doc => {
      docsByCategory[doc.category] = (docsByCategory[doc.category] || 0) + 1;
    });
    Object.entries(docsByCategory).forEach(([category, count]) => {
      summary += `${category}: ${count} document${count !== 1 ? 's' : ''}\n`;
    });
    summary += `\n`;
  }

  // Witnesses Summary
  if (witnesses.length > 0) {
    summary += `WITNESSES (${witnesses.length})\n`;
    summary += `─────────────────\n`;
    witnesses.forEach(witness => {
      summary += `${witness.name}`;
      if (witness.relationship) {
        summary += ` (${witness.relationship})`;
      }
      summary += `\n`;
      if (witness.contactInfo.phone) {
        summary += `  Phone: ${witness.contactInfo.phone}\n`;
      }
    });
    summary += `\n`;
  }

  // Expenses Summary
  if (expenses.length > 0) {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    summary += `EXPENSES\n`;
    summary += `─────────────────\n`;
    summary += `Total: $${totalExpenses.toFixed(2)}\n`;
    const reimbursable = expenses.filter(e => e.reimbursable)
      .reduce((sum, e) => sum + e.amount, 0);
    summary += `Reimbursable: $${reimbursable.toFixed(2)}\n`;
    summary += `\n`;
  }

  summary += `\n`;
  summary += `Generated: ${new Date().toLocaleString()}\n`;
  
  return summary;
};

/**
 * Export case summary with all details for attorney review
 */
export const generateDetailedCaseSummary = (caseInfo: CaseInfo): string => {
  let summary = generateCaseSummary(caseInfo);
  
  // Add detailed document list
  const allDocuments = caseInfo.folders.flatMap(f => f.documents);
  if (allDocuments.length > 0) {
    summary += `\nDETAILED DOCUMENT LIST\n`;
    summary += `══════════════════════\n\n`;
    
    caseInfo.folders.forEach(folder => {
      if (folder.documents.length > 0) {
        summary += `${folder.name} (${folder.category})\n`;
        summary += `${'─'.repeat(40)}\n`;
        folder.documents
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .forEach(doc => {
            summary += `${new Date(doc.date).toLocaleDateString()}: ${doc.name}\n`;
            if (doc.description) {
              summary += `  ${doc.description}\n`;
            }
          });
        summary += `\n`;
      }
    });
  }

  return summary;
};
