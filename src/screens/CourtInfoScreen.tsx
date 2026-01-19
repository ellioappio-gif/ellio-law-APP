import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { VIRGINIA_COURTS } from '../data/legalData';

export const CourtInfoScreen: React.FC = () => {
  const renderCourt = ({ item }: { item: typeof VIRGINIA_COURTS[0] }) => (
    <View style={styles.courtCard}>
      <Text style={styles.courtName}>{item.name}</Text>
      <Text style={styles.courtType}>{item.type.replace('_', ' ').toUpperCase()} COURT</Text>
      
      <View style={styles.contactSection}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Linking.openURL(`tel:${item.phone}`)}
        >
          <Text style={styles.contactButtonText}>Call</Text>
        </TouchableOpacity>
        
        {item.website && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL(item.website!)}
          >
            <Text style={styles.contactButtonText}>Website</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.address}>Address: {item.address}</Text>
      <Text style={styles.hours}>Hours: {item.hours}</Text>

      {item.efilingAvailable && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✓ E-Filing Available</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Filing Fees:</Text>
      {item.filingFees.map((fee, index) => (
        <View key={index} style={styles.feeRow}>
          <Text style={styles.feeType}>{fee.type}</Text>
          <Text style={styles.feeAmount}>${fee.amount}</Text>
        </View>
      ))}

      <Text style={styles.jurisdictionText}>
        Jurisdiction: {item.jurisdiction.join(', ')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Virginia Courts</Text>
        <Text style={styles.subtitle}>Court information and filing requirements</Text>
      </View>

      <FlatList
        data={VIRGINIA_COURTS}
        renderItem={renderCourt}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#5856D6',
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
    color: '#E8E7FF',
  },
  listContainer: {
    padding: 16,
  },
  courtCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courtName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  courtType: {
    fontSize: 12,
    color: '#5856D6',
    fontWeight: '600',
    marginBottom: 12,
  },
  contactSection: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  hours: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 8,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  feeType: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  feeAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  jurisdictionText: {
    fontSize: 13,
    color: '#999',
    marginTop: 12,
    fontStyle: 'italic',
  },
});
