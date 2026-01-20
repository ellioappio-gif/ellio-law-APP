import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface Deadline {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export const DeadlineTrackerScreen: React.FC<any> = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([
    { id: '1', title: 'File Answer', dueDate: '2024-02-15', completed: false },
  ]);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const addDeadline = () => {
    if (!title.trim() || !date.trim()) return;
    setDeadlines([...deadlines, { id: Date.now().toString(), title, dueDate: date, completed: false }]);
    setTitle('');
    setDate('');
  };

  const toggleComplete = (id: string) => {
    setDeadlines(deadlines.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
  };

  const deleteDeadline = (id: string) => {
    Alert.alert('Delete', 'Remove this deadline?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => setDeadlines(deadlines.filter(d => d.id !== id)), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Deadlines</Text>

      <View style={styles.inputSection}>
        <TextInput style={styles.input} placeholder="Deadline" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Due date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
        <TouchableOpacity style={styles.button} onPress={addDeadline}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {deadlines.length === 0 ? (
        <Text style={styles.empty}>No deadlines yet</Text>
      ) : (
        deadlines.map(d => (
          <View key={d.id} style={[styles.item, d.completed && styles.itemCompleted]}>
            <TouchableOpacity style={styles.checkbox} onPress={() => toggleComplete(d.id)}>
              <Text style={styles.checkboxText}>{d.completed ? '✓' : ''}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={[styles.itemText, d.completed && styles.itemTextCompleted]}>{d.title}</Text>
              <Text style={styles.date}>{d.dueDate}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteDeadline(d.id)}>
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
  inputSection: { marginBottom: ellioLawTokens.spacing.lg },
  input: { borderBottomWidth: 1, borderBottomColor: ellioLawTokens.color.border, padding: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.md, fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.primary },
  button: { backgroundColor: ellioLawTokens.color.brand, paddingVertical: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: ellioLawTokens.fontWeights.semibold, fontSize: ellioLawTokens.fontSizes.sm },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: ellioLawTokens.spacing.md, borderBottomWidth: 1, borderBottomColor: ellioLawTokens.color.border },
  itemCompleted: { opacity: 0.6 },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: ellioLawTokens.color.border, borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginRight: ellioLawTokens.spacing.md },
  checkboxText: { color: ellioLawTokens.color.completion, fontWeight: ellioLawTokens.fontWeights.bold },
  itemText: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.primary },
  itemTextCompleted: { textDecorationLine: 'line-through' },
  date: { fontSize: ellioLawTokens.fontSizes.xs, color: ellioLawTokens.color.text.secondary, marginTop: 4 },
  deleteText: { fontSize: ellioLawTokens.fontSizes.md, color: ellioLawTokens.color.deadline },
  empty: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.secondary, textAlign: 'center', marginTop: ellioLawTokens.spacing.lg },
});
