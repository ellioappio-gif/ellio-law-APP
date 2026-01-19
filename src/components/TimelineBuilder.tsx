import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { TimelineEvent, TimelineCategory } from '../types';

interface TimelineBuilderProps {
  events: TimelineEvent[];
  onAddEvent: (event: TimelineEvent) => void;
  onEditEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

export const TimelineBuilder: React.FC<TimelineBuilderProps> = ({
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState<TimelineCategory>(TimelineCategory.OTHER);
  const [importance, setImportance] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');

  const sortedEvents = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter an event title');
      return;
    }

    const event: TimelineEvent = {
      id: editingEvent?.id || `event-${Date.now()}`,
      title,
      description,
      date,
      category,
      importance,
      documentIds: editingEvent?.documentIds || [],
    };

    if (editingEvent) {
      onEditEvent(event);
    } else {
      onAddEvent(event);
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate(new Date());
    setCategory(TimelineCategory.OTHER);
    setImportance('medium');
    setEditingEvent(null);
    setModalVisible(false);
  };

  const openEditModal = (event: TimelineEvent) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setDate(new Date(event.date));
    setCategory(event.category);
    setImportance(event.importance);
    setModalVisible(true);
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#007AFF';
      case 'low': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const renderEvent = ({ item, index }: { item: TimelineEvent; index: number }) => (
    <View style={styles.eventContainer}>
      <View style={styles.timelineLine}>
        <View style={[styles.eventDot, { backgroundColor: getImportanceColor(item.importance) }]} />
        {index < sortedEvents.length - 1 && <View style={styles.connector} />}
      </View>
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => openEditModal(item)}
        onLongPress={() => {
          Alert.alert('Delete Event', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => onDeleteEvent(item.id) },
          ]);
        }}
      >
        <View style={styles.eventHeader}>
          <Text style={styles.eventDate}>{item.date.toLocaleDateString()}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getImportanceColor(item.importance) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.eventTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.eventDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        {item.documentIds && item.documentIds.length > 0 && (
          <Text style={styles.documentCount}>{item.documentIds.length} documents attached</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Timeline Event</Text>
      </TouchableOpacity>

      {sortedEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No timeline events yet</Text>
          <Text style={styles.emptySubtext}>Add events to build a chronological timeline of your case</Text>
        </View>
      ) : (
        <FlatList
          data={sortedEvents}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" onRequestClose={resetForm}>
        <ScrollView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={resetForm}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{editingEvent ? 'Edit Event' : 'New Event'}</Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Event title"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe what happened"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {Object.values(TimelineCategory).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.chipText, category === cat && styles.chipTextSelected]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Importance</Text>
            <View style={styles.importanceRow}>
              {(['low', 'medium', 'high', 'critical'] as const).map((imp) => (
                <TouchableOpacity
                  key={imp}
                  style={[
                    styles.importanceButton,
                    importance === imp && { backgroundColor: getImportanceColor(imp) },
                  ]}
                  onPress={() => setImportance(imp)}
                >
                  <Text
                    style={[
                      styles.importanceText,
                      importance === imp && styles.importanceTextSelected,
                    ]}
                  >
                    {imp.charAt(0).toUpperCase() + imp.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#34C759',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  eventContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLine: {
    alignItems: 'center',
    marginRight: 12,
  },
  eventDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: '#ddd',
    marginTop: 4,
  },
  eventCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  documentCount: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 8,
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
  cancelButton: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  importanceRow: {
    flexDirection: 'row',
    gap: 8,
  },
  importanceButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  importanceText: {
    fontSize: 14,
    color: '#333',
  },
  importanceTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
