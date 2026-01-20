import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface Service {
  id: string;
  method: string;
  date: string;
  completed: boolean;
}

export const ServiceTrackerScreen: React.FC<any> = () => {
  const [services, setServices] = useState<Service[]>([
    { id: '1', method: 'Certified Mail', date: '2024-01-15', completed: true },
  ]);

  const [method, setMethod] = useState('');
  const [date, setDate] = useState('');

  const addService = () => {
    if (!method.trim() || !date.trim()) return;
    setServices([...services, { id: Date.now().toString(), method, date, completed: false }]);
    setMethod('');
    setDate('');
  };

  const toggleComplete = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const deleteService = (id: string) => {
    Alert.alert('Delete', 'Remove service?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => setServices(services.filter(s => s.id !== id)), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Service of Process</Text>

      <View style={styles.inputSection}>
        <TextInput style={styles.input} placeholder="Method" value={method} onChangeText={setMethod} />
        <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
        <TouchableOpacity style={styles.button} onPress={addService}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {services.length === 0 ? (
        <Text style={styles.empty}>No services yet</Text>
      ) : (
        services.map(s => (
          <View key={s.id} style={[styles.item, s.completed && styles.itemCompleted]}>
            <TouchableOpacity style={styles.checkbox} onPress={() => toggleComplete(s.id)}>
              <Text style={styles.checkboxText}>{s.completed ? '✓' : ''}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={[styles.itemText, s.completed && styles.itemTextCompleted]}>{s.method}</Text>
              <Text style={styles.date}>{s.date}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteService(s.id)}>
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