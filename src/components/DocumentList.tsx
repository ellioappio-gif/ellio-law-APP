import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Document, DocumentCategory } from '../types';
import { shareDocument, sortDocumentsChronologically } from '../utils/documentUtils';

interface DocumentListProps {
  documents: Document[];
  onDocumentPress?: (document: Document) => void;
  onDocumentDelete?: (documentId: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDocumentPress,
  onDocumentDelete,
}) => {
  const sortedDocuments = sortDocumentsChronologically(documents);

  const handleShare = async (document: Document) => {
    try {
      await shareDocument(document.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to share document');
    }
  };

  const handleDelete = (documentId: string) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDocumentDelete?.(documentId),
        },
      ]
    );
  };

  const getCategoryColor = (category: DocumentCategory): string => {
    const colors: Record<DocumentCategory, string> = {
      [DocumentCategory.EVIDENCE]: '#FF9800',
      [DocumentCategory.COURT_DOCUMENTS]: '#2196F3',
      [DocumentCategory.CORRESPONDENCE]: '#9C27B0',
      [DocumentCategory.MEDICAL_RECORDS]: '#F44336',
      [DocumentCategory.POLICE_REPORTS]: '#3F51B5',
      [DocumentCategory.WITNESS_STATEMENTS]: '#009688',
      [DocumentCategory.CONTRACTS]: '#795548',
      [DocumentCategory.RECEIPTS]: '#4CAF50',
      [DocumentCategory.PHOTOS]: '#FF5722',
      [DocumentCategory.OTHER]: '#607D8B',
    };
    return colors[category] || '#607D8B';
  };

  const renderDocument = ({ item }: { item: Document }) => (
    <TouchableOpacity
      style={styles.documentCard}
      onPress={() => onDocumentPress?.(item)}
    >
      <View style={styles.documentHeader}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: getCategoryColor(item.category) },
          ]}
        >
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.dateText}>
          {item.date.toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.documentName}>{item.name}</Text>
      
      {item.description && (
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShare(item)}
        >
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (sortedDocuments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No documents yet</Text>
        <Text style={styles.emptySubtext}>
          Start capturing documents using the camera or upload from your device
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sortedDocuments}
      renderItem={renderDocument}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  documentCard: {
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
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
});
