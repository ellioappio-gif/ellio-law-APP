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
import { Witness, WitnessStatement } from '../types';

interface WitnessManagerProps {
  witnesses: Witness[];
  onAddWitness: (witness: Witness) => void;
  onEditWitness: (witness: Witness) => void;
  onDeleteWitness: (witnessId: string) => void;
}

export const WitnessManager: React.FC<WitnessManagerProps> = ({
  witnesses,
  onAddWitness,
  onEditWitness,
  onDeleteWitness,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingWitness, setEditingWitness] = useState<Witness | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [relationship, setRelationship] = useState('');
  const [availability, setAvailability] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter witness name');
      return;
    }

    const witness: Witness = {
      id: editingWitness?.id || `witness-${Date.now()}`,
      name,
      contactInfo: {
        phone: phone || undefined,
        email: email || undefined,
        address: address || undefined,
      },
      relationship,
      availability: availability || undefined,
      notes: notes || undefined,
      statements: editingWitness?.statements || [],
    };

    if (editingWitness) {
      onEditWitness(witness);
    } else {
      onAddWitness(witness);
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setRelationship('');
    setAvailability('');
    setNotes('');
    setEditingWitness(null);
    setModalVisible(false);
  };

  const openEditModal = (witness: Witness) => {
    setEditingWitness(witness);
    setName(witness.name);
    setPhone(witness.contactInfo.phone || '');
    setEmail(witness.contactInfo.email || '');
    setAddress(witness.contactInfo.address || '');
    setRelationship(witness.relationship);
    setAvailability(witness.availability || '');
    setNotes(witness.notes || '');
    setModalVisible(true);
  };

  const renderWitness = ({ item }: { item: Witness }) => (
    <TouchableOpacity
      style={styles.witnessCard}
      onPress={() => openEditModal(item)}
      onLongPress={() => {
        Alert.alert('Delete Witness', 'Are you sure?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => onDeleteWitness(item.id) },
        ]);
      }}
    >
      <Text style={styles.witnessName}>{item.name}</Text>
      {item.relationship && (
        <Text style={styles.relationship}>{item.relationship}</Text>
      )}
      <View style={styles.contactRow}>
        {item.contactInfo.phone && (
          <Text style={styles.contactInfo}>Phone: {item.contactInfo.phone}</Text>
        )}
        {item.contactInfo.email && (
          <Text style={styles.contactInfo}>Email: {item.contactInfo.email}</Text>
        )}
      </View>
      {item.availability && (
        <Text style={styles.availability}>Available: {item.availability}</Text>
      )}
      <Text style={styles.statementCount}>
        {item.statements.length} statement{item.statements.length !== 1 ? 's' : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Witness</Text>
      </TouchableOpacity>

      {witnesses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No witnesses yet</Text>
          <Text style={styles.emptySubtext}>Add witnesses and their contact information</Text>
        </View>
      ) : (
        <FlatList
          data={witnesses}
          renderItem={renderWitness}
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
            <Text style={styles.modalTitle}>
              {editingWitness ? 'Edit Witness' : 'New Witness'}
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Relationship</Text>
            <TextInput
              style={styles.input}
              value={relationship}
              onChangeText={setRelationship}
              placeholder="e.g., Neighbor, Coworker, Bystander"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={address}
              onChangeText={setAddress}
              placeholder="Street address"
              placeholderTextColor="#999"
              multiline
              numberOfLines={2}
            />

            <Text style={styles.label}>Availability</Text>
            <TextInput
              style={styles.input}
              value={availability}
              onChangeText={setAvailability}
              placeholder="When are they available to testify?"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Additional notes about this witness"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
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
  witnessCard: {
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
  witnessName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  relationship: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  contactRow: {
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  availability: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statementCount: {
    fontSize: 12,
    color: '#999',
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
});
