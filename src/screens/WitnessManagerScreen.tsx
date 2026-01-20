import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface Witness {
  id: string;
  name: string;
  relationship: string;
}

export const WitnessManagerScreen: React.FC<any> = () => {
  const [witnesses, setWitnesses] = useState<Witness[]>([
    { id: '1', name: 'John Smith', relationship: 'Eyewitness' },
  ]);

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');

  const addWitness = () => {
    if (!name.trim() || !relationship.trim()) return;
    setWitnesses([...witnesses, { id: Date.now().toString(), name, relationship }]);
    setName('');
    setRelationship('');
  };

  const deleteWitness = (id: string) => {
    Alert.alert('Delete', 'Remove witness?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => setWitnesses(witnesses.filter(w => w.id !== id)), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Witnesses</Text>

      <View style={styles.inputSection}>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Relationship" value={relationship} onChangeText={setRelationship} />
        <TouchableOpacity style={styles.button} onPress={addWitness}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {witnesses.length === 0 ? (
        <Text style={styles.empty}>No witnesses yet</Text>
      ) : (
        witnesses.map(w => (
          <View key={w.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemText}>{w.name}</Text>
              <Text style={styles.subtitle}>{w.relationship}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteWitness(w.id)}>
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
