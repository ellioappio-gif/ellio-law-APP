import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface EvidenceItem {
  id: string;
  name: string;
  type: 'photo' | 'document' | 'physical' | 'testimonial' | 'electronic';
  dateAcquired: Date;
  relevantClaims: string[];
  supportedFacts: string[];
  chainOfCustody: ChainOfCustodyEntry[];
  location?: string;
  admissibilityNotes?: string;
  documentIds: string[];
}

interface ChainOfCustodyEntry {
  id: string;
  date: Date;
  who: string;
  action: string;
  notes: string;
}

interface EvidenceOrganizerProps {
  caseId: string;
  onSave?: (evidence: EvidenceItem[]) => void;
}

export const EvidenceOrganizer: React.FC<EvidenceOrganizerProps> = ({
  caseId,
  onSave,
}) => {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [filterType, setFilterType] = useState<'all' | EvidenceItem['type']>('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const getTypeIcon = (type: EvidenceItem['type']): string => {
    const icons = {
      'photo': 'Photo',
      'document': 'Doc',
      'physical': 'Item',
      'testimonial': 'Testimony',
      'electronic': 'File',
    };
    return icons[type];
  };

  const getTypeLabel = (type: EvidenceItem['type']): string => {
    const labels = {
      'photo': 'Photo/Video',
      'document': 'Document',
      'physical': 'Physical Evidence',
      'testimonial': 'Testimonial Evidence',
      'electronic': 'Electronic Evidence',
    };
    return labels[type];
  };

  const filteredEvidence = filterType === 'all'
    ? evidence
    : evidence.filter(item => item.type === filterType);

  const types: Array<'all' | EvidenceItem['type']> = ['all', 'photo', 'document', 'physical', 'testimonial', 'electronic'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Organizing Evidence</Text>
        <Text style={styles.educationText}>
          This tool helps you keep track of evidence and what facts each piece supports. 
          Organization can help when preparing for hearings or explaining your case.
        </Text>
        <Text style={styles.warningText}>
          This is for organization only. It does not determine what evidence is admissible in court 
          or what evidence you should use. Courts have specific rules about evidence. Consider 
          consulting an attorney about evidence strategy.
        </Text>
      </View>

      {/* Type Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filter by Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {types.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterChip,
                filterType === type && styles.filterChipActive,
              ]}
              onPress={() => setFilterType(type)}
              accessibilityLabel={`Filter by ${type}`}
              accessibilityRole="button"
            >
              <Text style={[
                styles.filterChipText,
                filterType === type && styles.filterChipTextActive,
              ]}>
                {type === 'all' ? 'All Evidence' : getTypeLabel(type as EvidenceItem['type'])}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Summary Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{evidence.length}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {new Set(evidence.flatMap(e => e.relevantClaims)).size}
          </Text>
          <Text style={styles.statLabel}>Claims</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {new Set(evidence.flatMap(e => e.supportedFacts)).size}
          </Text>
          <Text style={styles.statLabel}>Facts</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {/* Open add modal */}}
        accessibilityLabel="Add evidence item"
        accessibilityRole="button"
      >
        <Text style={styles.addButtonText}>+ Add Evidence Item</Text>
      </TouchableOpacity>

      {/* Evidence List */}
      {filteredEvidence.map(item => (
        <View key={item.id} style={styles.evidenceCard}>
          <TouchableOpacity
            onPress={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
            accessibilityRole="button"
          >
            <View style={styles.evidenceHeader}>
              <View style={styles.evidenceHeaderLeft}>
                <Text style={styles.typeIcon}>{getTypeIcon(item.type)}</Text>
                <View style={styles.evidenceTitleContainer}>
                  <Text style={styles.evidenceName}>{item.name}</Text>
                  <Text style={styles.evidenceType}>{getTypeLabel(item.type)}</Text>
                </View>
              </View>
              <Text style={styles.expandIcon}>
                {expandedItem === item.id ? '−' : '+'}
              </Text>
            </View>
          </TouchableOpacity>

          {expandedItem === item.id && (
            <View style={styles.evidenceDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date Acquired:</Text>
                <Text style={styles.detailValue}>
                  {new Date(item.dateAcquired).toLocaleDateString()}
                </Text>
              </View>

              {item.location && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Current Location:</Text>
                  <Text style={styles.detailValue}>{item.location}</Text>
                </View>
              )}

              {item.relevantClaims.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Relevant to Claims:</Text>
                  {item.relevantClaims.map((claim, index) => (
                    <View key={index} style={styles.tagChip}>
                      <Text style={styles.tagText}>{claim}</Text>
                    </View>
                  ))}
                </View>
              )}

              {item.supportedFacts.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Supports Facts:</Text>
                  {item.supportedFacts.map((fact, index) => (
                    <Text key={index} style={styles.factItem}>• {fact}</Text>
                  ))}
                </View>
              )}

              {item.chainOfCustody.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Chain of Custody:</Text>
                  {item.chainOfCustody.map(entry => (
                    <View key={entry.id} style={styles.custodyEntry}>
                      <Text style={styles.custodyDate}>
                        {new Date(entry.date).toLocaleDateString()}
                      </Text>
                      <Text style={styles.custodyAction}>
                        {entry.who}: {entry.action}
                      </Text>
                      {entry.notes && (
                        <Text style={styles.custodyNotes}>{entry.notes}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {item.admissibilityNotes && (
                <View style={styles.admissibilityCard}>
                  <Text style={styles.admissibilityTitle}>Admissibility Notes</Text>
                  <Text style={styles.admissibilityText}>{item.admissibilityNotes}</Text>
                  <Text style={styles.admissibilityDisclaimer}>
                    Note: These are personal notes. Courts have specific rules about what evidence 
                    can be admitted. Check with your court or an attorney.
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      ))}

      {filteredEvidence.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {filterType === 'all'
              ? 'No evidence items yet. Tap the button above to add one.'
              : `No ${getTypeLabel(filterType as EvidenceItem['type']).toLowerCase()} evidence items.`
            }
          </Text>
        </View>
      )}

      {/* Educational Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>About Evidence Organization</Text>
        <Text style={styles.tipText}>
          <Text style={styles.tipBold}>Chain of Custody</Text> tracks who had the evidence and when. 
          This can matter for certain types of evidence, especially physical items or documents.
        </Text>
        <Text style={styles.tipText}>
          <Text style={styles.tipBold}>Relevance</Text> means the evidence relates to facts that 
          matter in your case. Tagging evidence by claim helps you see what supports what.
        </Text>
        <Text style={styles.tipText}>
          <Text style={styles.tipBold}>Admissibility</Text> is whether the court will allow the 
          evidence. Rules vary by court and case type. Original documents are often preferred over copies.
        </Text>
        <Text style={styles.tipNote}>
          This tool helps with organization but does not determine legal strategy or what evidence 
          to use. Those decisions involve legal judgment.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ellioLawTokens.color.background.primary,
  },
  educationCard: {
    backgroundColor: ellioLawTokens.color.disclaimerBackground,
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginTop: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.educationalHighlight,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  educationText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.deadlineUrgent,
    fontWeight: '500',
  },
  filterSection: {
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: ellioLawTokens.spacing.md,
    paddingVertical: ellioLawTokens.spacing.sm,
    marginRight: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.full,
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderWidth: 1,
    borderColor: ellioLawTokens.color.courtNeutral,
  },
  filterChipActive: {
    backgroundColor: ellioLawTokens.color.caseActive,
    borderColor: ellioLawTokens.color.caseActive,
  },
  filterChipText: {
    fontSize: 14,
    color: ellioLawTokens.color.text.secondary,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
    gap: ellioLawTokens.spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: ellioLawTokens.color.caseActive,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: ellioLawTokens.color.text.tertiary,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: ellioLawTokens.color.caseActive,
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  evidenceCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    padding: ellioLawTokens.spacing.md,
  },
  evidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  evidenceHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    fontSize: 32,
    marginRight: ellioLawTokens.spacing.sm,
  },
  evidenceTitleContainer: {
    flex: 1,
  },
  evidenceName: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
  },
  evidenceType: {
    fontSize: 13,
    color: ellioLawTokens.color.text.tertiary,
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: '300',
    color: ellioLawTokens.color.caseActive,
  },
  evidenceDetails: {
    marginTop: ellioLawTokens.spacing.md,
    paddingTop: ellioLawTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: ellioLawTokens.color.courtNeutral,
  },
  detailRow: {
    marginBottom: ellioLawTokens.spacing.sm,
  },
  detailLabel: {
    fontSize: 13,
    color: ellioLawTokens.color.text.tertiary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: ellioLawTokens.color.text.primary,
  },
  section: {
    marginBottom: ellioLawTokens.spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  tagChip: {
    backgroundColor: ellioLawTokens.color.caseActive + '20',
    paddingHorizontal: ellioLawTokens.spacing.sm,
    paddingVertical: 4,
    borderRadius: ellioLawTokens.radius.sm,
    alignSelf: 'flex-start',
    marginBottom: ellioLawTokens.spacing.xs,
  },
  tagText: {
    fontSize: 13,
    color: ellioLawTokens.color.caseActive,
    fontWeight: '600',
  },
  factItem: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  custodyEntry: {
    backgroundColor: ellioLawTokens.color.background.primary,
    padding: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.sm,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  custodyDate: {
    fontSize: 13,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: 2,
  },
  custodyAction: {
    fontSize: 14,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  custodyNotes: {
    fontSize: 13,
    color: ellioLawTokens.color.text.tertiary,
    fontStyle: 'italic',
  },
  admissibilityCard: {
    backgroundColor: ellioLawTokens.color.educationalHighlight + '10',
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.educationalHighlight,
  },
  admissibilityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  admissibilityText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  admissibilityDisclaimer: {
    fontSize: 13,
    lineHeight: 20,
    color: ellioLawTokens.color.text.tertiary,
    fontStyle: 'italic',
  },
  emptyState: {
    padding: ellioLawTokens.spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 15,
    color: ellioLawTokens.color.text.tertiary,
    textAlign: 'center',
    lineHeight: 22,
  },
  tipsCard: {
    backgroundColor: ellioLawTokens.color.educationalHighlight + '10',
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.xl,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.educationalHighlight,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.md,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  tipBold: {
    fontWeight: '600',
  },
  tipNote: {
    fontSize: 13,
    lineHeight: 20,
    color: ellioLawTokens.color.text.tertiary,
    fontStyle: 'italic',
    marginTop: ellioLawTokens.spacing.xs,
  },
});
