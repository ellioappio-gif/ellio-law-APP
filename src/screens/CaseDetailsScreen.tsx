import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { CaseInfo, Folder, Document, DocumentCategory, TimelineEvent, VoiceNote, Witness, Expense, Deadline, SettlementCalculation } from '../types';
import { getCase, saveCase, createFolder, addDocumentToFolder } from '../utils/storageUtils';
import { DocumentCapture } from '../components/DocumentCapture';
import { DocumentList } from '../components/DocumentList';
import { TimelineBuilder } from '../components/TimelineBuilder';
import { VoiceNotes } from '../components/VoiceNotes';
import { WitnessManager } from '../components/WitnessManager';
import { ExpenseTracker } from '../components/ExpenseTracker';
import { DeadlineTracker } from '../components/DeadlineTracker';
import { SettlementCalculator } from '../components/SettlementCalculator';
import { CourtAppearancePrep } from '../components/CourtAppearancePrep';
import { ServiceTracker } from '../components/ServiceTracker';
import { DiscoveryManager } from '../components/DiscoveryManager';
import { HearingOutcomes } from '../components/HearingOutcomes';
import { EvidenceOrganizer } from '../components/EvidenceOrganizer';
import { MediationPrep } from '../components/MediationPrep';
import { CaseJournal } from '../components/CaseJournal';
import { CaseStatusDashboard } from '../components/CaseStatusDashboard';
import { AttorneyHandoff } from '../components/AttorneyHandoff';
import { CourtroomAccess } from '../components/CourtroomAccess';

interface CaseDetailsScreenProps {
  route: any;
  navigation: any;
}

type TabType = 'documents' | 'timeline' | 'voices' | 'witnesses' | 'expenses' | 'deadlines' | 'calculator' | 'courtprep' | 'service' | 'discovery' | 'hearings' | 'evidence' | 'mediation' | 'journal' | 'dashboard' | 'handoff' | 'courtroom';

