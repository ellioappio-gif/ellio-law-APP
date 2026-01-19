import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import { DOCUMENT_TEMPLATES } from '../data/legalData';
import { DocumentTemplate } from '../types';

export const TemplatesScreen: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const fillTemplate = () => {
    if (!selectedTemplate) return '';

    let filledContent = selectedTemplate.content;

    selectedTemplate.fields.forEach((field) => {
      const value = formData[field.name] || `[${field.label}]`;
      filledContent = filledContent.replace(
        new RegExp(`\\[${field.name.toUpperCase()}\\]`, 'g'),
        value
      );
    });

    return filledContent;
  };

  const handleShare = async () => {
    const content = fillTemplate();
    try {
      await Share.share({
        message: content,
        title: selectedTemplate?.name,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share template');
    }
  };

  const renderTemplate = ({ item }: { item: DocumentTemplate }) => (
    <TouchableOpacity
      style={styles.templateCard}
      onPress={() => {
        setSelectedTemplate(item);
        setFormData({});
      }}
    >
      <Text style={styles.templateName}>{item.name}</Text>
      <Text style={styles.templateCategory}>{item.category}</Text>
      <Text style={styles.caseTypes}>
        Suitable for: {item.caseTypes.join(', ')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Document Templates</Text>
        <Text style={styles.subtitle}>Pre-formatted legal documents for Virginia</Text>
      </View>

      <FlatList
        data={DOCUMENT_TEMPLATES}
        renderItem={renderTemplate}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={selectedTemplate !== null}
        animationType="slide"
        onRequestClose={() => setSelectedTemplate(null)}
      >
        {selectedTemplate && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedTemplate(null)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedTemplate.name}</Text>
              <TouchableOpacity onPress={handleShare}>
                <Text style={styles.shareButton}>Share</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.instructionsBox}>
                <Text style={styles.instructionsTitle}>Instructions</Text>
                <Text style={styles.instructionsText}>{selectedTemplate.instructions}</Text>
              </View>

              <Text style={styles.formTitle}>Fill in the Fields:</Text>
              {selectedTemplate.fields.map((field) => (
                <View key={field.name} style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>
                    {field.label} {field.required && '*'}
                  </Text>
                  <TextInput
                    style={styles.fieldInput}
                    value={formData[field.name] || ''}
                    onChangeText={(text) =>
                      setFormData({ ...formData, [field.name]: text })
                    }
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    placeholderTextColor="#999"
                  />
                </View>
              ))}

              <Text style={styles.previewTitle}>Preview:</Text>
              <View style={styles.previewBox}>
                <Text style={styles.previewText}>{fillTemplate()}</Text>
              </View>
            </ScrollView>
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
    backgroundColor: '#FF9500',
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
    color: '#FFF3E0',
  },
  listContainer: {
    padding: 16,
  },
  templateCard: {
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
  templateName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  templateCategory: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '500',
    marginBottom: 8,
  },
  caseTypes: {
    fontSize: 13,
    color: '#666',
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
    backgroundColor: '#FF9500',
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
  shareButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  instructionsBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E65100',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#E65100',
    lineHeight: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 24,
    marginBottom: 12,
  },
  previewBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 40,
  },
  previewText: {
    fontSize: 13,
    color: '#333',
    fontFamily: 'Courier',
    lineHeight: 20,
  },
});
