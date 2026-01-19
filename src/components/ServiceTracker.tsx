import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface ServiceAttempt {
  id: string;
  date: Date;
  method: 'personal' | 'substitute' | 'certified-mail' | 'publication' | 'other';
  location: string;
  serverName: string;
  result: 'successful' | 'unsuccessful' | 'pending';
  notes: string;
}

interface ServiceRecord {
  id: string;
  partyName: string;
  partyRole: string;
  address: string;
  serviceDeadline?: Date;
  attempts: ServiceAttempt[];
  proofOfService?: string; // Document ID
  completed: boolean;
  completedDate?: Date;
}

interface ServiceTrackerProps {
  caseId: string;
  onSave?: (records: ServiceRecord[]) => void;
}

export const ServiceTracker: React.FC<ServiceTrackerProps> = ({
  caseId,
  onSave,
}) => {
  const [records, setRecords] = useState<ServiceRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [showEducation, setShowEducation] = useState(true);

  const addServiceRecord = (record: Omit<ServiceRecord, 'id' | 'attempts' | 'completed'>) => {
    const newRecord: ServiceRecord = {
      ...record,
      id: Date.now().toString(),
      attempts: [],
      completed: false,
    };
    setRecords(prev => [...prev, newRecord]);
    setShowAddModal(false);
  };

  const addAttempt = (recordId: string, attempt: Omit<ServiceAttempt, 'id'>) => {
    setRecords(prev =>
      prev.map(record =>
        record.id === recordId
          ? {
              ...record,
              attempts: [
                ...record.attempts,
                { ...attempt, id: Date.now().toString() },
              ],
              completed: attempt.result === 'successful',
              completedDate: attempt.result === 'successful' ? attempt.date : undefined,
            }
          : record
      )
    );
  };

  const getServiceMethodLabel = (method: ServiceAttempt['method']): string => {
    const labels = {
      'personal': 'Personal Service',
      'substitute': 'Substitute Service',
      'certified-mail': 'Certified Mail',
      'publication': 'Service by Publication',
      'other': 'Other Method',
    };
    return labels[method];
  };

  const pendingRecords = records.filter(r => !r.completed);
  const completedRecords = records.filter(r => r.completed);

  return (
    <ScrollView style={styles.container}>
      {/* Educational Information */}
      {showEducation && (
        <View style={styles.educationCard}>
          <View style={styles.educationHeader}>
            <Text style={styles.educationTitle}>About Service of Process</Text>
            <TouchableOpacity
              onPress={() => setShowEducation(false)}
              accessibilityLabel="Dismiss information"
            >
              <Text style={styles.dismissButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.educationText}>
            Service of process means officially delivering legal documents to the other party in your case. 
            This usually needs to happen before the court can proceed.
          </Text>
          <Text style={styles.educationText}>
            Service rules vary by state and case type. This tracker helps you organize your service attempts 
            and keep proof that service was completed.
          </Text>
          <Text style={styles.warningText}>
            Proper service is critical. If service isn't done correctly, the court may dismiss your case 
            or delay proceedings. Check your court's specific requirements.
          </Text>
        </View>
      )}

      {/* Service Deadlines Warning */}
      {pendingRecords.some(r => r.serviceDeadline && new Date(r.serviceDeadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) && (
        <View style={styles.deadlineWarningCard}>
          <Text style={styles.deadlineWarningTitle}>Service Deadlines Approaching</Text>
          <Text style={styles.deadlineWarningText}>
            You have service deadlines within the next 7 days. Service typically must be completed before 
            the court date with time for the other party to respond.
          </Text>
        </View>
      )}

      {/* Summary Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pendingRecords.length}</Text>
          <Text style={styles.statLabel}>Pending Service</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, styles.statNumberComplete]}>
            {completedRecords.length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {records.reduce((sum, r) => sum + r.attempts.length, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Attempts</Text>
        </View>
      </View>

      {/* Add New Service Record */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
        accessibilityLabel="Add person who needs to be served"
        accessibilityRole="button"
      >
        <Text style={styles.addButtonText}>+ Add Person to Serve</Text>
      </TouchableOpacity>

      {/* Pending Service Records */}
      {pendingRecords.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Service</Text>
          {pendingRecords.map(record => (
            <ServiceRecordCard
              key={record.id}
              record={record}
              expanded={expandedRecord === record.id}
              onToggle={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
              onAddAttempt={(attempt) => addAttempt(record.id, attempt)}
              getMethodLabel={getServiceMethodLabel}
            />
          ))}
        </View>
      )}

      {/* Completed Service Records */}
      {completedRecords.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed Service</Text>
          {completedRecords.map(record => (
            <ServiceRecordCard
              key={record.id}
              record={record}
              expanded={expandedRecord === record.id}
              onToggle={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
              onAddAttempt={(attempt) => addAttempt(record.id, attempt)}
              getMethodLabel={getServiceMethodLabel}
            />
          ))}
        </View>
      )}

      {/* Service Method Information */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Common Service Methods</Text>
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>Personal Service</Text>
          <Text style={styles.methodDescription}>
            Documents handed directly to the person, usually by a process server or sheriff.
          </Text>
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>Substitute Service</Text>
          <Text style={styles.methodDescription}>
            Documents left with another adult at their home or workplace, followed by mail.
          </Text>
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>Certified Mail</Text>
          <Text style={styles.methodDescription}>
            Documents mailed with return receipt, if allowed by your court.
          </Text>
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>Service by Publication</Text>
          <Text style={styles.methodDescription}>
            Notice published in newspaper when person can't be located. Usually requires court permission.
          </Text>
        </View>
        <Text style={styles.infoNote}>
          Which methods are allowed depends on your state and case type. Check with your court clerk.
        </Text>
      </View>

      {records.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No service records yet. Tap the button above to add people who need to be served.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

interface ServiceRecordCardProps {
  record: ServiceRecord;
  expanded: boolean;
  onToggle: () => void;
  onAddAttempt: (attempt: Omit<ServiceAttempt, 'id'>) => void;
  getMethodLabel: (method: ServiceAttempt['method']) => string;
}

const ServiceRecordCard: React.FC<ServiceRecordCardProps> = ({
  record,
  expanded,
  onToggle,
  onAddAttempt,
  getMethodLabel,
}) => {
  const getDaysUntilDeadline = (): number | null => {
    if (!record.serviceDeadline) return null;
    const now = new Date();
    const deadline = new Date(record.serviceDeadline);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDeadline = getDaysUntilDeadline();

  return (
    <View style={styles.recordCard}>
      <TouchableOpacity onPress={onToggle} accessibilityRole="button">
        <View style={styles.recordHeader}>
          <View style={styles.recordHeaderLeft}>
            <View style={[
              styles.statusIndicator,
              record.completed ? styles.statusComplete : styles.statusPending
            ]} />
            <View>
              <Text style={styles.partyName}>{record.partyName}</Text>
              <Text style={styles.partyRole}>{record.partyRole}</Text>
            </View>
          </View>
          <Text style={styles.expandIcon}>{expanded ? '−' : '+'}</Text>
        </View>

        {daysUntilDeadline !== null && !record.completed && (
          <View style={[
            styles.deadlineRow,
            daysUntilDeadline <= 3 && styles.deadlineRowUrgent
          ]}>
            <Text style={styles.deadlineText}>
              Deadline: {daysUntilDeadline > 0 ? `${daysUntilDeadline} days` : 'Overdue'}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {expanded && (
        <View style={styles.recordDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailValue}>{record.address}</Text>
          </View>

          {record.attempts.length > 0 && (
            <View style={styles.attemptsSection}>
              <Text style={styles.attemptsTitle}>Service Attempts ({record.attempts.length})</Text>
              {record.attempts.map(attempt => (
                <View key={attempt.id} style={styles.attemptCard}>
                  <View style={styles.attemptHeader}>
                    <Text style={styles.attemptDate}>
                      {new Date(attempt.date).toLocaleDateString()}
                    </Text>
                    <View style={[
                      styles.attemptResultBadge,
                      attempt.result === 'successful' && styles.resultSuccess,
                      attempt.result === 'unsuccessful' && styles.resultUnsuccessful,
                    ]}>
                      <Text style={styles.attemptResultText}>
                        {attempt.result.charAt(0).toUpperCase() + attempt.result.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.attemptMethod}>{getMethodLabel(attempt.method)}</Text>
                  {attempt.notes && (
                    <Text style={styles.attemptNotes}>{attempt.notes}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {!record.completed && (
            <TouchableOpacity
              style={styles.addAttemptButton}
              onPress={() => {/* Would open add attempt modal */}}
              accessibilityLabel="Record service attempt"
              accessibilityRole="button"
            >
              <Text style={styles.addAttemptButtonText}>+ Record Service Attempt</Text>
            </TouchableOpacity>
          )}

          {record.completed && record.completedDate && (
            <View style={styles.completedBanner}>
              <Text style={styles.completedText}>
                ✓ Service completed on {new Date(record.completedDate).toLocaleDateString()}
              </Text>
              <Text style={styles.completedNote}>
                Remember to file proof of service with the court if required.
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ellioLawTokens.color.background.primary,
  },
  educationCard: {
    backgroundColor: ellioLawTokens.color.disclaimerBackground,
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginTop: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.educationalHighlight,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ellioLawTokens.spacing.sm,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
  },
  dismissButton: {
    fontSize: 20,
    color: ellioLawTokens.color.text.tertiary,
    padding: ellioLawTokens.spacing.xs,
  },
  educationText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.deadlineUrgent,
    fontWeight: '500',
  },
  deadlineWarningCard: {
    backgroundColor: ellioLawTokens.color.deadlineUrgent + '15',
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.deadlineUrgent,
  },
  deadlineWarningTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: ellioLawTokens.color.deadlineUrgent,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  deadlineWarningText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
    gap: ellioLawTokens.spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: ellioLawTokens.color.caseActive,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  statNumberComplete: {
    color: ellioLawTokens.color.caseSettled,
  },
  statLabel: {
    fontSize: 12,
    color: ellioLawTokens.color.text.tertiary,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: ellioLawTokens.color.caseActive,
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: ellioLawTokens.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: ellioLawTokens.color.text.primary,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  recordCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    padding: ellioLawTokens.spacing.md,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: ellioLawTokens.spacing.sm,
  },
  statusPending: {
    backgroundColor: ellioLawTokens.color.deadlineUrgent,
  },
  statusComplete: {
    backgroundColor: ellioLawTokens.color.caseSettled,
  },
  partyName: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
  },
  partyRole: {
    fontSize: 13,
    color: ellioLawTokens.color.text.tertiary,
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: '300',
    color: ellioLawTokens.color.caseActive,
  },
  deadlineRow: {
    marginTop: ellioLawTokens.spacing.sm,
    paddingTop: ellioLawTokens.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: ellioLawTokens.color.courtNeutral,
  },
  deadlineRowUrgent: {
    borderTopColor: ellioLawTokens.color.deadlineUrgent,
  },
  deadlineText: {
    fontSize: 13,
    color: ellioLawTokens.color.text.secondary,
    fontWeight: '500',
  },
  recordDetails: {
    marginTop: ellioLawTokens.spacing.md,
    paddingTop: ellioLawTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: ellioLawTokens.color.courtNeutral,
  },
  detailRow: {
    marginBottom: ellioLawTokens.spacing.sm,
  },
  detailLabel: {
    fontSize: 13,
    color: ellioLawTokens.color.text.tertiary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: ellioLawTokens.color.text.primary,
  },
  attemptsSection: {
    marginTop: ellioLawTokens.spacing.md,
  },
  attemptsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  attemptCard: {
    backgroundColor: ellioLawTokens.color.background.primary,
    padding: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.sm,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  attemptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ellioLawTokens.spacing.xs,
  },
  attemptDate: {
    fontSize: 13,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
  },
  attemptResultBadge: {
    paddingHorizontal: ellioLawTokens.spacing.sm,
    paddingVertical: 2,
    borderRadius: ellioLawTokens.radius.sm,
  },
  resultSuccess: {
    backgroundColor: ellioLawTokens.color.caseSettled + '20',
  },
  resultUnsuccessful: {
    backgroundColor: ellioLawTokens.color.deadlineUrgent + '20',
  },
  attemptResultText: {
    fontSize: 11,
    fontWeight: '600',
  },
  attemptMethod: {
    fontSize: 13,
    color: ellioLawTokens.color.text.secondary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  attemptNotes: {
    fontSize: 13,
    color: ellioLawTokens.color.text.tertiary,
    fontStyle: 'italic',
  },
  addAttemptButton: {
    backgroundColor: ellioLawTokens.color.background.primary,
    borderWidth: 2,
    borderColor: ellioLawTokens.color.caseActive,
    borderStyle: 'dashed',
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    alignItems: 'center',
    marginTop: ellioLawTokens.spacing.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  addAttemptButtonText: {
    color: ellioLawTokens.color.caseActive,
    fontSize: 14,
    fontWeight: '600',
  },
  completedBanner: {
    backgroundColor: ellioLawTokens.color.caseSettled + '15',
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    marginTop: ellioLawTokens.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.caseSettled,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.caseSettled,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  completedNote: {
    fontSize: 13,
    color: ellioLawTokens.color.text.secondary,
  },
  infoCard: {
    backgroundColor: ellioLawTokens.color.educationalHighlight + '10',
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.educationalHighlight,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.md,
  },
  methodInfo: {
    marginBottom: ellioLawTokens.spacing.md,
  },
  methodName: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: 2,
  },
  methodDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: ellioLawTokens.color.text.secondary,
  },
  infoNote: {
    fontSize: 13,
    lineHeight: 20,
    color: ellioLawTokens.color.text.tertiary,
    fontStyle: 'italic',
    marginTop: ellioLawTokens.spacing.sm,
  },
  emptyState: {
    padding: ellioLawTokens.spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 15,
    color: ellioLawTokens.color.text.tertiary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
