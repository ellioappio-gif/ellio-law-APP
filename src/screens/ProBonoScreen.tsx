import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, TextInput } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

export const ProBonoScreen: React.FC = () => {
  const [zipCode, setZipCode] = useState('');

  const organizations = [
    {
      name: 'Virginia Legal Aid Society',
      description: 'Free civil legal services for low-income Virginians',
      phone: '1-866-534-5243',
      website: 'https://www.valegalaid.org',
      areas: ['Family Law', 'Housing', 'Public Benefits', 'Consumer'],
    },
    {
      name: 'Virginia Poverty Law Center',
      description: 'Advocacy and legal help for low-income individuals',
      phone: '804-782-9430',
      website: 'https://www.vplc.org',
      areas: ['Housing', 'Public Benefits', 'Consumer Protection'],
    },
    {
      name: 'Virginia State Bar Lawyer Referral',
      description: 'Modest means and pro bono attorney referrals',
      phone: '804-775-0500',
      website: 'https://www.vsb.org',
      areas: ['Various'],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Pro Bono Legal Help</Text>
        <Text style={styles.educationText}>
          Pro bono means "for the public good" - free legal help from lawyers who volunteer 
          their time. Many organizations help connect people with free or low-cost attorneys.
        </Text>
        <Text style={styles.warningText}>
          Availability is limited. Most programs have income requirements and may not be able 
          to help everyone who applies. Apply as early as you can.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Find Help in Your Area</Text>
        <View style={styles.searchCard}>
          <Text style={styles.searchLabel}>Enter your ZIP code:</Text>
          <TextInput
            style={styles.zipInput}
            placeholder="ZIP code"
            placeholderTextColor={ellioLawTokens.color.text.tertiary}
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="number-pad"
            maxLength={5}
          />
          <TouchableOpacity style={styles.searchButton} disabled={zipCode.length !== 5}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Virginia Organizations</Text>
        {organizations.map((org, idx) => (
          <View key={idx} style={styles.orgCard}>
            <Text style={styles.orgName}>{org.name}</Text>
            <Text style={styles.orgDescription}>{org.description}</Text>
            <View style={styles.areasRow}>
              {org.areas.map((area, areaIdx) => (
                <View key={areaIdx} style={styles.areaTag}>
                  <Text style={styles.areaText}>{area}</Text>
                </View>
              ))}
            </View>
            <View style={styles.contactRow}>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => Linking.openURL(`tel:${org.phone}`)}
              >
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.contactButton, styles.contactButtonSecondary]}
                onPress={() => Linking.openURL(org.website)}
              >
                <Text style={[styles.contactButtonText, styles.contactButtonTextSecondary]}>
                  Website
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Tips for Getting Help</Text>
        <Text style={styles.tipText}>• Apply to multiple organizations</Text>
        <Text style={styles.tipText}>• Have income and case information ready when you call</Text>
        <Text style={styles.tipText}>• Be patient - organizations often have waitlists</Text>
        <Text style={styles.tipText}>• Even if you don't qualify, they may provide helpful information</Text>
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
  searchCard: { backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md },
  searchLabel: { fontSize: 14, color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.xs, fontWeight: '500' },
  zipInput: {
    backgroundColor: ellioLawTokens.color.background.primary,
    borderRadius: ellioLawTokens.radius.sm,
    padding: ellioLawTokens.spacing.sm,
    fontSize: 16,
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.sm,
    minHeight: 48,
  },
  searchButton: { backgroundColor: ellioLawTokens.color.caseActive, padding: ellioLawTokens.spacing.sm, borderRadius: ellioLawTokens.radius.md, alignItems: 'center', minHeight: 48, justifyContent: 'center' },
  searchButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  orgCard: { backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md, marginBottom: ellioLawTokens.spacing.sm },
  orgName: { fontSize: 16, fontWeight: '700', color: ellioLawTokens.color.text.primary, marginBottom: 4 },
  orgDescription: { fontSize: 14, color: ellioLawTokens.color.text.secondary, marginBottom: ellioLawTokens.spacing.sm, lineHeight: 20 },
  areasRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: ellioLawTokens.spacing.sm },
  areaTag: { backgroundColor: ellioLawTokens.color.caseActive + '20', paddingHorizontal: ellioLawTokens.spacing.sm, paddingVertical: 4, borderRadius: ellioLawTokens.radius.sm },
  areaText: { fontSize: 12, color: ellioLawTokens.color.caseActive, fontWeight: '600' },
  contactRow: { flexDirection: 'row', gap: ellioLawTokens.spacing.sm },
  contactButton: { flex: 1, backgroundColor: ellioLawTokens.color.caseActive, padding: ellioLawTokens.spacing.sm, borderRadius: ellioLawTokens.radius.md, alignItems: 'center', minHeight: 40, justifyContent: 'center' },
  contactButtonSecondary: { backgroundColor: ellioLawTokens.color.background.primary, borderWidth: 2, borderColor: ellioLawTokens.color.caseActive },
  contactButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  contactButtonTextSecondary: { color: ellioLawTokens.color.caseActive },
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
