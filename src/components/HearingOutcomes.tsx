import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface HearingOutcome {
  id: string;
  hearingDate: Date;
  hearingType: string;
  judgePresiding?: string;
  motions: MotionOutcome[];
  orders: string[]; // Document IDs
  nextSteps: string[];
  appealDeadline?: Date;
  notes: string;
}

interface MotionOutcome {
  id: string;
  motion: string;
  result: 'granted' | 'denied' | 'granted-in-part' | 'continued';
  notes: string;
}

interface HearingOutcomesProps {
  caseId: string;
  onSave?: (outcomes: HearingOutcome[]) => void;
}

export const HearingOutcomes: React.FC<HearingOutcomesProps> = ({
  caseId,
  onSave,
}) => {
  const [outcomes, setOutcomes] = useState<HearingOutcome[]>([]);
  const [expandedOutcome, setExpandedOutcome] = useState<string | null>(null);

  const getResultBadgeStyle = (result: MotionOutcome['result']) => {
    switch (result) {
      case 'granted':
        return styles.resultGranted;
      case 'denied':
        return styles.resultDenied;
      case 'granted-in-part':
        return styles.resultPartial;
      case 'continued':
        return styles.resultContinued;
    }
  };

  const getResultLabel = (result: MotionOutcome['result']): string => {
    const labels = {
      'granted': 'Granted',
      'denied': 'Denied',
      'granted-in-part': 'Granted in Part',
      'continued': 'Continued',
    };
    return labels[result];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Tracking Hearing Outcomes</Text>
        <Text style={styles.educationText}>
          This tool helps you track what happened at court hearings and what decisions the judge made. 
          Keeping clear records can help you remember next steps and deadlines.
        </Text>
        <Text style={styles.warningText}>
          If the judge set new deadlines or ordered you to do something, note those carefully. 
          Court orders are legally binding and usually must be followed.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {/* Open add modal */}}
        accessibilityLabel="Add hearing outcome"
        accessibilityRole="button"
      >
        <Text style={styles.addButtonText}>+ Add Hearing Outcome</Text>
      </TouchableOpacity>

      {outcomes.map(outcome => (
        <View key={outcome.id} style={styles.outcomeCard}>
          <TouchableOpacity
            onPress={() => setExpandedOutcome(expandedOutcome === outcome.id ? null : outcome.id)}
            accessibilityRole="button"
          >
            <View style={styles.outcomeHeader}>
              <View>
                <Text style={styles.outcomeDate}>
                  {new Date(outcome.hearingDate).toLocaleDateString()}
                </Text>
                <Text style={styles.outcomeType}>{outcome.hearingType}</Text>
              </View>
              <Text style={styles.expandIcon}>
                {expandedOutcome === outcome.id ? '−' : '+'}
              </Text>
            </View>
          </TouchableOpacity>

          {expandedOutcome === outcome.id && (
            <View style={styles.outcomeDetails}>
              {outcome.judgePresiding && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Judge:</Text>
                  <Text style={styles.detailValue}>{outcome.judgePresiding}</Text>
                </View>
              )}

              {outcome.motions.length > 0 && (
                <View style={styles.motionsSection}>
                  <Text style={styles.subsectionTitle}>Motions Decided</Text>
                  {outcome.motions.map(motion => (
                    <View key={motion.id} style={styles.motionCard}>
                      <View style={styles.motionHeader}>
                        <Text style={styles.motionName}>{motion.motion}</Text>
                        <View style={[styles.resultBadge, getResultBadgeStyle(motion.result)]}>
                          <Text style={styles.resultText}>{getResultLabel(motion.result)}</Text>
                        </View>
                      </View>
                      {motion.notes && (
                        <Text style={styles.motionNotes}>{motion.notes}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {outcome.nextSteps.length > 0 && (
                <View style={styles.nextStepsSection}>
                  <Text style={styles.subsectionTitle}>Next Steps</Text>
                  {outcome.nextSteps.map((step, index) => (
                    <Text key={index} style={styles.nextStepItem}>• {step}</Text>
                  ))}
                </View>
              )}

              {outcome.appealDeadline && (
                <View style={styles.appealCard}>
                  <Text style={styles.appealTitle}>Appeal Period</Text>
                  <Text style={styles.appealText}>
                    Deadline: {new Date(outcome.appealDeadline).toLocaleDateString()}
                  </Text>
                  <Text style={styles.appealNote}>
                    This is typically the last date to file a notice of appeal. Check your state's 
                    rules for specific requirements.
                  </Text>
                </View>
              )}

              {outcome.notes && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Additional Notes:</Text>
                  <Text style={styles.detailValue}>{outcome.notes}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      ))}

      {outcomes.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No hearing outcomes recorded yet. After a court hearing, tap the button above to record 
            what happened and any orders the judge made.
          </Text>
        </View>
      )}

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Tips for Recording Outcomes</Text>
        <Text style={styles.tipText}>
          • Take notes during the hearing about what the judge says
        </Text>
        <Text style={styles.tipText}>
          • Get a copy of any written orders from the clerk
        </Text>
        <Text style={styles.tipText}>
          • Ask the clerk if you're unsure about what was ordered
        </Text>
        <Text style={styles.tipText}>
          • Note any new deadlines the judge mentions
        </Text>
        <Text style={styles.tipText}>
          • Keep track of what you're required to do next
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
  outcomeCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    padding: ellioLawTokens.spacing.md,
  },
  outcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outcomeDate: {
    fontSize: 18,
    fontWeight: '700',
    color: ellioLawTokens.color.text.primary,
  },
  outcomeType: {
    fontSize: 14,
    color: ellioLawTokens.color.text.tertiary,
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: '300',
    color: ellioLawTokens.color.caseActive,
  },
  outcomeDetails: {
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
    lineHeight: 22,
    color: ellioLawTokens.color.text.primary,
  },
  motionsSection: {
    marginBottom: ellioLawTokens.spacing.md,
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  motionCard: {
    backgroundColor: ellioLawTokens.color.background.primary,
    padding: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.sm,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  motionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ellioLawTokens.spacing.xs,
  },
  motionName: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    flex: 1,
    marginRight: ellioLawTokens.spacing.sm,
  },
  resultBadge: {
    paddingHorizontal: ellioLawTokens.spacing.sm,
    paddingVertical: 4,
    borderRadius: ellioLawTokens.radius.sm,
  },
  resultGranted: {
    backgroundColor: ellioLawTokens.color.caseSettled + '20',
  },
  resultDenied: {
    backgroundColor: ellioLawTokens.color.deadlineUrgent + '20',
  },
  resultPartial: {
    backgroundColor: ellioLawTokens.color.caseActive + '20',
  },
  resultContinued: {
    backgroundColor: ellioLawTokens.color.courtNeutral,
  },
  resultText: {
    fontSize: 12,
    fontWeight: '600',
  },
  motionNotes: {
    fontSize: 13,
    color: ellioLawTokens.color.text.secondary,
    lineHeight: 20,
  },
  nextStepsSection: {
    marginBottom: ellioLawTokens.spacing.md,
  },
  nextStepItem: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  appealCard: {
    backgroundColor: ellioLawTokens.color.educationalHighlight + '10',
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    marginBottom: ellioLawTokens.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.educationalHighlight,
  },
  appealTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  appealText: {
    fontSize: 14,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  appealNote: {
    fontSize: 13,
    color: ellioLawTokens.color.text.tertiary,
    fontStyle: 'italic',
    lineHeight: 20,
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
    marginBottom: ellioLawTokens.spacing.sm,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
});
