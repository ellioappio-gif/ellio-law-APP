import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

export const AppealGuideScreen: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const appealInfo = [
    {
      id: 'what-is',
      title: 'What is an Appeal?',
      content: [
        'An appeal asks a higher court to review whether the lower court made a legal mistake.',
        'Appeals usually focus on whether the judge applied the law correctly, not on re-examining facts.',
        'The appeals court typically reviews only what's in the written record from your trial.',
      ],
    },
    {
      id: 'deadlines',
      title: 'Critical Deadlines',
      content: [
        'Notice of Appeal: Usually 30 days from the final judgment in civil cases',
        'Criminal appeals may have different deadlines',
        'Missing the deadline usually means you lose the right to appeal',
        'These are strict deadlines - courts rarely allow extensions',
      ],
    },
    {
      id: 'process',
      title: 'The Appeal Process',
      content: [
        '1. File Notice of Appeal within deadline',
        '2. Order and pay for transcript of trial proceedings',
        '3. File written brief explaining legal errors',
        '4. Other side files response brief',
        '5. Court may schedule oral argument',
        '6. Court issues written decision',
      ],
    },
    {
      id: 'costs',
      title: 'Costs to Consider',
      content: [
        'Filing fees for the appeal',
        'Cost of trial transcript (can be expensive)',
        'Printing and copying costs for briefs',
        'Time required to research and write briefs',
        'Appeals can take many months or years',
      ],
    },
    {
      id: 'grounds',
      title: 'Common Grounds for Appeal',
      content: [
        'Judge made error in applying the law',
        'Jury instructions were incorrect',
        'Evidence was improperly admitted or excluded',
        'Verdict was not supported by evidence',
        'Note: Disagreeing with the outcome is not enough',
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Understanding Appeals</Text>
        <Text style={styles.educationText}>
          Appeals are complex legal proceedings with strict rules and short deadlines. 
          This guide provides basic information, but most people benefit from an attorney for appeals.
        </Text>
        <Text style={styles.warningText}>
          If you're considering an appeal, consult with an attorney as soon as possible. 
          Missing appeal deadlines can permanently affect your rights.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appeal Information</Text>
        {appealInfo.map(section => {
          const isExpanded = expandedSection === section.id;
          return (
            <View key={section.id} style={styles.infoCard}>
              <TouchableOpacity
                style={styles.infoHeader}
                onPress={() => setExpandedSection(isExpanded ? null : section.id)}
              >
                <Text style={styles.infoTitle}>{section.title}</Text>
                <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
              </TouchableOpacity>
              {isExpanded && (
                <View style={styles.infoContent}>
                  {section.content.map((text, idx) => (
                    <Text key={idx} style={styles.infoText}>
                      {text.startsWith('• ') || text.match(/^\d\./) ? text : `• ${text}`}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.warningCard}>
        <Text style={styles.warningCardTitle}>Important Considerations</Text>
        <Text style={styles.warningCardText}>
          • Appeals are expensive and time-consuming
        </Text>
        <Text style={styles.warningCardText}>
          • You might have to pay the other side's costs if you lose
        </Text>
        <Text style={styles.warningCardText}>
          • The appeals court might make the judgment worse
        </Text>
        <Text style={styles.warningCardText}>
          • Most appeals are unsuccessful
        </Text>
        <Text style={styles.warningCardText}>
          • During the appeal, the judgment may still be enforced unless you get a "stay"
        </Text>
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Next Steps</Text>
        <Text style={styles.tipText}>
          If you're thinking about an appeal, contact an attorney immediately. Many bar associations 
          offer free consultations to review whether you have grounds for appeal.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ellioLawTokens.color.background.primary },
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
  educationTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.xs },
  educationText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.secondary, marginBottom: ellioLawTokens.spacing.sm },
  warningText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.deadlineUrgent, fontWeight: '500' },
  section: { marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.sm },
  infoCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderRadius: ellioLawTokens.radius.md,
    marginBottom: ellioLawTokens.spacing.sm,
    overflow: 'hidden',
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ellioLawTokens.spacing.md,
  },
  infoTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, flex: 1 },
  expandIcon: { fontSize: 24, fontWeight: '300', color: ellioLawTokens.color.caseActive, marginLeft: ellioLawTokens.spacing.sm },
  infoContent: { paddingHorizontal: ellioLawTokens.spacing.md, paddingBottom: ellioLawTokens.spacing.md },
  infoText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.xs },
  warningCard: {
    backgroundColor: ellioLawTokens.color.deadlineUrgent + '10',
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.deadlineUrgent,
  },
  warningCardTitle: { fontSize: 16, fontWeight: '700', color: ellioLawTokens.color.deadlineUrgent, marginBottom: ellioLawTokens.spacing.sm },
  warningCardText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.xs },
  tipsCard: {
    backgroundColor: ellioLawTokens.color.educationalHighlight + '10',
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.xl,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.educationalHighlight,
  },
  tipsTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.sm },
  tipText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.secondary },
});
