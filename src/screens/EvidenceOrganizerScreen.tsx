import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface Evidence {
  id: string;
  title: string;
  type: string;
}

export const EvidenceOrganizerScreen: React.FC<any> = () => {
  const [evidence, setEvidence] = useState<Evidence[]>([
    { id: '1', title: 'Photo of accident scene', type: 'Photo' },
  ]);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const addEvidence = () => {
    if (!title.trim() || !type.trim()) return;
    setEvidence([...evidence, { id: Date.now().toString(), title, type }]);
    setTitle('');
    setType('');
  };

  const deleteEvidence = (id: string) => {
    Alert.alert('Delete', 'Remove evidence?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => setEvidence(evidence.filter(e => e.id !== id)), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Evidence</Text>

      <View style={styles.inputSection}>
        <TextInput style={styles.input} placeholder="Item title" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Type" value={type} onChangeText={setType} />
        <TouchableOpacity style={styles.button} onPress={addEvidence}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {evidence.length === 0 ? (
        <Text style={styles.empty}>No evidence yet</Text>
      ) : (
        evidence.map(e => (
          <View key={e.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemText}>{e.title}</Text>
              <Text style={styles.subtitle}>{e.type}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteEvidence(e.id)}>
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
  itemText: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.primary },
  subtitle: { fontSize: ellioLawTokens.fontSizes.xs, color: ellioLawTokens.color.text.secondary, marginTop: 4 },
  deleteText: { fontSize: ellioLawTokens.fontSizes.md, color: ellioLawTokens.color.deadline },
  empty: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.secondary, textAlign: 'center', marginTop: ellioLawTokens.spacing.lg },
});