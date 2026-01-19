import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

export const CourtFormsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const formCategories = [
    { id: 'all', name: 'All Forms' },
    { id: 'civil', name: 'Civil Cases' },
    { id: 'family', name: 'Family Law' },
    { id: 'small-claims', name: 'Small Claims' },
    { id: 'protective', name: 'Protective Orders' },
  ];

  const forms = [
    {
      id: '1',
      title: 'Complaint in Civil Case',
      category: 'civil',
      description: 'Form to start a civil lawsuit',
      url: 'https://www.vacourts.gov',
    },
    {
      id: '2',
      title: 'Answer to Complaint',
      category: 'civil',
      description: 'Response to a civil lawsuit',
      url: 'https://www.vacourts.gov',
    },
    {
      id: '3',
      title: 'Divorce Petition',
      category: 'family',
      description: 'Petition for divorce without children',
      url: 'https://www.vacourts.gov',
    },
    {
      id: '4',
      title: 'Small Claims Statement',
      category: 'small-claims',
      description: 'Form to file a small claims case',
      url: 'https://www.vacourts.gov',
    },
    {
      id: '5',
      title: 'Protective Order Petition',
      category: 'protective',
      description: 'Request for protective order',
      url: 'https://www.vacourts.gov',
    },
  ];

  const filteredForms = selectedCategory === 'all'
    ? forms
    : forms.filter(f => f.category === selectedCategory);

  const handleOpenForm = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Virginia Court Forms</Text>
        <Text style={styles.educationText}>
          Virginia courts provide many forms to help people represent themselves. 
          These forms include instructions for filling them out.
        </Text>
        <Text style={styles.warningText}>
          Always verify you have the most current version of a form. Courts may update 
          forms periodically, and using an outdated form can cause delays.
        </Text>
      </View>

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {formCategories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.filterChip, selectedCategory === cat.id && styles.filterChipActive]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={[styles.filterText, selectedCategory === cat.id && styles.filterTextActive]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Forms</Text>
        {filteredForms.map(form => (
          <View key={form.id} style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>{form.title}</Text>
            </View>
            <Text style={styles.formDescription}>{form.description}</Text>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleOpenForm(form.url)}
            >
              <Text style={styles.downloadButtonText}>View Form</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Tips for Using Court Forms</Text>
        <Text style={styles.tipText}>• Read all instructions before starting</Text>
        <Text style={styles.tipText}>• Make copies before filling out in case you make mistakes</Text>
        <Text style={styles.tipText}>• Type or print clearly in black ink</Text>
        <Text style={styles.tipText}>• Keep copies of everything you file</Text>
        <Text style={styles.tipText}>• Follow filing instructions exactly</Text>
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
  filterSection: { marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.md },
  filterScroll: { flexDirection: 'row' },
  filterChip: {
    paddingHorizontal: ellioLawTokens.spacing.md,
    paddingVertical: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.full,
    backgroundColor: ellioLawTokens.color.background.secondary,
    marginRight: ellioLawTokens.spacing.sm,
    borderWidth: 1,
    borderColor: ellioLawTokens.color.courtNeutral,
  },
  filterChipActive: { backgroundColor: ellioLawTokens.color.caseActive, borderColor: ellioLawTokens.color.caseActive },
  filterText: { fontSize: 14, color: ellioLawTokens.color.text.secondary, fontWeight: '500' },
  filterTextActive: { color: '#FFFFFF' },
  section: { marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.sm },
  formCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  formHeader: { marginBottom: ellioLawTokens.spacing.xs },
  formTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary },
  formDescription: { fontSize: 14, color: ellioLawTokens.color.text.secondary, marginBottom: ellioLawTokens.spacing.sm, lineHeight: 20 },
  downloadButton: {
    backgroundColor: ellioLawTokens.color.caseActive,
    padding: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    alignItems: 'center',
    minHeight: 40,
    justifyContent: 'center',
  },
  downloadButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
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
