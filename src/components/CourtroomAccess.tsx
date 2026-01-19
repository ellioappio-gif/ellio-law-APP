import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface CourtroomAccessProps {
  courtName: string;
  courtAddress: string;
}

export const CourtroomAccess: React.FC<CourtroomAccessProps> = ({ courtName, courtAddress }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const accessFeatures = [
    {
      id: 'mobility',
      title: 'Mobility Accommodations',
      items: [
        'Wheelchair accessible entrances',
        'Elevators to all courtrooms',
        'Reserved parking spaces',
        'Accessible restrooms',
        'Ramps and handrails',
      ],
    },
    {
      id: 'hearing',
      title: 'Hearing Accommodations',
      items: [
        'Assistive listening devices available',
        'Sign language interpreters (request in advance)',
        'Written materials can be provided',
        'Quiet waiting areas',
      ],
    },
    {
      id: 'vision',
      title: 'Vision Accommodations',
      items: [
        'Large print documents (request in advance)',
        'Braille materials (request in advance)',
        'Service animals welcome',
        'Verbal descriptions of proceedings available',
      ],
    },
    {
      id: 'language',
      title: 'Language Access',
      items: [
        'Interpreters for many languages (request in advance)',
        'Translated forms for common languages',
        'Bilingual staff at information desk',
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Courtroom Accessibility</Text>
        <Text style={styles.educationText}>
          Courts are required to provide reasonable accommodations to ensure everyone can 
          participate in legal proceedings. This information can help you understand what's available.
        </Text>
        <Text style={styles.warningText}>
          Many accommodations require advance notice. Contact the court as early as possible 
          to request what you need.
        </Text>
      </View>

      <View style={styles.courtCard}>
        <Text style={styles.courtName}>{courtName}</Text>
        <Text style={styles.courtAddress}>{courtAddress}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Accommodations</Text>
        {accessFeatures.map(feature => {
          const isExpanded = expandedSection === feature.id;
          return (
            <View key={feature.id} style={styles.featureCard}>
              <TouchableOpacity
                onPress={() => setExpandedSection(isExpanded ? null : feature.id)}
                style={styles.featureHeader}
              >
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
              </TouchableOpacity>
              {isExpanded && (
                <View style={styles.featureItems}>
                  {feature.items.map((item, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Request Accommodations</Text>
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>1</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Contact the Court Early</Text>
            <Text style={styles.stepText}>
              Call the court clerk's office as soon as you know you need accommodations. 
              Some requests may take several days to arrange.
            </Text>
          </View>
        </View>
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>2</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Explain What You Need</Text>
            <Text style={styles.stepText}>
              Be specific about your needs. For example, "I need a sign language interpreter" 
              or "I use a wheelchair and need information about accessible parking."
            </Text>
          </View>
        </View>
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>3</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Follow Up in Writing</Text>
            <Text style={styles.stepText}>
              After calling, send a letter or email confirming your request. Keep a copy 
              for your records.
            </Text>
          </View>
        </View>
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>4</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Confirm Before Your Hearing</Text>
            <Text style={styles.stepText}>
              A few days before your court date, call to confirm the accommodations are arranged.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Your Rights</Text>
        <Text style={styles.tipText}>
          • The Americans with Disabilities Act (ADA) requires courts to provide reasonable accommodations
        </Text>
        <Text style={styles.tipText}>
          • You cannot be charged for accommodations like interpreters or assistive devices
        </Text>
        <Text style={styles.tipText}>
          • If your request is denied, you can file a complaint with the court's ADA coordinator
        </Text>
        <Text style={styles.tipText}>
          • Accommodations are confidential - the court should not share information about your disability without your permission
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
  courtCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
  },
  courtName: { fontSize: 18, fontWeight: '700', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.xs },
  courtAddress: { fontSize: 14, color: ellioLawTokens.color.text.secondary },
  section: { marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.sm },
  featureCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderRadius: ellioLawTokens.radius.md,
    marginBottom: ellioLawTokens.spacing.sm,
    overflow: 'hidden',
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ellioLawTokens.spacing.md,
  },
  featureTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, flex: 1 },
  expandIcon: { fontSize: 24, fontWeight: '300', color: ellioLawTokens.color.caseActive, marginLeft: ellioLawTokens.spacing.sm },
  featureItems: { paddingHorizontal: ellioLawTokens.spacing.md, paddingBottom: ellioLawTokens.spacing.md },
  featureItem: { flexDirection: 'row', marginBottom: ellioLawTokens.spacing.xs, alignItems: 'flex-start' },
  bullet: { fontSize: 16, color: ellioLawTokens.color.caseActive, marginRight: ellioLawTokens.spacing.xs, lineHeight: 22 },
  itemText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.primary, flex: 1 },
  stepCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderRadius: ellioLawTokens.radius.md,
    padding: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    flexDirection: 'row',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ellioLawTokens.color.caseActive,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
    marginRight: ellioLawTokens.spacing.sm,
  },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: 4 },
  stepText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.secondary },
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