export const CaseDetailsScreen: React.FC<CaseDetailsScreenProps> = ({ route, navigation }) => {
  const { caseId } = route.params;
  const [caseInfo, setCaseInfo] = useState<CaseInfo | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>(
    DocumentCategory.OTHER
  );
  const [activeTab, setActiveTab] = useState<TabType>('documents');

  useEffect(() => {
    loadCase();
  }, []);

  const loadCase = async () => {
    const loaded = await getCase(caseId);
    setCaseInfo(loaded);
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      Alert.alert('Error', 'Please enter a folder name');
      return;
    }

    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: newFolderName,
      category: selectedCategory,
      createdDate: new Date(),
      documents: [],
    };

    await createFolder(caseId, newFolder);
    setNewFolderName('');
    setFolderModalVisible(false);
    loadCase();
  };

  const handleDocumentCaptured = async (document: Document) => {
    if (selectedFolder) {
      await addDocumentToFolder(caseId, selectedFolder.id, document);
      loadCase();
      setModalVisible(false);
    }
  };

  const handleDocumentDelete = async (documentId: string) => {
    if (!caseInfo || !selectedFolder) return;

    const updatedFolder = {
      ...selectedFolder,
      documents: selectedFolder.documents.filter(d => d.id !== documentId),
    };

    const updatedCase = {
      ...caseInfo,
      folders: caseInfo.folders.map(f =>
        f.id === selectedFolder.id ? updatedFolder : f
      ),
    };

    await saveCase(updatedCase);
    loadCase();
  };

  const handleTimelineAddEvent = async (event: TimelineEvent) => {
    if (!caseInfo) return;
    const updatedCase = { ...caseInfo, timeline: [...(caseInfo.timeline || []), event] };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleTimelineEditEvent = async (event: TimelineEvent) => {
    if (!caseInfo) return;
    const updatedCase = {
      ...caseInfo,
      timeline: (caseInfo.timeline || []).map(e => e.id === event.id ? event : e)
    };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleTimelineDeleteEvent = async (eventId: string) => {
    if (!caseInfo) return;
    const updatedCase = {
      ...caseInfo,
      timeline: (caseInfo.timeline || []).filter(e => e.id !== eventId)
    };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleVoiceNoteAdd = async (note: VoiceNote) => {
    if (!caseInfo) return;
    const updatedCase = { ...caseInfo, voiceNotes: [...(caseInfo.voiceNotes || []), note] };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleVoiceNoteDelete = async (noteId: string) => {
    if (!caseInfo) return;
    const updatedCase = {
      ...caseInfo,
      voiceNotes: (caseInfo.voiceNotes || []).filter(n => n.id !== noteId)
    };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleWitnessAdd = async (witness: Witness) => {
    if (!caseInfo) return;
    const updatedCase = { ...caseInfo, witnesses: [...(caseInfo.witnesses || []), witness] };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleWitnessEdit = async (witness: Witness) => {
    if (!caseInfo) return;
    const updatedCase = {
      ...caseInfo,
      witnesses: (caseInfo.witnesses || []).map(w => w.id === witness.id ? witness : w)
    };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleWitnessDelete = async (witnessId: string) => {
    if (!caseInfo) return;
    const updatedCase = {
      ...caseInfo,
      witnesses: (caseInfo.witnesses || []).filter(w => w.id !== witnessId)
    };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleExpenseAdd = async (expense: Expense) => {
    if (!caseInfo) return;
    const updatedCase = { ...caseInfo, expenses: [...(caseInfo.expenses || []), expense] };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleExpenseEdit = async (expense: Expense) => {
    if (!caseInfo) return;
    const updatedCase = {
      ...caseInfo,
      expenses: (caseInfo.expenses || []).map(e => e.id === expense.id ? expense : e)
    };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleExpenseDelete = async (expenseId: string) => {
    if (!caseInfo) return;
    const updatedCase = {
      ...caseInfo,
      expenses: (caseInfo.expenses || []).filter(e => e.id !== expenseId)
    };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleDeadlineAdd = async (deadline: Deadline) => {
    if (!caseInfo) return;
    const updatedCase = { ...caseInfo, deadlines: [...(caseInfo.deadlines || []), deadline] };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleDeadlineToggle = async (deadlineId: string) => {
    if (!caseInfo) return;
    const updatedCase = {
      ...caseInfo,
      deadlines: (caseInfo.deadlines || []).map(d =>
        d.id === deadlineId ? { ...d, completed: !d.completed } : d
      )
    };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleDeadlineDelete = async (deadlineId: string) => {
    if (!caseInfo) return;
    const updatedCase = {
      ...caseInfo,
      deadlines: (caseInfo.deadlines || []).filter(d => d.id !== deadlineId)
    };
    await saveCase(updatedCase);
    setCaseInfo(updatedCase);
  };

  const handleCalculation = async (calculation: SettlementCalculation) => {
    // Could save this to case if needed
    console.log('Settlement calculation:', calculation);
  };

  const renderFolder = ({ item }: { item: Folder }) => (
    <TouchableOpacity
      style={styles.folderCard}
      onPress={() => setSelectedFolder(item)}
    >
      <Text style={styles.folderName}>{item.name}</Text>
      <Text style={styles.folderCategory}>{item.category}</Text>
      <Text style={styles.folderCount}>
        {item.documents.length} document{item.documents.length !== 1 ? 's' : ''}
      </Text>
    </TouchableOpacity>
  );

  if (!caseInfo) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (selectedFolder) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedFolder(null)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.folderTitle}>{selectedFolder.name}</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Document</Text>
        </TouchableOpacity>

        <DocumentList
          documents={selectedFolder.documents}
          onDocumentDelete={handleDocumentDelete}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
            <DocumentCapture
              onDocumentCaptured={handleDocumentCaptured}
              caseId={caseId}
              folderId={selectedFolder.id}
            />
          </View>
        </Modal>
      </View>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline':
        return (
          <TimelineBuilder
            events={caseInfo.timeline || []}
            onAddEvent={handleTimelineAddEvent}
            onEditEvent={handleTimelineEditEvent}
            onDeleteEvent={handleTimelineDeleteEvent}
          />
        );
      case 'voices':
        return (
          <VoiceNotes
            notes={caseInfo.voiceNotes || []}
            onAddNote={handleVoiceNoteAdd}
            onDeleteNote={handleVoiceNoteDelete}
          />
        );
      case 'witnesses':
        return (
          <WitnessManager
            witnesses={caseInfo.witnesses || []}
            onAddWitness={handleWitnessAdd}
            onEditWitness={handleWitnessEdit}
            onDeleteWitness={handleWitnessDelete}
          />
        );
      case 'expenses':
        return (
          <ExpenseTracker
            expenses={caseInfo.expenses || []}
            onAddExpense={handleExpenseAdd}
            onEditExpense={handleExpenseEdit}
            onDeleteExpense={handleExpenseDelete}
          />
        );
      case 'deadlines':
        return (
          <DeadlineTracker
            deadlines={caseInfo.deadlines || []}
            onAddDeadline={handleDeadlineAdd}
            onEditDeadline={handleDeadlineAdd}
            onToggleComplete={handleDeadlineToggle}
            onDeleteDeadline={handleDeadlineDelete}
          />
        );
      case 'calculator':
        return <SettlementCalculator onCalculate={handleCalculation} />;
      case 'courtprep':
        return <CourtAppearancePrep caseId={caseId} />;
      case 'service':
        return <ServiceTracker caseId={caseId} />;
      case 'discovery':
        return <DiscoveryManager caseId={caseId} />;
      case 'hearings':
        return <HearingOutcomes caseId={caseId} />;
      case 'evidence':
        return <EvidenceOrganizer caseId={caseId} />;
      case 'mediation':
        return <MediationPrep caseId={caseId} />;
      case 'journal':
        return <CaseJournal caseId={caseId} />;
      case 'dashboard':
        return <CaseStatusDashboard caseId={caseId} />;
      case 'handoff':
        return <AttorneyHandoff caseId={caseId} />;
      case 'courtroom':
        return <CourtroomAccess />;
      case 'documents':
      default:
        return (
          <>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setFolderModalVisible(true)}
            >
              <Text style={styles.addButtonText}>+ Create Folder</Text>
            </TouchableOpacity>

            {caseInfo.folders.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No folders yet</Text>
                <Text style={styles.emptySubtext}>
                  Create folders to organize your documents by category
                </Text>
              </View>
            ) : (
              <FlatList
                data={caseInfo.folders}
                renderItem={renderFolder}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
              />
            )}
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{caseInfo.name}</Text>
        {caseInfo.caseNumber && (
          <Text style={styles.caseNumber}>Case #{caseInfo.caseNumber}</Text>
        )}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        <TouchableOpacity
          style={[styles.tab, activeTab === 'documents' && styles.activeTab]}
          onPress={() => setActiveTab('documents')}
        >
          <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>
            Documents
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'timeline' && styles.activeTab]}
          onPress={() => setActiveTab('timeline')}
        >
          <Text style={[styles.tabText, activeTab === 'timeline' && styles.activeTabText]}>
            Timeline
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'witnesses' && styles.activeTab]}
          onPress={() => setActiveTab('witnesses')}
        >
          <Text style={[styles.tabText, activeTab === 'witnesses' && styles.activeTabText]}>
            Witnesses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'expenses' && styles.activeTab]}
          onPress={() => setActiveTab('expenses')}
        >
          <Text style={[styles.tabText, activeTab === 'expenses' && styles.activeTabText]}>
            Expenses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'deadlines' && styles.activeTab]}
          onPress={() => setActiveTab('deadlines')}
        >
          <Text style={[styles.tabText, activeTab === 'deadlines' && styles.activeTabText]}>
            Deadlines
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'voices' && styles.activeTab]}
          onPress={() => setActiveTab('voices')}
        >
          <Text style={[styles.tabText, activeTab === 'voices' && styles.activeTabText]}>
            Notes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'calculator' && styles.activeTab]}
          onPress={() => setActiveTab('calculator')}
        >
          <Text style={[styles.tabText, activeTab === 'calculator' && styles.activeTabText]}>
            Calculator
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'courtprep' && styles.activeTab]}
          onPress={() => setActiveTab('courtprep')}
        >
          <Text style={[styles.tabText, activeTab === 'courtprep' && styles.activeTabText]}>
            Court Prep
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'service' && styles.activeTab]}
          onPress={() => setActiveTab('service')}
        >
          <Text style={[styles.tabText, activeTab === 'service' && styles.activeTabText]}>
            Service
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'discovery' && styles.activeTab]}
          onPress={() => setActiveTab('discovery')}
        >
          <Text style={[styles.tabText, activeTab === 'discovery' && styles.activeTabText]}>
            Discovery
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'hearings' && styles.activeTab]}
          onPress={() => setActiveTab('hearings')}
        >
          <Text style={[styles.tabText, activeTab === 'hearings' && styles.activeTabText]}>
            Hearings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'evidence' && styles.activeTab]}
          onPress={() => setActiveTab('evidence')}
        >
          <Text style={[styles.tabText, activeTab === 'evidence' && styles.activeTabText]}>
            Evidence
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'mediation' && styles.activeTab]}
          onPress={() => setActiveTab('mediation')}
        >
          <Text style={[styles.tabText, activeTab === 'mediation' && styles.activeTabText]}>
            Mediation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'journal' && styles.activeTab]}
          onPress={() => setActiveTab('journal')}
        >
          <Text style={[styles.tabText, activeTab === 'journal' && styles.activeTabText]}>
            Journal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
            Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'handoff' && styles.activeTab]}
          onPress={() => setActiveTab('handoff')}
        >
          <Text style={[styles.tabText, activeTab === 'handoff' && styles.activeTabText]}>
            Handoff
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'courtroom' && styles.activeTab]}
          onPress={() => setActiveTab('courtroom')}
        >
          <Text style={[styles.tabText, activeTab === 'courtroom' && styles.activeTabText]}>
            Courtroom
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {renderTabContent()}

      <Modal
        visible={folderModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFolderModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Folder</Text>

            <TextInput
              style={styles.input}
              value={newFolderName}
              onChangeText={setNewFolderName}
              placeholder="Folder Name"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Category:</Text>
            <View style={styles.categoryGrid}>
              {Object.values(DocumentCategory).map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonSelected,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setFolderModalVisible(false);
                  setNewFolderName('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.createModalButton]}
                onPress={handleCreateFolder}
              >
                <Text style={styles.createModalButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  caseNumber: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  folderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
  folderCard: {
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
  folderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  folderCategory: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  folderCount: {
    fontSize: 14,
    color: '#666',
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
    width: '90%',
    maxHeight: '80%',
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#333',
  },
  categoryButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabBarContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
});
