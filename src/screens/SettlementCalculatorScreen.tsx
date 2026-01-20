import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

export const SettlementCalculatorScreen: React.FC<any> = () => {
  const [medical, setMedical] = useState('');
  const [wages, setWages] = useState('');
  const [pain, setPain] = useState('');
  const [property, setProperty] = useState('');
  const [multiplier, setMultiplier] = useState('3');

  const totalDamages = (parseFloat(medical) || 0) + (parseFloat(wages) || 0) + (parseFloat(pain) || 0) + (parseFloat(property) || 0);
  const settlement = totalDamages * (parseFloat(multiplier) || 1);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settlement Calculator</Text>

      <TextInput style={styles.input} placeholder="Medical damages" value={medical} onChangeText={setMedical} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Lost wages" value={wages} onChangeText={setWages} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Pain & suffering" value={pain} onChangeText={setPain} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Property damage" value={property} onChangeText={setProperty} keyboardType="decimal-pad" />

      <View style={styles.divider} />

      <Text style={styles.label}>Total Damages</Text>
      <Text style={styles.value}>${totalDamages.toFixed(2)}</Text>

      <TextInput style={[styles.input, styles.multiplierInput]} placeholder="Multiplier (default 3)" value={multiplier} onChangeText={setMultiplier} keyboardType="decimal-pad" />

      <Text style={styles.label}>Estimated Settlement</Text>
      <Text style={[styles.value, styles.settlementValue]}>${settlement.toFixed(2)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ellioLawTokens.color.background.primary, padding: ellioLawTokens.spacing.lg },
  title: { fontSize: ellioLawTokens.fontSizes.lg, fontWeight: ellioLawTokens.fontWeights.bold, color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.lg },
  input: { borderBottomWidth: 1, borderBottomColor: ellioLawTokens.color.border, padding: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.md, fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.primary },
  multiplierInput: { marginTop: ellioLawTokens.spacing.lg },
  divider: { height: 1, backgroundColor: ellioLawTokens.color.border, marginVertical: ellioLawTokens.spacing.lg },
  label: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.secondary, marginBottom: 8 },
  value: { fontSize: ellioLawTokens.fontSizes.lg, fontWeight: ellioLawTokens.fontWeights.bold, color: ellioLawTokens.color.brand, marginBottom: ellioLawTokens.spacing.lg },
  settlementValue: { color: ellioLawTokens.color.completion, fontSize: ellioLawTokens.fontSizes.xl },
});
