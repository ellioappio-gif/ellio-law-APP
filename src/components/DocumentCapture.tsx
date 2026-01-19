import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'expo-camera';
import { Document, DocumentCategory, DocumentType } from '../types';
import { convertImageToPDF, categorizeDocument, generateDocumentName } from '../utils/documentUtils';

interface DocumentCaptureProps {
  onDocumentCaptured: (document: Document) => void;
  caseId: string;
  folderId?: string;
}

export const DocumentCapture: React.FC<DocumentCaptureProps> = ({
  onDocumentCaptured,
  caseId,
  folderId,
}) => {
  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');

  const requestPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    return cameraPermission.status === 'granted' && mediaLibraryPermission.status === 'granted';
  };

  const handleCameraCapture = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) {
      Alert.alert('Permission Required', 'Camera and media library permissions are required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets[0]) {
      await processImage(result.assets[0].uri);
    }
  };

  const handlePhotoLibrary = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) {
      Alert.alert('Permission Required', 'Media library permission is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets[0]) {
      await processImage(result.assets[0].uri);
    }
  };

  const handleDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const isPDF = asset.mimeType === 'application/pdf';
        
        await processDocument(asset.uri, isPDF);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const processImage = async (uri: string) => {
    try {
      // Convert image to PDF
      const pdfUri = await convertImageToPDF(uri, documentName || 'document');
      
      await createDocument(pdfUri, DocumentType.PDF);
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image');
    }
  };

  const processDocument = async (uri: string, isPDF: boolean) => {
    try {
      const docType = isPDF ? DocumentType.PDF : DocumentType.IMAGE;
      await createDocument(uri, docType);
    } catch (error) {
      console.error('Error processing document:', error);
      Alert.alert('Error', 'Failed to process document');
    }
  };

  const createDocument = async (uri: string, type: DocumentType) => {
    const category = categorizeDocument(documentName, documentDescription);
    const date = new Date();
    const generatedName = generateDocumentName(category, date, documentName);

    const document: Document = {
      id: `${Date.now()}-${Math.random()}`,
      name: generatedName,
      type,
      category,
      uri,
      date,
      description: documentDescription,
      folderId,
    };

    onDocumentCaptured(document);
    
    // Reset form
    setDocumentName('');
    setDocumentDescription('');
    
    Alert.alert('Success', 'Document captured and converted to PDF successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Capture Legal Document</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Document Name (Optional)</Text>
        <TextInput
          style={styles.input}
          value={documentName}
          onChangeText={setDocumentName}
          placeholder="Enter document name"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={documentDescription}
          onChangeText={setDocumentDescription}
          placeholder="Describe the document for better categorization"
          placeholderTextColor="#999"
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCameraCapture}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePhotoLibrary}>
          <Text style={styles.buttonText}>Photo Library</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleDocumentPicker}>
          <Text style={styles.buttonText}>Browse Files</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Virginia Law Compliance</Text>
        <Text style={styles.infoText}>
          All documents are automatically:
          {'\n'}• Converted to PDF format
          {'\n'}• Dated and timestamped
          {'\n'}• Categorized appropriately
          {'\n'}• Named according to legal standards
          {'\n'}• Organized chronologically
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2E7D32',
  },
  infoText: {
    fontSize: 14,
    color: '#1B5E20',
    lineHeight: 20,
  },
});
