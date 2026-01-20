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

interface Item {
  id: string;
  title: string;
  description?: string;
}

export const CourtAppearancePrepScreen: React.FC<any> = ({ route, navigation }) => {
  const { caseId } = route.params || {};
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddItem = () => {
    if (!title.trim()) return;
    const newItem: Item = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
    };
    setItems([...items, newItem]);
    setTitle('');
    setDescription('');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Court Appearance</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={ellioLawTokens.color.text.secondary}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={ellioLawTokens.color.text.secondary}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.description && (
                <Text style={styles.itemDescription}>{item.description}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(item.id)}
            >
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {items.length === 0 && (
        <Text style={styles.emptyText}>No items yet</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ellioLawTokens.color.background.primary,
  },
  header: {
    paddingHorizontal: ellioLawTokens.spacing.lg,
    paddingTop: ellioLawTokens.spacing.lg,
    paddingBottom: ellioLawTokens.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: ellioLawTokens.color.border,
  },
  title: {
    fontSize: ellioLawTokens.fontSizes.xl,
    fontWeight: ellioLawTokens.fontWeights.bold,
    color: ellioLawTokens.color.text.primary,
  },
  form: {
    padding: ellioLawTokens.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: ellioLawTokens.color.border,
  },
  input: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderWidth: 1,
    borderColor: ellioLawTokens.color.border,
    borderRadius: ellioLawTokens.radius.md,
    paddingHorizontal: ellioLawTokens.spacing.md,
    paddingVertical: ellioLawTokens.spacing.sm,
    marginBottom: ellioLawTokens.spacing.md,
    fontSize: ellioLawTokens.fontSizes.base,
    color: ellioLawTokens.color.text.primary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: ellioLawTokens.color.brand,
    paddingVertical: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: ellioLawTokens.fontSizes.base,
    fontWeight: ellioLawTokens.fontWeights.semibold,
    color: ellioLawTokens.color.text.inverse,
  },
  listContainer: {
    padding: ellioLawTokens.spacing.lg,
  },
  listItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: ellioLawTokens.color.border,
    paddingVertical: ellioLawTokens.spacing.md,
    alignItems: 'flex-start',
  },
  itemInfo: {
    flex: 1,
    paddingRight: ellioLawTokens.spacing.md,
  },
  itemTitle: {
    fontSize: ellioLawTokens.fontSizes.base,
    fontWeight: ellioLawTokens.fontWeights.semibold,
    color: ellioLawTokens.color.text.primary,
    marginBottom: ellioLawTokens.spacing.xs,
  },
  itemDescription: {
    fontSize: ellioLawTokens.fontSizes.sm,
    color: ellioLawTokens.color.text.secondary,
  },
  deleteButton: {
    paddingHorizontal: ellioLawTokens.spacing.md,
    paddingVertical: ellioLawTokens.spacing.sm,
  },
  deleteButtonText: {
    fontSize: ellioLawTokens.fontSizes.lg,
    color: ellioLawTokens.color.text.secondary,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: ellioLawTokens.fontSizes.base,
    color: ellioLawTokens.color.text.secondary,
    paddingVertical: ellioLawTokens.spacing.xl,
  },
});
