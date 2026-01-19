import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

export const LegalResearchScreen: React.FC = () => {
  const resources = [
    {
      category: 'Virginia Law',
      items: [
        {
          title: 'Virginia Code',
          description: 'Complete Virginia state laws',
          url: 'https://law.lis.virginia.gov/vacode',
        },
        {
          title: 'Virginia Court Decisions',
          description: 'Published Virginia court opinions',
          url: 'https://www.vacourts.gov',
        },
      ],
    },
    {
      category: 'Court Information',
      items: [
        {
          title: 'Virginia Courts Website',
          description: 'Official information about Virginia courts',
          url: 'https://www.vacourts.gov',
        },
        {
          title: 'Virginia Court Rules',
          description: 'Procedural rules for Virginia courts',
          url: 'https://www.vacourts.gov',
        },
      ],
    },
    {
      category: 'Self-Help Resources',
      items: [
        {
          title: 'Virginia Legal Aid',
          description: 'Free legal information and resources',
          url: 'https://www.valegalaid.org',
        },
        {
          title: 'Virginia State Bar',
          description: 'Lawyer referral and legal resources',
          url: 'https://www.vsb.org',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Legal Research Resources</Text>
        <Text style={styles.educationText}>
          These are official Virginia legal resources. They can help you understand laws 
          and court procedures, but legal research can be complex.
        </Text>
        <Text style={styles.warningText}>
          Reading laws and court decisions does not replace legal advice. If you're unsure 
          how a law applies to your situation, consider consulting with an attorney.
        </Text>
      </View>

      {resources.map((section, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.category}</Text>
          {section.items.map((item, itemIdx) => (
            <TouchableOpacity
              key={itemIdx}
              style={styles.resourceCard}
              onPress={() => Linking.openURL(item.url)}
            >
              <Text style={styles.resourceTitle}>{item.title}</Text>
              <Text style={styles.resourceDescription}>{item.description}</Text>
              <Text style={styles.resourceLink}>Visit →</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Research Tips</Text>
        <Text style={styles.tipText}>• Start with basic information before diving into statutes</Text>
        <Text style={styles.tipText}>• Note the date when you find information - laws can change</Text>
        <Text style={styles.tipText}>• Print or save important pages for your records</Text>
        <Text style={styles.tipText}>• Law libraries often have staff who can help you find resources</Text>
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
  resourceCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    marginBottom: ellioLawTokens.spacing.sm,
    minHeight: 48,
  },
  resourceTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: 4 },
  resourceDescription: { fontSize: 14, color: ellioLawTokens.color.text.secondary, marginBottom: ellioLawTokens.spacing.sm, lineHeight: 20 },
  resourceLink: { fontSize: 14, color: ellioLawTokens.color.caseActive, fontWeight: '600' },
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
  tipText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.secondary, marginBottom: ellioLawTokens.spacing.xs },
});
