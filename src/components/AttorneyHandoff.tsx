import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface AttorneyHandoffProps {
  caseId: string;
  caseName: string;
}

export const AttorneyHandoff: React.FC<AttorneyHandoffProps> = ({ caseId, caseName }) => {
  const [selectedSections, setSelectedSections] = useState<string[]>([
    'documents',
    'timeline',
    'parties',
    'deadlines',
    'notes',
  ]);

  const sections = [
    { id: 'documents', name: 'All Documents', description: 'Court filings, evidence, correspondence' },
    { id: 'timeline', name: 'Case Timeline', description: 'Chronological events and filings' },
    { id: 'parties', name: 'Parties & Contacts', description: 'Names, addresses, contact information' },
    { id: 'deadlines', name: 'Deadlines', description: 'Upcoming and past deadlines' },
    { id: 'notes', name: 'Case Notes', description: 'Your observations and questions' },
    { id: 'evidence', name: 'Evidence Log', description: 'Evidence items and chain of custody' },
    { id: 'discovery', name: 'Discovery Materials', description: 'Requests and responses' },
  ];

  const toggleSection = (id: string) => {
    setSelectedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Attorney Handoff Package</Text>
        <Text style={styles.educationText}>
          If you hire an attorney, this package can help them understand your case quickly. 
          Select what to include and export everything in an organized format.
        </Text>
        <Text style={styles.warningText}>
          Before sharing, review all content to ensure accuracy. Remove any highly personal 
          information you don't want to share.
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{caseName}</Text>
        <Text style={styles.summaryDetail}>Case #{caseId.slice(0, 8)}</Text>
        <Text style={styles.summaryDetail}>Package Date: {new Date().toLocaleDateString()}</Text>
        <Text style={styles.summaryDetail}>
          {selectedSections.length} of {sections.length} sections included
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Sections to Include</Text>
        {sections.map(section => {
          const isSelected = selectedSections.includes(section.id);
          return (
            <TouchableOpacity
              key={section.id}
              style={[styles.sectionCard, isSelected && styles.sectionCardSelected]}
              onPress={() => toggleSection(section.id)}
            >
              <View style={styles.sectionHeader}>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]} />
                <View style={styles.sectionInfo}>
                  <Text style={styles.sectionName}>{section.name}</Text>
                  <Text style={styles.sectionDescription}>{section.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Export Options</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>Export as PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.exportButton, styles.exportButtonSecondary]}>
          <Text style={[styles.exportButtonText, styles.exportButtonTextSecondary]}>
            Export as Folder
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Handoff Tips</Text>
        <Text style={styles.tipText}>
          • Meet with attorneys before sending the full package
        </Text>
        <Text style={styles.tipText}>
          • Ask what specific information they need
        </Text>
        <Text style={styles.tipText}>
          • Keep your original files organized separately
        </Text>
        <Text style={styles.tipText}>
          • Consider creating a summary document highlighting key issues
        </Text>
        <Text style={styles.tipText}>
          • Many attorneys offer free consultations to review your situation
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
  summaryCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
  },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.xs },
  summaryDetail: { fontSize: 14, color: ellioLawTokens.color.text.secondary, marginBottom: 4 },
  section: { marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.sm },
  sectionCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sectionCardSelected: { borderColor: ellioLawTokens.color.caseActive, backgroundColor: ellioLawTokens.color.caseActive + '10' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: ellioLawTokens.radius.sm,
    borderWidth: 2,
    borderColor: ellioLawTokens.color.courtNeutral,
    marginRight: ellioLawTokens.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: { backgroundColor: ellioLawTokens.color.caseActive, borderColor: ellioLawTokens.color.caseActive },
  checkmark: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  sectionInfo: { flex: 1 },
  sectionName: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: 2 },
  sectionDescription: { fontSize: 13, color: ellioLawTokens.color.text.tertiary },
  exportButton: {
    backgroundColor: ellioLawTokens.color.caseActive,
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    alignItems: 'center',
    marginBottom: ellioLawTokens.spacing.sm,
    minHeight: 48,
    justifyContent: 'center',
  },
  exportButtonSecondary: { backgroundColor: ellioLawTokens.color.background.secondary, borderWidth: 2, borderColor: ellioLawTokens.color.caseActive },
  exportButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  exportButtonTextSecondary: { color: ellioLawTokens.color.caseActive },
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
