import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface Expense {
  id: string;
  description: string;
  amount: string;
  date: string;
}

export const ExpenseTrackerScreen: React.FC<any> = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: 'Court filing fee', amount: '75', date: '2024-01-15' },
  ]);

  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const addExpense = () => {
    if (!desc.trim() || !amount.trim()) return;
    setExpenses([...expenses, { id: Date.now().toString(), description: desc, amount, date }]);
    setDesc('');
    setAmount('');
    setDate('');
  };

  const deleteExpense = (id: string) => {
    Alert.alert('Delete', 'Remove expense?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => setExpenses(expenses.filter(e => e.id !== id)), style: 'destructive' },
    ]);
  };

  const total = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expenses</Text>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput style={styles.input} placeholder="Expense" value={desc} onChangeText={setDesc} />
        <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
        <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
        <TouchableOpacity style={styles.button} onPress={addExpense}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {expenses.length === 0 ? (
        <Text style={styles.empty}>No expenses yet</Text>
      ) : (
        expenses.map(e => (
          <View key={e.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemText}>{e.description}</Text>
              <Text style={styles.date}>{e.date}</Text>
            </View>
            <Text style={styles.amount}>${e.amount}</Text>
            <TouchableOpacity onPress={() => deleteExpense(e.id)}>
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ellioLawTokens.color.background.primary, padding: ellioLawTokens.spacing.lg },
  title: { fontSize: ellioLawTokens.fontSizes.lg, fontWeight: ellioLawTokens.fontWeights.bold, color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.lg },
  totalBox: { backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md, marginBottom: ellioLawTokens.spacing.lg, borderWidth: 1, borderColor: ellioLawTokens.color.border },
  totalLabel: { fontSize: ellioLawTokens.fontSizes.xs, color: ellioLawTokens.color.text.secondary },
  totalAmount: { fontSize: ellioLawTokens.fontSizes.lg, fontWeight: ellioLawTokens.fontWeights.bold, color: ellioLawTokens.color.brand, marginTop: 4 },
  inputSection: { marginBottom: ellioLawTokens.spacing.lg },
  input: { borderBottomWidth: 1, borderBottomColor: ellioLawTokens.color.border, padding: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.md, fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.primary },
  button: { backgroundColor: ellioLawTokens.color.brand, paddingVertical: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: ellioLawTokens.fontWeights.semibold, fontSize: ellioLawTokens.fontSizes.sm },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: ellioLawTokens.spacing.md, borderBottomWidth: 1, borderBottomColor: ellioLawTokens.color.border },
  itemText: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.primary },
  date: { fontSize: ellioLawTokens.fontSizes.xs, color: ellioLawTokens.color.text.secondary, marginTop: 4 },
  amount: { fontSize: ellioLawTokens.fontSizes.sm, fontWeight: ellioLawTokens.fontWeights.bold, color: ellioLawTokens.color.brand, marginRight: ellioLawTokens.spacing.md },
  deleteText: { fontSize: ellioLawTokens.fontSizes.md, color: ellioLawTokens.color.deadline },
  empty: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.secondary, textAlign: 'center', marginTop: ellioLawTokens.spacing.lg },
});
