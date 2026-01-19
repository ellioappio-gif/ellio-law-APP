import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { WORKFLOWS } from '../data/legalData';
import { Workflow, WorkflowStep } from '../types';

export const WorkflowsScreen: React.FC = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [stepStatuses, setStepStatuses] = useState<Record<string, boolean>>({});

  const toggleStep = (stepId: string) => {
    setStepStatuses((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const renderWorkflow = ({ item }: { item: Workflow }) => {
    const completedSteps = item.steps.filter((s) => stepStatuses[s.id]).length;
    const progress = (completedSteps / item.steps.length) * 100;

    return (
      <TouchableOpacity
        style={styles.workflowCard}
        onPress={() => setSelectedWorkflow(item)}
      >
        <Text style={styles.workflowTitle}>{item.title}</Text>
        <Text style={styles.caseType}>{item.caseType}</Text>
        <Text style={styles.estimatedTime}>⏱ {item.estimatedTime}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {completedSteps}/{item.steps.length} steps complete
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderStep = ({ item, index }: { item: WorkflowStep; index: number }) => {
    const isCompleted = stepStatuses[item.id];

    return (
      <View style={styles.stepCard}>
        <View style={styles.stepHeader}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, isCompleted && styles.completedText]}>
              {item.title}
            </Text>
            <Text style={styles.stepDescription}>{item.description}</Text>

            {item.requiredDocuments && item.requiredDocuments.length > 0 && (
              <>
                <Text style={styles.subheading}>Required Documents:</Text>
                {item.requiredDocuments.map((doc, i) => (
                  <Text key={i} style={styles.listItem}>• {doc}</Text>
                ))}
              </>
            )}

            {item.tips && item.tips.length > 0 && (
              <>
                <Text style={styles.subheading}>TIPS:</Text>
                {item.tips.map((tip, i) => (
                  <Text key={i} style={styles.tipItem}>• {tip}</Text>
                ))}
              </>
            )}
          </View>
        </View>

        <View
          style={[styles.checkbox, isCompleted && styles.checkedBox]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Guided Workflows</Text>
        <Text style={styles.subtitle}>Step-by-step legal process guides</Text>
      </View>

      <FlatList
        data={WORKFLOWS}
        renderItem={renderWorkflow}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={selectedWorkflow !== null}
        animationType="slide"
        onRequestClose={() => setSelectedWorkflow(null)}
      >
        {selectedWorkflow && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedWorkflow(null)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedWorkflow.title}</Text>
              <View style={{ width: 50 }} />
            </View>

            <FlatList
              data={selectedWorkflow.steps}
              renderItem={renderStep}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.modalContent}
            />
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
  header: {
    backgroundColor: '#AF52DE',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#F3E5F5',
  },
  listContainer: {
    padding: 16,
  },
  workflowCard: {
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
  workflowTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  caseType: {
    fontSize: 14,
    color: '#AF52DE',
    fontWeight: '500',
    marginBottom: 6,
  },
  estimatedTime: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
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
    backgroundColor: '#AF52DE',
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
    padding: 16,
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepHeader: {
    flexDirection: 'row',
    flex: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#AF52DE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  tipItem: {
    fontSize: 13,
    color: '#007AFF',
    marginBottom: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkedBox: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
