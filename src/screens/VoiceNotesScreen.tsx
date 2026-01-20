import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface VoiceNote {
  id: string;
  title: string;
  date: string;
}

export const VoiceNotesScreen: React.FC<any> = () => {
  const [notes, setNotes] = useState<VoiceNote[]>([
    { id: '1', title: 'Client consultation notes', date: '2024-01-15' },
  ]);

  const [title, setTitle] = useState('');

  const addNote = () => {
    if (!title.trim()) return;
    const today = new Date().toISOString().split('T')[0];
    setNotes([...notes, { id: Date.now().toString(), title, date: today }]);
    setTitle('');
  };

  const deleteNote = (id: string) => {
    Alert.alert('Delete', 'Remove note?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => setNotes(notes.filter(n => n.id !== id)), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Voice Notes</Text>

      <View style={styles.inputSection}>
        <TextInput style={styles.input} placeholder="Note title" value={title} onChangeText={setTitle} />
        <TouchableOpacity style={styles.button} onPress={addNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      {notes.length === 0 ? (
        <Text style={styles.empty}>No notes yet</Text>
      ) : (
        notes.map(n => (
          <View key={n.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemText}>{n.title}</Text>
              <Text style={styles.date}>{n.date}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteNote(n.id)}>
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
  date: { fontSize: ellioLawTokens.fontSizes.xs, color: ellioLawTokens.color.text.secondary, marginTop: 4 },
  deleteText: { fontSize: ellioLawTokens.fontSizes.md, color: ellioLawTokens.color.deadline },
  empty: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.secondary, textAlign: 'center', marginTop: ellioLawTokens.spacing.lg },
});
