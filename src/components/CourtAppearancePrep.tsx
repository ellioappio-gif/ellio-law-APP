import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  checked: boolean;
  notes?: string;
}

interface CourtAppearancePrepProps {
  caseId: string;
  hearingDate?: Date;
  onSave?: (items: ChecklistItem[]) => void;
}

export const CourtAppearancePrep: React.FC<CourtAppearancePrepProps> = ({
  caseId,
  hearingDate,
  onSave,
}) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // What to Bring
    { id: '1', category: 'Documents to Bring', item: 'Case number or court documents', checked: false },
    { id: '2', category: 'Documents to Bring', item: 'Photo ID (driver\'s license or state ID)', checked: false },
    { id: '3', category: 'Documents to Bring', item: 'Three copies of all documents (judge, other party, yourself)', checked: false },
    { id: '4', category: 'Documents to Bring', item: 'Evidence organized in folders', checked: false },
    { id: '5', category: 'Documents to Bring', item: 'Witness list with contact information', checked: false },
    { id: '6', category: 'Documents to Bring', item: 'Notepad and pen', checked: false },
    
    // Preparation
    { id: '7', category: 'Before You Go', item: 'Check court location and parking options', checked: false },
    { id: '8', category: 'Before You Go', item: 'Plan to arrive 30 minutes early', checked: false },
    { id: '9', category: 'Before You Go', item: 'Dress in business or business casual attire', checked: false },
    { id: '10', category: 'Before You Go', item: 'Turn off or silence cell phone', checked: false },
    { id: '11', category: 'Before You Go', item: 'Review your timeline and key points', checked: false },
    
    // During Hearing
    { id: '12', category: 'At the Courthouse', item: 'Check in with clerk when you arrive', checked: false },
    { id: '13', category: 'At the Courthouse', item: 'Wait quietly until your case is called', checked: false },
    { id: '14', category: 'At the Courthouse', item: 'Stand when the judge enters', checked: false },
    { id: '15', category: 'At the Courthouse', item: 'Address the judge as "Your Honor"', checked: false },
    { id: '16', category: 'At the Courthouse', item: 'Listen carefully and speak clearly when it\'s your turn', checked: false },
    { id: '17', category: 'At the Courthouse', item: 'Take notes on what the judge says', checked: false },
    
    // After Hearing
    { id: '18', category: 'After the Hearing', item: 'Get a copy of any court orders', checked: false },
    { id: '19', category: 'After the Hearing', item: 'Note any deadlines the judge mentioned', checked: false },
    { id: '20', category: 'After the Hearing', item: 'Ask clerk questions if anything was unclear', checked: false },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);

  const categories = ['all', 'Documents to Bring', 'Before You Go', 'At the Courthouse', 'After the Hearing'];

  const toggleItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const filteredChecklist = selectedCategory === 'all'
    ? checklist
    : checklist.filter(item => item.category === selectedCategory);

  const completedCount = checklist.filter(item => item.checked).length;
  const totalCount = checklist.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <ScrollView style={styles.container}>
      {/* Educational Disclaimer */}
      <View style={styles.disclaimerCard}>
        <Text style={styles.disclaimerTitle}>Court Appearance Preparation</Text>
        <Text style={styles.disclaimerText}>
          This checklist includes items that are commonly needed for court hearings. What you need 
          can vary by court, case type, and hearing purpose.
        </Text>
        <Text style={styles.disclaimerText}>
          Check with your specific court for their requirements. This is organizational guidance, 
          not legal advice about your case.
        </Text>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Preparation Progress</Text>
          <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${completionPercentage}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {completedCount} of {totalCount} items complete
        </Text>
      </View>

      {/* What to Expect */}
      <TouchableOpacity
        style={styles.infoCard}
        onPress={() => setExpandedInfo(expandedInfo === 'expect' ? null : 'expect')}
        accessibilityLabel="What to expect at your hearing"
        accessibilityHint="Tap to expand information about typical hearing proceedings"
      >
        <View style={styles.infoHeader}>
          <Text style={styles.infoTitle}>What to Expect at Your Hearing</Text>
          <Text style={styles.expandIcon}>{expandedInfo === 'expect' ? '−' : '+'}</Text>
        </View>
        {expandedInfo === 'expect' && (
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Hearings usually follow this general pattern:
            </Text>
            <Text style={styles.bulletPoint}>• The judge or clerk calls your case number</Text>
            <Text style={styles.bulletPoint}>• Each side states their name and relationship to the case</Text>
            <Text style={styles.bulletPoint}>• The person who filed usually speaks first</Text>
            <Text style={styles.bulletPoint}>• The judge may ask questions</Text>
            <Text style={styles.bulletPoint}>• The other side gets a turn to speak</Text>
            <Text style={styles.bulletPoint}>• The judge makes a decision or sets another date</Text>
            <Text style={styles.infoNote}>
              This can vary significantly by court and hearing type. Some hearings are brief (a few 
              minutes), while others may take longer.
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Courtroom Etiquette */}
      <TouchableOpacity
        style={styles.infoCard}
        onPress={() => setExpandedInfo(expandedInfo === 'etiquette' ? null : 'etiquette')}
        accessibilityLabel="Courtroom etiquette guidelines"
        accessibilityHint="Tap to expand courtroom behavior information"
      >
        <View style={styles.infoHeader}>
          <Text style={styles.infoTitle}>Courtroom Etiquette</Text>
          <Text style={styles.expandIcon}>{expandedInfo === 'etiquette' ? '−' : '+'}</Text>
        </View>
        {expandedInfo === 'etiquette' && (
          <View style={styles.infoContent}>
            <Text style={styles.bulletPoint}>• Arrive early and check in with the clerk</Text>
            <Text style={styles.bulletPoint}>• Turn off your phone or put it on silent</Text>
            <Text style={styles.bulletPoint}>• Stand when the judge enters or leaves</Text>
            <Text style={styles.bulletPoint}>• Address the judge as "Your Honor"</Text>
            <Text style={styles.bulletPoint}>• Don't interrupt others when they're speaking</Text>
            <Text style={styles.bulletPoint}>• Speak clearly and stay calm</Text>
            <Text style={styles.bulletPoint}>• Don't eat, drink, or chew gum</Text>
            <Text style={styles.bulletPoint}>• Dress respectfully (business or business casual)</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              accessibilityLabel={`Filter by ${category}`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive,
                ]}
              >
                {category === 'all' ? 'All Items' : category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Checklist Items */}
      <View style={styles.checklistContainer}>
        {filteredChecklist.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.checklistItem}
            onPress={() => toggleItem(item.id)}
            accessibilityLabel={item.item}
            accessibilityHint={item.checked ? 'Checked, tap to uncheck' : 'Unchecked, tap to check'}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: item.checked }}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                {item.checked && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>
                  {item.item}
                </Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Additional Tips</Text>
        <Text style={styles.tipText}>
          If you're bringing witnesses, they usually wait outside the courtroom until called.
        </Text>
        <Text style={styles.tipText}>
          Some courts have metal detectors. Leave time for security screening.
        </Text>
        <Text style={styles.tipText}>
          If you need an interpreter or accessibility accommodation, contact the court in advance.
        </Text>
        <Text style={styles.tipText}>
          Write down questions you want to ask the clerk after the hearing while they're fresh in your mind.
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
  disclaimerCard: {
    backgroundColor: ellioLawTokens.color.disclaimerBackground,
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginTop: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.educationalHighlight,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  progressCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ellioLawTokens.spacing.sm,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: ellioLawTokens.color.caseActive,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: ellioLawTokens.color.courtNeutral,
    borderRadius: ellioLawTokens.radius.full,
    overflow: 'hidden',
    marginBottom: ellioLawTokens.spacing.xs,
  },
  progressBar: {
    height: '100%',
    backgroundColor: ellioLawTokens.color.caseActive,
    borderRadius: ellioLawTokens.radius.full,
  },
  progressLabel: {
    fontSize: 14,
    color: ellioLawTokens.color.text.secondary,
  },
  infoCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: '300',
    color: ellioLawTokens.color.caseActive,
  },
  infoContent: {
    marginTop: ellioLawTokens.spacing.md,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.xs,
    paddingLeft: ellioLawTokens.spacing.sm,
  },
  infoNote: {
    fontSize: 13,
    lineHeight: 20,
    color: ellioLawTokens.color.text.tertiary,
    marginTop: ellioLawTokens.spacing.sm,
    fontStyle: 'italic',
  },
  categoryContainer: {
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
  },
  categoryButton: {
    paddingHorizontal: ellioLawTokens.spacing.md,
    paddingVertical: ellioLawTokens.spacing.sm,
    marginRight: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.full,
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderWidth: 1,
    borderColor: ellioLawTokens.color.courtNeutral,
  },
  categoryButtonActive: {
    backgroundColor: ellioLawTokens.color.caseActive,
    borderColor: ellioLawTokens.color.caseActive,
  },
  categoryButtonText: {
    fontSize: 14,
    color: ellioLawTokens.color.text.secondary,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  checklistContainer: {
    marginHorizontal: ellioLawTokens.spacing.md,
  },
  checklistItem: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    minHeight: 48, // WCAG touch target
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
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
  checkboxChecked: {
    backgroundColor: ellioLawTokens.color.caseActive,
    borderColor: ellioLawTokens.color.caseActive,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 15,
    lineHeight: 21,
    color: ellioLawTokens.color.text.primary,
    marginBottom: 2,
  },
  itemTextChecked: {
    color: ellioLawTokens.color.text.tertiary,
    textDecorationLine: 'line-through',
  },
  itemCategory: {
    fontSize: 12,
    color: ellioLawTokens.color.text.tertiary,
  },
  tipsCard: {
    backgroundColor: ellioLawTokens.color.educationalHighlight + '15',
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
    marginBottom: ellioLawTokens.spacing.sm,
  },
});
