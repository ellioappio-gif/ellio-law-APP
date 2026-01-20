import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
}

export const TimelineBuilderScreen: React.FC<any> = ({ route }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([
    { id: '1', date: '2024-01-15', title: 'Incident occurred' },
  ]);

  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');

  const addEvent = () => {
    if (!date.trim() || !title.trim()) return;
    setEvents([{ id: Date.now().toString(), date, title }, ...events]);
    setDate('');
    setTitle('');
  };

  const deleteEvent = (id: string) => {
    Alert.alert('Delete', 'Remove this event?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => setEvents(events.filter(e => e.id !== id)), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Timeline</Text>

      <View style={styles.inputSection}>
        <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
        <TextInput style={styles.input} placeholder="Event" value={title} onChangeText={setTitle} />
        <TouchableOpacity style={styles.button} onPress={addEvent}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {events.length === 0 ? (
        <Text style={styles.empty}>No events yet</Text>
      ) : (
        events.map(event => (
          <View key={event.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.date}>{event.date}</Text>
              <Text style={styles.itemText}>{event.title}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteEvent(event.id)}>
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
  item: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: ellioLawTokens.spacing.md, borderBottomWidth: 1, borderBottomColor: ellioLawTokens.color.border },
  date: { fontSize: ellioLawTokens.fontSizes.xs, color: ellioLawTokens.color.text.secondary },
  itemText: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.primary, marginTop: 4 },
  deleteText: { fontSize: ellioLawTokens.fontSizes.md, color: ellioLawTokens.color.deadline },
  empty: { fontSize: ellioLawTokens.fontSizes.sm, color: ellioLawTokens.color.text.secondary, textAlign: 'center', marginTop: ellioLawTokens.spacing.lg },
});
