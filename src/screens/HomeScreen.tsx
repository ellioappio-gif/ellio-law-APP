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
import { PulsatingElephant } from '../components/PulsatingElephant';
import {
  GlossaryIcon,
  CourtroomIcon,
  TemplateIcon,
  JournalIcon,
  ResearchIcon,
  AppealIcon,
  TimelineIcon,
  DeadlineIcon,
  ExpenseIcon,
  VoiceNoteIcon,
  WitnessIcon,
  SettlementIcon,
  EvidenceIcon,
  ServiceIcon,
  DiscoveryIcon,
  HearingIcon,
  MediationIcon,
  CourtPrepIcon,
  CaseStatusIcon,
  HandoffIcon,
  FilingIcon,
  DamageIcon,
  ContactIcon,
  NotificationIcon,
  MeetingIcon,
  InsuranceIcon,
  EthicsIcon,
  DispositionIcon,
  DefenseIcon,
  StatuteIcon,
  AnalysisIcon,
} from '../components/EllioIcons';

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
          <TouchableOpacity style={styles.resourceButton} onPress={() => navigation.navigate('LegalAid')}>
            <Text style={styles.resourceButtonText}>Legal Aid</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton} onPress={() => navigation.navigate('Glossary')}>
            <GlossaryIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.resourceButtonText}>Glossary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton} onPress={() => navigation.navigate('CourtInfo')}>
            <CourtroomIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.resourceButtonText}>Courts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton} onPress={() => navigation.navigate('Templates')}>
            <TemplateIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.resourceButtonText}>Templates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton} onPress={() => navigation.navigate('Workflows')}>
            <JournalIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.resourceButtonText}>Workflows</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton} onPress={() => navigation.navigate('CourtForms')}>
            <FilingIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.resourceButtonText}>Forms</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton} onPress={() => navigation.navigate('LegalResearch')}>
            <ResearchIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.resourceButtonText}>Research</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton} onPress={() => navigation.navigate('ProBono')}>
            <ContactIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.resourceButtonText}>Pro Bono</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton} onPress={() => navigation.navigate('AppealGuide')}>
            <AppealIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.resourceButtonText}>Appeals</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.toolsSection}>
        <Text style={styles.toolsTitle}>Case Management Tools</Text>
        <View style={styles.toolButtons}>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Timeline')}>
            <TimelineIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Timeline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Deadlines')}>
            <DeadlineIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Deadlines</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Expenses')}>
            <ExpenseIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('VoiceNotes')}>
            <VoiceNoteIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Voice Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Witnesses')}>
            <WitnessIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Witnesses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('SettlementCalc')}>
            <SettlementIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Settlement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Evidence')}>
            <EvidenceIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Evidence</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Service')}>
            <ServiceIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Discovery')}>
            <DiscoveryIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Discovery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('HearingOutcomes')}>
            <HearingIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Hearing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('MediationPrep')}>
            <MediationIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Mediation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('CourtPrep')}>
            <CourtPrepIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Court Prep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Journal')}>
            <JournalIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('CaseStatus')}>
            <CaseStatusIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Handoff')}>
            <HandoffIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Handoff</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Courtroom')}>
            <CourtroomIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Courtroom</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('LegalGlossary')}>
            <GlossaryIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Glossary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('FilingChecklist')}>
            <FilingIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Filing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('DamageCalc')}>
            <DamageIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Damages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Contacts')}>
            <ContactIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Timeline2')}>
            <TimelineIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Viewer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Notifications')}>
            <NotificationIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Templates2')}>
            <TemplateIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Templates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Settlement')}>
            <SettlementIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Settlements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Appeal')}>
            <AppealIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Appeals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('LegalResearch2')}>
            <ResearchIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Research</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('CaseAnalysis')}>
            <AnalysisIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Analysis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('MeetingNotes')}>
            <MeetingIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Meetings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Insurance')}>
            <InsuranceIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Insurance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('EthicalRules')}>
            <EthicsIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Ethics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Disposition')}>
            <DispositionIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Disposition</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Defense')}>
            <DefenseIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Defense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('StatuteOfLimitations')}>
            <StatuteIcon size={16} color={ellioLawTokens.color.brand} />
            <Text style={styles.toolButtonText}>Statute</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={() => navigation.navigate('Chatbot')}>
            <Text style={styles.toolButtonText}>Ask a Question</Text>
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

      {/* Floating Chatbot Button - Pulsating Ellio Elephant */}
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => navigation.navigate('Chatbot')}
      >
        <PulsatingElephant size={56} />
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
    gap: 8,
  },
  resourceButtonText: {
    color: ellioLawTokens.color.brand,
    fontSize: 14,
    fontWeight: '500',
  },
  toolsSection: {
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
  toolsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  toolButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  toolButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    minWidth: '45%',
  },
  toolButtonText: {
    color: ellioLawTokens.color.brand,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
