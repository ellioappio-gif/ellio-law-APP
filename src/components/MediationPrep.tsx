import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface MediationPrepProps {
  caseId: string;
  onSave?: (data: any) => void;
}

export const MediationPrep: React.FC<MediationPrepProps> = ({ caseId, onSave }) => {
  const [checklist, setChecklist] = useState([
    { id: '1', item: 'Review all case documents', checked: false },
    { id: '2', item: 'Prepare settlement range (minimum acceptable)', checked: false },
    { id: '3', item: 'List key facts supporting your position', checked: false },
    { id: '4', item: 'Consider other party\'s perspective', checked: false },
    { id: '5', item: 'Identify non-monetary solutions', checked: false },
    { id: '6', item: 'Bring copies of important documents', checked: false },
  ]);

  const [prosAndCons, setProsAndCons] = useState({
    settling: { pros: '', cons: '' },
    continuing: { pros: '', cons: '' },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.educationCard}>
        <Text style={styles.educationTitle}>Mediation & Settlement Preparation</Text>
        <Text style={styles.educationText}>
          Mediation is a meeting where a neutral person helps both sides discuss settlement. 
          Many cases settle, and being prepared can help you make informed decisions.
        </Text>
        <Text style={styles.warningText}>
          This tool helps you organize thoughts and materials. It does not recommend whether 
          to settle or what settlement to accept. Those are personal decisions that can involve 
          complex legal considerations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preparation Checklist</Text>
        {checklist.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.checklistItem}
            onPress={() => setChecklist(prev =>
              prev.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i)
            )}
          >
            <View style={[styles.checkbox, item.checked && styles.checkboxChecked]} />
            <Text style={[styles.checklistText, item.checked && styles.checklistTextChecked]}>
              {item.item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Questions to Consider</Text>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>What is the best possible outcome if I continue?</Text>
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>What is the worst possible outcome if I continue?</Text>
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>How long might the case take if it doesn't settle?</Text>
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>What are the costs (time, money, stress) of continuing?</Text>
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>What matters most to me in resolving this?</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settling vs. Continuing</Text>
        <View style={styles.prosConsCard}>
          <Text style={styles.prosConsTitle}>Settling Now</Text>
          <Text style={styles.prosConsLabel}>Pros:</Text>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="What are the benefits of settling? (certainty, closure, save time/money, etc.)"
            placeholderTextColor={ellioLawTokens.color.text.tertiary}
            value={prosAndCons.settling.pros}
            onChangeText={(text) => setProsAndCons(prev => ({
              ...prev,
              settling: { ...prev.settling, pros: text }
            }))}
          />
          <Text style={styles.prosConsLabel}>Cons:</Text>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="What are the downsides? (less than you hoped for, etc.)"
            placeholderTextColor={ellioLawTokens.color.text.tertiary}
            value={prosAndCons.settling.cons}
            onChangeText={(text) => setProsAndCons(prev => ({
              ...prev,
              settling: { ...prev.settling, cons: text }
            }))}
          />
        </View>

        <View style={styles.prosConsCard}>
          <Text style={styles.prosConsTitle}>Continuing the Case</Text>
          <Text style={styles.prosConsLabel}>Pros:</Text>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="What are the benefits of continuing? (chance for better outcome, etc.)"
            placeholderTextColor={ellioLawTokens.color.text.tertiary}
            value={prosAndCons.continuing.pros}
            onChangeText={(text) => setProsAndCons(prev => ({
              ...prev,
              continuing: { ...prev.continuing, pros: text }
            }))}
          />
          <Text style={styles.prosConsLabel}>Cons:</Text>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="What are the downsides? (time, cost, uncertainty, stress, etc.)"
            placeholderTextColor={ellioLawTokens.color.text.tertiary}
            value={prosAndCons.continuing.cons}
            onChangeText={(text) => setProsAndCons(prev => ({
              ...prev,
              continuing: { ...prev.continuing, cons: text }
            }))}
          />
        </View>
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Mediation Tips</Text>
        <Text style={styles.tipText}>• Listen to what the other side says</Text>
        <Text style={styles.tipText}>• You can usually take breaks to think</Text>
        <Text style={styles.tipText}>• You don't have to accept any offer</Text>
        <Text style={styles.tipText}>• The mediator doesn't decide - you do</Text>
        <Text style={styles.tipText}>• Consider bringing someone for support</Text>
        <Text style={styles.tipText}>• Get any agreement in writing before leaving</Text>
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
  checklistItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.sm, borderRadius: ellioLawTokens.radius.md, minHeight: 48 },
  checkbox: { width: 24, height: 24, borderRadius: ellioLawTokens.radius.sm, borderWidth: 2, borderColor: ellioLawTokens.color.courtNeutral, marginRight: ellioLawTokens.spacing.sm, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: ellioLawTokens.color.caseActive, borderColor: ellioLawTokens.color.caseActive },
  checkmark: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  checklistText: { flex: 1, fontSize: 15, color: ellioLawTokens.color.text.primary },
  checklistTextChecked: { color: ellioLawTokens.color.text.tertiary, textDecorationLine: 'line-through' },
  questionCard: { backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md, marginBottom: ellioLawTokens.spacing.sm },
  questionText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.primary },
  prosConsCard: { backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md, marginBottom: ellioLawTokens.spacing.md },
  prosConsTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.md },
  prosConsLabel: { fontSize: 14, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginTop: ellioLawTokens.spacing.sm, marginBottom: ellioLawTokens.spacing.xs },
  textArea: { backgroundColor: ellioLawTokens.color.background.primary, borderRadius: ellioLawTokens.radius.sm, padding: ellioLawTokens.spacing.sm, fontSize: 14, color: ellioLawTokens.color.text.primary, minHeight: 80, textAlignVertical: 'top' },
  tipsCard: { backgroundColor: ellioLawTokens.color.educationalHighlight + '10', padding: ellioLawTokens.spacing.md, marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.xl, borderRadius: ellioLawTokens.radius.md, borderLeftWidth: 4, borderLeftColor: ellioLawTokens.color.educationalHighlight },
  tipsTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.sm },
  tipText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.secondary, marginBottom: ellioLawTokens.spacing.xs },
});
