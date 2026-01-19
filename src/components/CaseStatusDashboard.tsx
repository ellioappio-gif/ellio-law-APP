import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface CaseStatusDashboardProps {
  caseId: string;
  caseName: string;
}

export const CaseStatusDashboard: React.FC<CaseStatusDashboardProps> = ({ caseId, caseName }) => {
  // Mock data - would come from actual case data
  const stats = {
    documents: 24,
    deadlines: 3,
    upcomingHearing: new Date('2026-02-15'),
    daysToHearing: 27,
    completedTasks: 12,
    totalTasks: 20,
  };

  const completionPercentage = Math.round((stats.completedTasks / stats.totalTasks) * 100);

  const nextActions = [
    { id: '1', title: 'Respond to discovery request', dueDate: new Date('2026-01-25'), urgent: true },
    { id: '2', title: 'File witness list', dueDate: new Date('2026-02-01'), urgent: false },
    { id: '3', title: 'Prepare for hearing', dueDate: new Date('2026-02-15'), urgent: false },
  ];

  const recentActivity = [
    { id: '1', type: 'document', description: 'Added court order', date: new Date('2026-01-18') },
    { id: '2', type: 'deadline', description: 'Marked deadline complete', date: new Date('2026-01-17') },
    { id: '3', type: 'note', description: 'Added journal entry', date: new Date('2026-01-16') },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.caseName}>{caseName}</Text>
        <Text style={styles.caseId}>Case #{caseId.slice(0, 8)}</Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Overall Progress</Text>
        <View style={styles.progressCircle}>
          <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
          <Text style={styles.progressLabel}>Complete</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${completionPercentage}%` }]} />
        </View>
        <Text style={styles.progressDescription}>
          {stats.completedTasks} of {stats.totalTasks} tasks completed
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.documents}</Text>
          <Text style={styles.statLabel}>Documents</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, styles.statNumberUrgent]}>
            {stats.deadlines}
          </Text>
          <Text style={styles.statLabel}>Active Deadlines</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.daysToHearing}</Text>
          <Text style={styles.statLabel}>Days to Hearing</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Critical Action</Text>
        {nextActions.length > 0 && (
          <View style={[styles.actionCard, nextActions[0].urgent && styles.actionCardUrgent]}>
            <View style={styles.actionHeader}>
              <Text style={styles.actionTitle}>{nextActions[0].title}</Text>
              {nextActions[0].urgent && (
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentText}>Urgent</Text>
                </View>
              )}
            </View>
            <Text style={styles.actionDue}>
              Due: {nextActions[0].dueDate.toLocaleDateString()}
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Actions</Text>
        {nextActions.slice(1).map(action => (
          <View key={action.id} style={styles.upcomingItem}>
            <View style={styles.upcomingDot} />
            <View style={styles.upcomingContent}>
              <Text style={styles.upcomingTitle}>{action.title}</Text>
              <Text style={styles.upcomingDate}>
                {action.dueDate.toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivity.map(activity => (
          <View key={activity.id} style={styles.activityItem}>
            <Text style={styles.activityDate}>
              {activity.date.toLocaleDateString()}
            </Text>
            <Text style={styles.activityDescription}>{activity.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Keep Making Progress</Text>
        <Text style={styles.tipText}>
          Taking things one step at a time is progress. Each task you complete brings you closer 
          to resolving your case.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ellioLawTokens.color.background.primary },
  header: { padding: ellioLawTokens.spacing.md, marginHorizontal: ellioLawTokens.spacing.md, marginTop: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.sm },
  caseName: { fontSize: 24, fontWeight: '700', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.xs },
  caseId: { fontSize: 14, color: ellioLawTokens.color.text.tertiary },
  progressCard: { backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.lg, marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.lg, alignItems: 'center' },
  progressTitle: { fontSize: 18, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.md },
  progressCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: ellioLawTokens.color.caseActive + '20', justifyContent: 'center', alignItems: 'center', marginBottom: ellioLawTokens.spacing.md },
  progressPercentage: { fontSize: 32, fontWeight: '700', color: ellioLawTokens.color.caseActive },
  progressLabel: { fontSize: 14, color: ellioLawTokens.color.text.tertiary },
  progressBarContainer: { width: '100%', height: 8, backgroundColor: ellioLawTokens.color.courtNeutral, borderRadius: ellioLawTokens.radius.full, overflow: 'hidden', marginBottom: ellioLawTokens.spacing.sm },
  progressBar: { height: '100%', backgroundColor: ellioLawTokens.color.caseActive },
  progressDescription: { fontSize: 14, color: ellioLawTokens.color.text.secondary },
  statsGrid: { flexDirection: 'row', marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.md, gap: ellioLawTokens.spacing.sm },
  statCard: { flex: 1, backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md, alignItems: 'center' },
  statNumber: { fontSize: 28, fontWeight: '700', color: ellioLawTokens.color.caseActive, marginBottom: ellioLawTokens.spacing.xs },
  statNumberUrgent: { color: ellioLawTokens.color.deadlineUrgent },
  statLabel: { fontSize: 12, color: ellioLawTokens.color.text.tertiary, textAlign: 'center' },
  section: { marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.sm },
  actionCard: { backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.md, borderRadius: ellioLawTokens.radius.md, borderLeftWidth: 4, borderLeftColor: ellioLawTokens.color.caseActive },
  actionCardUrgent: { borderLeftColor: ellioLawTokens.color.deadlineUrgent, backgroundColor: ellioLawTokens.color.deadlineUrgent + '10' },
  actionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: ellioLawTokens.spacing.xs },
  actionTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, flex: 1 },
  urgentBadge: { backgroundColor: ellioLawTokens.color.deadlineUrgent, paddingHorizontal: ellioLawTokens.spacing.sm, paddingVertical: 4, borderRadius: ellioLawTokens.radius.sm },
  urgentText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  actionDue: { fontSize: 14, color: ellioLawTokens.color.text.secondary, marginBottom: ellioLawTokens.spacing.md },
  actionButton: { backgroundColor: ellioLawTokens.color.caseActive, padding: ellioLawTokens.spacing.sm, borderRadius: ellioLawTokens.radius.md, alignItems: 'center' },
  actionButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  upcomingItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: ellioLawTokens.spacing.md },
  upcomingDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: ellioLawTokens.color.caseActive, marginTop: 4, marginRight: ellioLawTokens.spacing.sm },
  upcomingContent: { flex: 1 },
  upcomingTitle: { fontSize: 15, color: ellioLawTokens.color.text.primary, marginBottom: 2 },
  upcomingDate: { fontSize: 13, color: ellioLawTokens.color.text.tertiary },
  activityItem: { backgroundColor: ellioLawTokens.color.background.secondary, padding: ellioLawTokens.spacing.sm, borderRadius: ellioLawTokens.radius.sm, marginBottom: ellioLawTokens.spacing.xs },
  activityDate: { fontSize: 12, color: ellioLawTokens.color.text.tertiary, marginBottom: 2 },
  activityDescription: { fontSize: 14, color: ellioLawTokens.color.text.primary },
  tipsCard: { backgroundColor: ellioLawTokens.color.educationalHighlight + '10', padding: ellioLawTokens.spacing.md, marginHorizontal: ellioLawTokens.spacing.md, marginBottom: ellioLawTokens.spacing.xl, borderRadius: ellioLawTokens.radius.md, borderLeftWidth: 4, borderLeftColor: ellioLawTokens.color.educationalHighlight },
  tipsTitle: { fontSize: 16, fontWeight: '600', color: ellioLawTokens.color.text.primary, marginBottom: ellioLawTokens.spacing.sm },
  tipText: { fontSize: 14, lineHeight: 22, color: ellioLawTokens.color.text.secondary },
});
