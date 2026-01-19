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
import { Deadline, DeadlineType } from '../types';

interface DeadlineTrackerProps {
  deadlines: Deadline[];
  onAddDeadline: (deadline: Deadline) => void;
  onEditDeadline: (deadline: Deadline) => void;
  onDeleteDeadline: (deadlineId: string) => void;
  onToggleComplete: (deadlineId: string) => void;
}

export const DeadlineTracker: React.FC<DeadlineTrackerProps> = ({
  deadlines,
  onAddDeadline,
  onEditDeadline,
  onDeleteDeadline,
  onToggleComplete,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState<DeadlineType>(DeadlineType.OTHER);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');

  const upcoming = deadlines
    .filter((d) => !d.completed && d.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const overdue = deadlines
    .filter((d) => !d.completed && d.date < new Date())
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  const completed = deadlines
    .filter((d) => d.completed)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a deadline title');
      return;
    }

    const deadline: Deadline = {
      id: editingDeadline?.id || `deadline-${Date.now()}`,
      title,
      description,
      date,
      type,
      priority,
      completed: editingDeadline?.completed || false,
      reminderDays: [7, 3, 1], // Default reminders
    };

    if (editingDeadline) {
      onEditDeadline(deadline);
    } else {
      onAddDeadline(deadline);
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate(new Date());
    setType(DeadlineType.OTHER);
    setPriority('medium');
    setEditingDeadline(null);
    setModalVisible(false);
  };

  const openEditModal = (deadline: Deadline) => {
    setEditingDeadline(deadline);
    setTitle(deadline.title);
    setDescription(deadline.description);
    setDate(new Date(deadline.date));
    setType(deadline.type);
    setPriority(deadline.priority);
    setModalVisible(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#007AFF';
      case 'low': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getDaysUntil = (deadline: Date) => {
    const today = new Date();
    const diff = deadline.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const renderDeadline = ({ item }: { item: Deadline }) => {
    const daysUntil = getDaysUntil(item.date);
    const isOverdue = daysUntil < 0 && !item.completed;

    return (
      <TouchableOpacity
        style={[styles.deadlineCard, item.completed && styles.completedCard]}
        onPress={() => openEditModal(item)}
        onLongPress={() => {
          Alert.alert('Delete Deadline', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => onDeleteDeadline(item.id) },
          ]);
        }}
      >
        <View style={styles.deadlineHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => onToggleComplete(item.id)}
          />
          <View style={styles.deadlineContent}>
            <Text style={[styles.deadlineTitle, item.completed && styles.completedText]}>
              {item.title}
            </Text>
            <Text style={styles.deadlineDate}>
              {item.date.toLocaleDateString()}
              {!item.completed && (
                <Text style={[styles.daysUntil, isOverdue && styles.overdueText]}>
                  {' '}• {isOverdue ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days`}
                </Text>
              )}
            </Text>
            {item.description && (
              <Text style={styles.deadlineDescription} numberOfLines={2}>
                {item.description}
              </Text>
            )}
          </View>
          <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(item.priority) }]} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Deadline</Text>
      </TouchableOpacity>

      {overdue.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overdue ({overdue.length})</Text>
          {overdue.map((item) => renderDeadline({ item }))}
        </View>
      )}

      {upcoming.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming ({upcoming.length})</Text>
          {upcoming.map((item) => renderDeadline({ item }))}
        </View>
      )}

      {completed.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed ({completed.length})</Text>
          {completed.slice(0, 5).map((item) => renderDeadline({ item }))}
        </View>
      )}

      {deadlines.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No deadlines set</Text>
          <Text style={styles.emptySubtext}>Track important dates and filing deadlines</Text>
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide" onRequestClose={resetForm}>
        <ScrollView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={resetForm}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingDeadline ? 'Edit Deadline' : 'New Deadline'}
            </Text>
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
              placeholder="Deadline title"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Details about this deadline"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
              {Object.values(DeadlineType).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typeChip, type === t && styles.typeChipSelected]}
                  onPress={() => setType(t)}
                >
                  <Text style={[styles.chipText, type === t && styles.chipTextSelected]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityRow}>
              {(['low', 'medium', 'high', 'critical'] as const).map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.priorityButton,
                    priority === p && { backgroundColor: getPriorityColor(p) },
                  ]}
                  onPress={() => setPriority(p)}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      priority === p && styles.priorityTextSelected,
                    ]}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
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
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  deadlineCard: {
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
  completedCard: {
    opacity: 0.7,
  },
  deadlineHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deadlineContent: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deadlineDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  daysUntil: {
    color: '#007AFF',
    fontWeight: '500',
  },
  overdueText: {
    color: '#FF3B30',
  },
  deadlineDescription: {
    fontSize: 14,
    color: '#999',
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginLeft: 8,
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
    minHeight: 80,
    textAlignVertical: 'top',
  },
  typeScroll: {
    marginBottom: 8,
  },
  typeChip: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  typeChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 12,
    color: '#333',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  priorityText: {
    fontSize: 14,
    color: '#333',
  },
  priorityTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
