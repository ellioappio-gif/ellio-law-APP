import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { VoiceNote } from '../types';

interface VoiceNotesProps {
  notes: VoiceNote[];
  onAddNote: (note: VoiceNote) => void;
  onDeleteNote: (noteId: string) => void;
}

export const VoiceNotes: React.FC<VoiceNotesProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
}) => {
  const [recording, setRecording] = useState(false);
  const [selectedNote, setSelectedNote] = useState<VoiceNote | null>(null);

  const sortedNotes = [...notes].sort((a, b) => b.date.getTime() - a.date.getTime());

  const startRecording = async () => {
    // Note: Requires expo-av package
    Alert.alert(
      'Voice Recording',
      'Voice recording requires expo-av package. Install with: npx expo install expo-av',
      [{ text: 'OK' }]
    );
    // TODO: Implement actual recording with expo-av
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderNote = ({ item }: { item: VoiceNote }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => setSelectedNote(item)}
      onLongPress={() => {
        Alert.alert('Delete Note', 'Are you sure?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => onDeleteNote(item.id) },
        ]);
      }}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.noteDate}>{item.date.toLocaleDateString()}</Text>
        <Text style={styles.noteDuration}>{formatDuration(item.duration)}</Text>
      </View>
      {item.summary && (
        <Text style={styles.noteSummary} numberOfLines={2}>
          {item.summary}
        </Text>
      )}
      {item.transcription && (
        <Text style={styles.transcription} numberOfLines={3}>
          "{item.transcription}"
        </Text>
      )}
      {item.tags && item.tags.length > 0 && (
        <View style={styles.tagContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.recordButton, recording && styles.recordingButton]}
        onPress={recording ? () => setRecording(false) : startRecording}
      >
        <Text style={styles.recordButtonText}>
          {recording ? 'Stop Recording' : 'Start Voice Note'}
        </Text>
      </TouchableOpacity>

      {sortedNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No voice notes yet</Text>
          <Text style={styles.emptySubtext}>
            Record your thoughts and observations while they're fresh
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedNotes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <Modal
        visible={selectedNote !== null}
        animationType="slide"
        onRequestClose={() => setSelectedNote(null)}
      >
        {selectedNote && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedNote(null)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Voice Note</Text>
              <View style={{ width: 50 }} />
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.detailDate}>
                {selectedNote.date.toLocaleDateString()} at{' '}
                {selectedNote.date.toLocaleTimeString()}
              </Text>
              <Text style={styles.detailDuration}>
                Duration: {formatDuration(selectedNote.duration)}
              </Text>

              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>▶️ Play Recording</Text>
              </TouchableOpacity>

              {selectedNote.transcription && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Transcription</Text>
                  <Text style={styles.sectionContent}>{selectedNote.transcription}</Text>
                </View>
              )}

              {selectedNote.summary && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Summary</Text>
                  <Text style={styles.sectionContent}>{selectedNote.summary}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  recordButton: {
    backgroundColor: '#FF3B30',
    margin: 16,
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  recordingButton: {
    backgroundColor: '#FF9500',
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  listContainer: {
    padding: 16,
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 14,
    color: '#666',
  },
  noteDuration: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  noteSummary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  transcription: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#007AFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#007AFF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  closeButton: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    padding: 20,
  },
  detailDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  detailDuration: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
