import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  TextInput,
} from 'react-native';
import { VIRGINIA_LEGAL_AID } from '../data/legalData';

export const LegalAidScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrgs = VIRGINIA_LEGAL_AID.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.servicesOffered.some((service) =>
        service.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      org.counties.some((county) =>
        county.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const renderOrganization = ({ item }: { item: typeof VIRGINIA_LEGAL_AID[0] }) => (
    <View style={styles.orgCard}>
      <Text style={styles.orgName}>{item.name}</Text>
      <Text style={styles.orgType}>{item.type.replace('_', ' ').toUpperCase()}</Text>
      
      <View style={styles.contactSection}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Linking.openURL(`tel:${item.phone}`)}
        >
          <Text style={styles.contactButtonText}>Call: {item.phone}</Text>
        </TouchableOpacity>
        
        {item.website && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL(item.website!)}
          >
            <Text style={styles.contactButtonText}>Website</Text>
          </TouchableOpacity>
        )}
        
        {item.email && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL(`mailto:${item.email}`)}
          >
            <Text style={styles.contactButtonText}>Email</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Services Offered:</Text>
      {item.servicesOffered.map((service, index) => (
        <Text key={index} style={styles.listItem}>• {service}</Text>
      ))}

      <Text style={styles.sectionTitle}>Counties Served:</Text>
      <Text style={styles.bodyText}>{item.counties.join(', ')}</Text>

      <Text style={styles.sectionTitle}>Eligibility:</Text>
      <Text style={styles.bodyText}>{item.eligibilityCriteria}</Text>

      {item.languages.length > 1 && (
        <>
          <Text style={styles.sectionTitle}>Languages:</Text>
          <Text style={styles.bodyText}>{item.languages.join(', ')}</Text>
        </>
      )}

      <Text style={styles.address}>Address: {item.address}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Legal Aid Finder</Text>
        <Text style={styles.subtitle}>Free and low-cost legal help in Virginia</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by service, county, or organization"
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={filteredOrgs}
        renderItem={renderOrganization}
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
    backgroundColor: '#34C759',
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
    color: '#E8F5E9',
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContainer: {
    padding: 16,
  },
  orgCard: {
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
  orgName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  orgType: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
    marginBottom: 12,
  },
  contactSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
  },
  listItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  bodyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  address: {
    fontSize: 13,
    color: '#007AFF',
    marginTop: 12,
  },
});
