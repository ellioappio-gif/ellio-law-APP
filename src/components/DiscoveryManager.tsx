import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface DiscoveryRequest {
  id: string;
  type: 'interrogatories' | 'production' | 'admissions' | 'deposition' | 'other';
  receivedFrom?: string;
  sentTo?: string;
  direction: 'received' | 'sent';
  receivedDate?: Date;
  dueDate: Date;
  responseDate?: Date;
  status: 'pending' | 'completed' | 'overdue' | 'extended';
  description: string;
  notes: string;
  documentIds: string[];
}

interface DiscoveryManagerProps {
  caseId: string;
  onSave?: (requests: DiscoveryRequest[]) => void;
}

export const DiscoveryManager: React.FC<DiscoveryManagerProps> = ({
  caseId,
  onSave,
}) => {
  const [requests, setRequests] = useState<DiscoveryRequest[]>([]);
  const [filter, setFilter] = useState<'all' | 'received' | 'sent'>('all');
  const [showEducation, setShowEducation] = useState(true);
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);

  const getTypeLabel = (type: DiscoveryRequest['type']): string => {
    const labels = {
      'interrogatories': 'Interrogatories',
      'production': 'Request for Production',
      'admissions': 'Request for Admissions',
      'deposition': 'Deposition Notice',
      'other': 'Other Discovery',
    };
    return labels[type];
  };

  const getDaysUntilDue = (dueDate: Date): number => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.direction === filter;
  });

  const pendingRequests = filteredRequests.filter(r => r.status === 'pending' || r.status === 'overdue');
  const completedRequests = filteredRequests.filter(r => r.status === 'completed');

  return (
    <ScrollView style={styles.container}>
      {/* Educational Section */}
      {showEducation && (
        <View style={styles.educationCard}>
          <View style={styles.educationHeader}>
            <Text style={styles.educationTitle}>About Discovery</Text>
            <TouchableOpacity
              onPress={() => setShowEducation(false)}
              accessibilityLabel="Dismiss information"
            >
              <Text style={styles.dismissButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.educationText}>
            Discovery is the process where each side exchanges information about their case. This usually 
            happens before trial and can include written questions, document requests, and depositions.
          </Text>
          <Text style={styles.educationText}>
            Discovery has strict deadlines that vary by state and case type. Missing a discovery deadline 
            can result in penalties or exclusion of evidence.
          </Text>
          <Text style={styles.warningText}>
            This tool helps organize your discovery requests and responses. It does not provide legal 
            advice about what to request or how to respond. Consider consulting an attorney for discovery strategy.
          </Text>
        </View>
      )}

      {/* Deadline Warnings */}
      {pendingRequests.some(r => getDaysUntilDue(r.dueDate) <= 7) && (
        <View style={styles.urgentCard}>
          <Text style={styles.urgentTitle}>Discovery Deadlines Approaching</Text>
          <Text style={styles.urgentText}>
            You have discovery responses due within 7 days. Discovery deadlines are typically 
            strict, and extensions usually need to be requested before the deadline.
          </Text>
        </View>
      )}

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
          onPress={() => setFilter('all')}
          accessibilityLabel="Show all discovery"
          accessibilityRole="tab"
          accessibilityState={{ selected: filter === 'all' }}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'received' && styles.filterTabActive]}
          onPress={() => setFilter('received')}
          accessibilityLabel="Show received discovery requests"
          accessibilityRole="tab"
          accessibilityState={{ selected: filter === 'received' }}
        >
          <Text style={[styles.filterText, filter === 'received' && styles.filterTextActive]}>
            Received
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'sent' && styles.filterTabActive]}
          onPress={() => setFilter('sent')}
          accessibilityLabel="Show sent discovery requests"
          accessibilityRole="tab"
          accessibilityState={{ selected: filter === 'sent' }}
        >
          <Text style={[styles.filterText, filter === 'sent' && styles.filterTextActive]}>
            Sent
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pendingRequests.length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, styles.statNumberComplete]}>
            {completedRequests.length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {requests.filter(r => r.status === 'overdue').length}
          </Text>
          <Text style={styles.statLabel}>Overdue</Text>
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {/* Open add modal */}}
        accessibilityLabel="Add discovery request"
        accessibilityRole="button"
      >
        <Text style={styles.addButtonText}>+ Add Discovery Request</Text>
      </TouchableOpacity>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Responses</Text>
          {pendingRequests.map(request => (
            <DiscoveryCard
              key={request.id}
              request={request}
              expanded={expandedRequest === request.id}
              onToggle={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
              getTypeLabel={getTypeLabel}
              getDaysUntilDue={getDaysUntilDue}
            />
          ))}
        </View>
      )}

      {/* Completed Requests */}
      {completedRequests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed</Text>
          {completedRequests.map(request => (
            <DiscoveryCard
              key={request.id}
              request={request}
              expanded={expandedRequest === request.id}
              onToggle={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
              getTypeLabel={getTypeLabel}
              getDaysUntilDue={getDaysUntilDue}
            />
          ))}
        </View>
      )}

      {/* Discovery Types Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Common Discovery Types</Text>
        
        <View style={styles.typeInfo}>
          <Text style={styles.typeName}>Interrogatories</Text>
          <Text style={styles.typeDescription}>
            Written questions that must be answered under oath. Usually limited in number by court rules.
          </Text>
        </View>

        <View style={styles.typeInfo}>
          <Text style={styles.typeName}>Request for Production</Text>
          <Text style={styles.typeDescription}>
            Asks the other side to provide copies of documents, photos, or other physical evidence.
          </Text>
        </View>

        <View style={styles.typeInfo}>
          <Text style={styles.typeName}>Request for Admissions</Text>
          <Text style={styles.typeDescription}>
            Asks the other side to admit or deny specific facts. Unanswered requests may be deemed admitted.
          </Text>
        </View>

        <View style={styles.typeInfo}>
          <Text style={styles.typeName}>Deposition</Text>
          <Text style={styles.typeDescription}>
            Oral testimony given under oath, usually recorded by a court reporter.
          </Text>
        </View>

        <Text style={styles.infoNote}>
          Discovery rules vary significantly by state and case type. Check your court's local rules 
          for specific deadlines and procedures.
        </Text>
      </View>

      {requests.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No discovery requests yet. Tap the button above to add one.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

interface DiscoveryCardProps {
  request: DiscoveryRequest;
  expanded: boolean;
  onToggle: () => void;
  getTypeLabel: (type: DiscoveryRequest['type']) => string;
  getDaysUntilDue: (dueDate: Date) => number;
}

const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  request,
  expanded,
  onToggle,
  getTypeLabel,
  getDaysUntilDue,
}) => {
  const daysUntilDue = getDaysUntilDue(request.dueDate);
  const isUrgent = daysUntilDue <= 3 && request.status !== 'completed';

  return (
    <View style={styles.requestCard}>
      <TouchableOpacity onPress={onToggle} accessibilityRole="button">
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <View style={[
              styles.directionIndicator,
              request.direction === 'received' ? styles.directionReceived : styles.directionSent
            ]}>
              <Text style={styles.directionText}>
                {request.direction === 'received' ? 'IN' : 'OUT'}
              </Text>
            </View>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.requestType}>{getTypeLabel(request.type)}</Text>
              <Text style={styles.requestParty}>
                {request.direction === 'received' 
                  ? `From: ${request.receivedFrom || 'Unknown'}`
                  : `To: ${request.sentTo || 'Unknown'}`
                }
              </Text>
            </View>
          </View>
          <Text style={styles.expandIcon}>{expanded ? '−' : '+'}</Text>
        </View>

        {request.status !== 'completed' && (
          <View style={[styles.deadlineRow, isUrgent && styles.deadlineRowUrgent]}>
            <Text style={[styles.deadlineLabel, isUrgent && styles.deadlineTextUrgent]}>
              Due: {new Date(request.dueDate).toLocaleDateString()}
              {daysUntilDue > 0 && ` (${daysUntilDue} days)`}
              {daysUntilDue <= 0 && ' (Overdue)'}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {expanded && (
        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailValue}>{request.description || 'No description'}</Text>
          </View>

          {request.notes && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Notes:</Text>
              <Text style={styles.detailValue}>{request.notes}</Text>
            </View>
          )}

          {request.documentIds.length > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Attached Documents:</Text>
              <Text style={styles.detailValue}>{request.documentIds.length} document(s)</Text>
            </View>
          )}

          {request.status === 'completed' && request.responseDate && (
            <View style={styles.completedBanner}>
              <Text style={styles.completedText}>
                ✓ Responded on {new Date(request.responseDate).toLocaleDateString()}
              </Text>
            </View>
          )}

          {request.status !== 'completed' && (
            <TouchableOpacity
              style={styles.markCompleteButton}
              onPress={() => {/* Mark complete */}}
              accessibilityLabel="Mark discovery response as complete"
              accessibilityRole="button"
            >
              <Text style={styles.markCompleteButtonText}>Mark as Responded</Text>
            </TouchableOpacity>
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
  urgentCard: {
    backgroundColor: ellioLawTokens.color.deadlineUrgent + '15',
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.deadlineUrgent,
  },
  urgentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: ellioLawTokens.color.deadlineUrgent,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  urgentText: {
    fontSize: 14,
    lineHeight: 22,
    color: ellioLawTokens.color.text.secondary,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.md,
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderRadius: ellioLawTokens.radius.md,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: ellioLawTokens.spacing.sm,
    alignItems: 'center',
    borderRadius: ellioLawTokens.radius.sm,
  },
  filterTabActive: {
    backgroundColor: ellioLawTokens.color.caseActive,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.tertiary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  statsRow: {
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
  requestCard: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    padding: ellioLawTokens.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  directionIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ellioLawTokens.spacing.sm,
  },
  directionReceived: {
    backgroundColor: ellioLawTokens.color.caseActive + '20',
  },
  directionSent: {
    backgroundColor: ellioLawTokens.color.courtNeutral,
  },
  directionText: {
    fontSize: 11,
    fontWeight: '700',
    color: ellioLawTokens.color.caseActive,
  },
  cardTitleContainer: {
    flex: 1,
  },
  requestType: {
    fontSize: 16,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
  },
  requestParty: {
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
  deadlineLabel: {
    fontSize: 13,
    color: ellioLawTokens.color.text.secondary,
    fontWeight: '500',
  },
  deadlineTextUrgent: {
    color: ellioLawTokens.color.deadlineUrgent,
  },
  cardDetails: {
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
    lineHeight: 22,
    color: ellioLawTokens.color.text.primary,
  },
  completedBanner: {
    backgroundColor: ellioLawTokens.color.caseSettled + '15',
    padding: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    marginTop: ellioLawTokens.spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: ellioLawTokens.color.caseSettled,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.caseSettled,
  },
  markCompleteButton: {
    backgroundColor: ellioLawTokens.color.caseActive,
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    alignItems: 'center',
    marginTop: ellioLawTokens.spacing.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  markCompleteButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: ellioLawTokens.color.educationalHighlight + '10',
    padding: ellioLawTokens.spacing.md,
    marginHorizontal: ellioLawTokens.spacing.md,
    marginBottom: ellioLawTokens.spacing.xl,
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
  typeInfo: {
    marginBottom: ellioLawTokens.spacing.md,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.primary,
    marginBottom: 2,
  },
  typeDescription: {
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
