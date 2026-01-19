import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  category: 'observation' | 'question' | 'concern' | 'progress' | 'general';
  tags: string[];
}

interface CaseJournalProps {
  caseId: string;
  onSave?: (entries: JournalEntry[]) => void;
}

export const CaseJournal: React.FC<CaseJournalProps> = ({ caseId, onSave }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | JournalEntry['category']>('all');

  const getCategoryIcon = (category: JournalEntry['category']): string => {
    const icons = {
      observation: 'OBS',
      question: 'Q',
      concern: '!',
      progress: '+',
      general: 'N',
    };
    return icons[category];
  };

  const getCategoryLabel = (category: JournalEntry['category']): string => {
    const labels = {
      observation: 'Observation',
      question: 'Question',
      concern: 'Concern',
      progress: 'Progress',
      general: 'General Note',
    };
    return labels[category];
  };

  const filteredEntries = filterCategory === 'all'
    ? entries
    : entries.filter(e => e.category === filterCategory);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Case Journal</Text>
        <Text style={styles.educationText}>
          Use this journal to record observations, questions, and thoughts about your case. 
          Keeping notes can help you remember details and track your thinking over time.
        </Text>
        <Text style={styles.warningText}>
          These are private notes for your own reference. They are not legal documents and 
          should not be filed with the court.
        </Text>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'observation', 'question', 'concern', 'progress', 'general'] as const).map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterChip, filterCategory === cat && styles.filterChipActive]}
            onPress={() => setFilterCategory(cat)}
          >
            <Text style={[styles.filterText, filterCategory === cat && styles.filterTextActive]}>
              {cat === 'all' ? 'All' : getCategoryLabel(cat as JournalEntry['category'])}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Text style={styles.addButtonText}>+ Add Journal Entry</Text>
      </TouchableOpacity>

      {filteredEntries.map(entry => (
        <View key={entry.id} style={styles.entryCard}>
          <TouchableOpacity onPress={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}>
            <View style={styles.entryHeader}>
              <View style={styles.entryHeaderLeft}>
                <Text style={styles.categoryIcon}>{getCategoryIcon(entry.category)}</Text>
                <View>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Text style={styles.entryDate}>{new Date(entry.date).toLocaleDateString()}</Text>
                </View>
              </View>
              <Text style={styles.expandIcon}>{expandedEntry === entry.id ? '−' : '+'}</Text>
            </View>
          </TouchableOpacity>

          {expandedEntry === entry.id && (
            <View style={styles.entryDetails}>
              <Text style={styles.entryContent}>{entry.content}</Text>
              {entry.tags.length > 0 && (
                <View style={styles.tagsRow}>
                  {entry.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      ))}

      {filteredEntries.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {filterCategory === 'all'
              ? 'No journal entries yet. Tap the button above to add one.'
              : `No ${getCategoryLabel(filterCategory as JournalEntry['category']).toLowerCase()} entries.`}
          </Text>
        </View>
      )}

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Journal Tips</Text>
        <Text style={styles.tipText}>• Write down what happened as soon as you can</Text>
        <Text style={styles.tipText}>• Note dates and times when relevant</Text>
        <Text style={styles.tipText}>• Save questions to ask a lawyer if you hire one later</Text>
        <Text style={styles.tipText}>• Track your progress to see how far you've come</Text>
        <Text style={styles.tipText}>• Use tags to organize entries by topic</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ellioLawTokens.color.background.primary },
  educationCard: { backgroundColor: ellioLawTokens.color.disclaimerBackground, padding: ellioLawTokens.spacing.md, marginHorizontal: ellioLawTokens.spacing.md, marginTop: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.sm, borderRadius: ellioLawTokens.radius.md, borderLeftWidth: 4, borderLeftColor: ellioLawTokens.color.educationalHighlight },
  educationTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.xs },
  educationText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.secondary, marginBottom: ellioLawTokens.spacing.sm },
  warningText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.deadlineUrgent, fontWeight: '500' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.md, gap: ellioLawTokens.spacing.xs },
  filterChip: { paddingHorizontal: ellioLawTokens.spacing.sm, paddingVertical: 6, borderRadius: ellioLawTokens.radius.full, backgroundColor: ellioLawTokens.color.background.secondary, borderWidth: 1, borderColor: ellioLawTokens.color.courtNeutral },
  filterChipActive: { backgroundColor: ellioLawTokens.color.caseActive, borderColor: ellioLawTokens.color.caseActive },
  filterText: { fontSize: 13, color: ellioLawTokens.color.text.secondary, fontWeight: '500' },
  filterTextActive: { color: '#FFFFFF' },
  addButton: { backgroundColor: ellioLawTokens.color.caseActive, padding: ellioLawTokens.spacing.md, marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md, alignItems: 'center', minHeight: 48, justifyContent: 'center' },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  entryCard: { backgroundColor: ellioLawTokens.color.background.secondary, marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.sm, borderRadius: ellioLawTokens.radius.md, padding: ellioLawTokens.spacing.md },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  entryHeaderLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  categoryIcon: { fontSize: 28, marginRight: ellioLawTokens.spacing.sm },
  entryTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary },
  entryDate: { fontSize: 13, color: ellioLawTokens.color.text.tertiary },
  expandIcon: { fontSize: 24, fontWeight: '300', color: ellioLawTokens.color.caseActive },
  entryDetails: { marginTop: ellioLawTokens.spacing.md, paddingTop: ellioLawTokens.spacing.md, borderTopWidth: 1, borderTopColor: ellioLawTokens.color.courtNeutral },
  entryContent: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.md },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: ellioLawTokens.spacing.xs },
  tag: { backgroundColor: ellioLawTokens.color.caseActive + '20', paddingHorizontal: ellioLawTokens.spacing.sm, paddingVertical: 4, borderRadius: ellioLawTokens.radius.sm },
  tagText: { fontSize: 12, color: ellioLawTokens.color.caseActive, fontWeight: '600' },
  emptyState: { padding: ellioLawTokens.spacing.xl, alignItems: 'center' },
  emptyStateText: { fontSize: 15, color: ellioLawTokens.color.text.tertiary, textAlign: 'center', lineHeight: 22 },
  tipsCard: { backgroundColor: ellioLawTokens.color.educationalHighlight + '10', padding: ellioLawTokens.spacing.md, marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.xl, borderRadius: ellioLawTokens.radius.md, borderLeftWidth: 4, borderLeftColor: ellioLawTokens.color.educationalHighlight },
  tipsTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.sm },
  tipText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.secondary, marginBottom: ellioLawTokens.spacing.xs },
});
