import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SettlementCalculation } from '../types';

interface SettlementCalculatorProps {
  onCalculate: (calculation: SettlementCalculation) => void;
}

export const SettlementCalculator: React.FC<SettlementCalculatorProps> = ({
  onCalculate,
}) => {
  const [medicalExpenses, setMedicalExpenses] = useState('');
  const [lostWages, setLostWages] = useState('');
  const [propertyDamage, setPropertyDamage] = useState('');
  const [painMultiplier, setPainMultiplier] = useState('1.5');
  const [notes, setNotes] = useState('');

  const calculateTotal = () => {
    const medical = parseFloat(medicalExpenses) || 0;
    const wages = parseFloat(lostWages) || 0;
    const property = parseFloat(propertyDamage) || 0;
    const multiplier = parseFloat(painMultiplier) || 1.5;

    // Pain and suffering typically calculated as multiplier of medical expenses
    const painAndSuffering = medical * multiplier;
    
    const total = medical + wages + property + painAndSuffering;

    const calculation: SettlementCalculation = {
      medicalExpenses: medical,
      lostWages: wages,
      propertyDamage: property,
      painAndSuffering,
      total,
      notes,
    };

    onCalculate(calculation);
    return calculation;
  };

  const calc = calculateTotal();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Settlement Calculator</Text>
        <Text style={styles.infoText}>
          This calculator provides an estimate based on common formulas. Actual settlement
          values depend on many factors. Always consult with an attorney for accurate advice.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Economic Damages</Text>
        
        <Text style={styles.label}>Medical Expenses</Text>
        <TextInput
          style={styles.input}
          value={medicalExpenses}
          onChangeText={setMedicalExpenses}
          placeholder="0.00"
          placeholderTextColor="#999"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Lost Wages</Text>
        <TextInput
          style={styles.input}
          value={lostWages}
          onChangeText={setLostWages}
          placeholder="0.00"
          placeholderTextColor="#999"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Property Damage</Text>
        <TextInput
          style={styles.input}
          value={propertyDamage}
          onChangeText={setPropertyDamage}
          placeholder="0.00"
          placeholderTextColor="#999"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Non-Economic Damages</Text>
        
        <Text style={styles.label}>Pain & Suffering Multiplier</Text>
        <Text style={styles.helpText}>
          Common range: 1.5-5x medical expenses (depends on injury severity)
        </Text>
        <TextInput
          style={styles.input}
          value={painMultiplier}
          onChangeText={setPainMultiplier}
          placeholder="1.5"
          placeholderTextColor="#999"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.calculationCard}>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Medical Expenses:</Text>
          <Text style={styles.calcValue}>${calc.medicalExpenses.toFixed(2)}</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Lost Wages:</Text>
          <Text style={styles.calcValue}>${calc.lostWages.toFixed(2)}</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Property Damage:</Text>
          <Text style={styles.calcValue}>${calc.propertyDamage.toFixed(2)}</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Pain & Suffering:</Text>
          <Text style={styles.calcValue}>
            ${(calc.painAndSuffering || 0).toFixed(2)}
          </Text>
        </View>
        <View style={[styles.calcRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Estimated Total:</Text>
          <Text style={styles.totalValue}>${calc.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Additional notes about your calculation"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Important Disclaimer</Text>
        <Text style={styles.disclaimerText}>
          • This is an estimate only{'\n'}
          • Actual settlements vary greatly{'\n'}
          • Virginia law caps some damages{'\n'}
          • Consult an attorney for your specific case{'\n'}
          • Does not account for comparative negligence
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#0D47A1',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  helpText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  calculationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  calcLabel: {
    fontSize: 16,
    color: '#666',
  },
  calcValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  disclaimerBox: {
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 22,
  },
});
