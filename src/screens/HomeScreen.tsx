import React, { useState, useEffect } from 'react';
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
import { CaseInfo } from '../types';
import { getCases, saveCase, deleteCase } from '../utils/storageUtils';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [cases, setCases] = useState<CaseInfo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCaseName, setNewCaseName] = useState('');
  const [newCaseNumber, setNewCaseNumber] = useState('');

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const loadedCases = await getCases();
    setCases(loadedCases);
  };

  const handleCreateCase = async () => {
    if (!newCaseName.trim()) {
      Alert.alert('Error', 'Please enter a case name');
      return;
    }

    const newCase: CaseInfo = {
      id: `case-${Date.now()}`,
      name: newCaseName,
      caseNumber: newCaseNumber || undefined,
      createdDate: new Date(),
      folders: [],
    };

    await saveCase(newCase);
    setNewCaseName('');
    setNewCaseNumber('');
    setModalVisible(false);
    loadCases();
  };

  const handleDeleteCase = async (caseId: string) => {
    Alert.alert(
      'Delete Case',
      'Are you sure? This will delete all documents in this case.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteCase(caseId);
            loadCases();
          },
        },
      ]
    );
  };

  const renderCase = ({ item }: { item: CaseInfo }) => (
    <TouchableOpacity
      style={styles.caseCard}
      onPress={() => navigation.navigate('CaseDetails', { caseId: item.id })}
    >
      <View style={styles.caseHeader}>
        <Text style={styles.caseName}>{item.name}</Text>
        {item.caseNumber && (
          <Text style={styles.caseNumber}>#{item.caseNumber}</Text>
        )}
      </View>
      
      <Text style={styles.caseDate}>
        Created: {item.createdDate.toLocaleDateString()}
      </Text>
      
      <View style={styles.statsRow}>
        <Text style={styles.statText}>
          {item.folders.length} folder{item.folders.length !== 1 ? 's' : ''}
        </Text>
        <Text style={styles.statText}>
          {item.folders.reduce((sum, f) => sum + f.documents.length, 0)} document
          {item.folders.reduce((sum, f) => sum + f.documents.length, 0) !== 1 ? 's' : ''}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteCase(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ellio Law</Text>
        <Text style={styles.subtitle}>Legal Document Management</Text>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createButtonText}>+ Create New Case</Text>
      </TouchableOpacity>

      <View style={styles.resourcesSection}>
        <Text style={styles.resourcesTitle}>Legal Resources</Text>
        <View style={styles.resourceButtons}>
          <TouchableOpacity
            style={styles.resourceButton}
            onPress={() => navigation.navigate('LegalAid')}
          >
            <View style={styles.resourceIconBox}>
              <Text style={styles.resourceIcon}>AID</Text>
            </View>
            <Text style={styles.resourceButtonText}>Legal Aid</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceButton}
            onPress={() => navigation.navigate('Glossary')}
          >
            <View style={styles.resourceIconBox}>
              <Text style={styles.resourceIcon}>DEF</Text>
            </View>
            <Text style={styles.resourceButtonText}>Glossary</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceButton}
            onPress={() => navigation.navigate('CourtInfo')}
          >
            <View style={styles.resourceIconBox}>
              <Text style={styles.resourceIcon}>CRT</Text>
            </View>
            <Text style={styles.resourceButtonText}>Courts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceButton}
            onPress={() => navigation.navigate('Templates')}
          >
            <View style={styles.resourceIconBox}>
              <Text style={styles.resourceIcon}>DOC</Text>
            </View>
            <Text style={styles.resourceButtonText}>Templates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceButton}
            onPress={() => navigation.navigate('Workflows')}
          >
            <View style={styles.resourceIconBox}>
              <Text style={styles.resourceIcon}>WRK</Text>
            </View>
            <Text style={styles.resourceButtonText}>Workflows</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceButton}
            onPress={() => navigation.navigate('CourtForms')}
          >
            <View style={styles.resourceIconBox}>
              <Text style={styles.resourceIcon}>FRM</Text>
            </View>
            <Text style={styles.resourceButtonText}>Forms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceButton}
            onPress={() => navigation.navigate('LegalResearch')}
          >
            <View style={styles.resourceIconBox}>
              <Text style={styles.resourceIcon}>RSC</Text>
            </View>
            <Text style={styles.resourceButtonText}>Research</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceButton}
            onPress={() => navigation.navigate('ProBono')}
          >
            <View style={styles.resourceIconBox}>
              <Text style={styles.resourceIcon}>PRO</Text>
            </View>
            <Text style={styles.resourceButtonText}>Pro Bono</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resourceButton}
            onPress={() => navigation.navigate('AppealGuide')}
          >
            <View style={styles.resourceIconBox}>
              <Text style={styles.resourceIcon}>APL</Text>
            </View>
            <Text style={styles.resourceButtonText}>Appeals</Text>
          </TouchableOpacity>
        </View>
      </View>

      {cases.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No cases yet</Text>
          <Text style={styles.emptySubtext}>
            Create a case to start organizing your legal documents
          </Text>
        </View>
      ) : (
        <FlatList
          data={cases}
          renderItem={renderCase}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Case</Text>

            <TextInput
              style={styles.input}
              value={newCaseName}
              onChangeText={setNewCaseName}
              placeholder="Case Name *"
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.input}
              value={newCaseNumber}
              onChangeText={setNewCaseNumber}
              placeholder="Case Number (Optional)"
              placeholderTextColor="#999"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNewCaseName('');
                  setNewCaseNumber('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.createModalButton]}
                onPress={handleCreateCase}
              >
                <Text style={styles.createModalButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating Chatbot Button */}
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => navigation.navigate('Chatbot')}
      >
        <Text style={styles.chatbotIcon}>AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: ellioLawTokens.color.brand,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  createButton: {
    backgroundColor: ellioLawTokens.color.brand,
    margin: 16,
    padding: 16,
    borderRadius: ellioLawTokens.radius.md,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  caseCard: {
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
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  caseNumber: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  caseDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  deleteButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '500',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  createModalButton: {
    backgroundColor: '#007AFF',
  },
  createModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resourcesSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  resourceButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  resourceButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resourceIconBox: {
    width: 32,
    height: 32,
    borderRadius: ellioLawTokens.radius.sm,
    backgroundColor: ellioLawTokens.color.brand + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceIcon: {
    fontSize: 10,
    fontWeight: 'bold',
    color: ellioLawTokens.color.brand,
  },
  resourceButtonText: {
    color: ellioLawTokens.color.brand,
    fontSize: 14,
    fontWeight: '500',
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ellioLawTokens.color.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  chatbotIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
