import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ChatMessage } from '../types/extended';
import { EllioColors, EllioSpacing, EllioBorderRadius } from '../theme/ellioTheme';

interface LegalChatbotProps {
  route?: any;
  navigation?: any;
  caseId?: string;
  userState?: string;
  onClose?: () => void;
}

export const LegalChatbot: React.FC<LegalChatbotProps> = ({ route, navigation, caseId, userState: propUserState, onClose }) => {
  const userState = propUserState || route?.params?.userState || 'your state';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm Ellio, your legal assistant. I can help you with:\n\n• Understanding legal terms and processes\n• Finding legal resources in ${userState}\n• Organizing your case documents\n• Preparing for court\n• Filing deadlines and procedures\n\nWhat would you like help with today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickActions = [
    { id: '1', text: 'How do I file a case?', icon: 'FILE' },
    { id: '2', text: 'Find legal aid near me', icon: 'AID' },
    { id: '3', text: 'Explain court process', icon: 'LAW' },
    { id: '4', text: 'What documents do I need?', icon: 'DOC' },
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(inputText, userState);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleQuickAction = (text: string) => {
    setInputText(text);
  };

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>⚖️</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Ellio Legal Assistant</Text>
            <Text style={styles.headerSubtitle}>AI-powered guidance</Text>
          </View>
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.role === 'user' ? styles.userBubble : styles.assistantBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.role === 'user' ? styles.userText : styles.assistantText,
              ]}
            >
              {message.content}
            </Text>
            <Text style={styles.timestamp}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            
            {message.role === 'assistant' && message.helpful === undefined && (
              <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackLabel}>Was this helpful?</Text>
                <View style={styles.feedbackButtons}>
                  <TouchableOpacity
                    style={styles.feedbackButton}
                    onPress={() => handleFeedback(message.id, true)}
                  >
                    <Text style={styles.feedbackIcon}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.feedbackButton}
                    onPress={() => handleFeedback(message.id, false)}
                  >
                    <Text style={styles.feedbackIcon}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.quickActionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionButton}
              onPress={() => handleQuickAction(action.text)}
            >
              <View style={styles.quickActionIconBox}>
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
              </View>
              <Text style={styles.quickActionText}>{action.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything about your legal case..."
          placeholderTextColor={EllioColors.textLight}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ Ellio provides general information, not legal advice. Consult an attorney for specific guidance.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

// AI Response Generator (placeholder - would connect to real AI in production)
const generateResponse = (question: string, state: string): string => {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes('file') || lowerQuestion.includes('filing')) {
    return `To file a case in ${state}:\n\n1. Determine the correct court (small claims, circuit, district)\n2. Prepare your complaint or petition\n3. Pay the filing fee (or request a fee waiver)\n4. File documents with the court clerk\n5. Serve the defendant\n\nWould you like me to guide you through any specific step? You can also check the Workflows tab for detailed step-by-step instructions.`;
  }

  if (lowerQuestion.includes('legal aid') || lowerQuestion.includes('lawyer')) {
    return `I can help you find free or low-cost legal help in ${state}!\n\nTap the Legal Aid button on the home screen to:\n• Find legal aid organizations near you\n• See eligibility requirements\n• Get contact information\n• Learn about pro bono programs\n\nMany organizations offer free consultations. Would you like me to explain what to prepare for your first call?`;
  }

  if (lowerQuestion.includes('document') || lowerQuestion.includes('evidence')) {
    return `For organizing documents:\n\nCreate folders by category:\n• Court Documents (filings, orders)\n• Evidence (photos, receipts, records)\n• Correspondence (letters, emails)\n• Medical Records\n• Financial Documents\n\nHow it works:\n• Take photos or import files\n• Everything converts to PDF automatically\n• Link documents to timeline events\n\nNeed help with a specific type of document?`;
  }

  if (lowerQuestion.includes('court') || lowerQuestion.includes('hearing')) {
    return `Preparing for court in ${state}:\n\nBefore your hearing:\n• Organize all documents\n• Prepare your timeline of events\n• List your witnesses\n• Practice explaining your case\n• Dress professionally\n• Arrive 30 minutes early\n\nWhat to bring:\n• All relevant documents (3 copies)\n• Witness list\n• Evidence photos/videos\n• Notes on key points\n\nWould you like tips on how to present your case?`;
  }

  if (lowerQuestion.includes('deadline') || lowerQuestion.includes('time')) {
    return `Managing court deadlines is critical!\n\nUse the Deadlines tab to:\n• Track all court dates\n• Set filing deadlines\n• Get overdue warnings\n• Mark completed tasks\n\nIMPORTANT: Court deadlines are strict. If you miss one:\n1. File a motion for extension immediately\n2. Explain why you need more time\n3. Request a specific new date\n\nNeed help calculating when something is due?`;
  }

  // Default response
  return `I understand you're asking about "${question}".\n\nI can help you with:\n• Legal processes and procedures in ${state}\n• Document organization\n• Finding legal resources\n• Understanding court requirements\n• Case preparation tips\n\nCould you rephrase your question or ask something more specific? For example:\n• "How do I file in small claims court?"\n• "What documents do I need for a hearing?"\n• "How do I find a free lawyer?"\n• "What are discovery deadlines?"`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EllioColors.background,
  },
  header: {
    backgroundColor: EllioColors.primary,
    padding: EllioSpacing.md,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: EllioSpacing.sm,
  },
  avatar: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: EllioSpacing.md,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: EllioSpacing.md,
    borderRadius: EllioBorderRadius.md,
    marginBottom: EllioSpacing.sm,
  },
  userBubble: {
    backgroundColor: EllioColors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: EllioColors.surface,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  assistantText: {
    color: EllioColors.text,
  },
  timestamp: {
    fontSize: 11,
    color: EllioColors.textLight,
    marginTop: 4,
  },
  feedbackContainer: {
    marginTop: EllioSpacing.sm,
    paddingTop: EllioSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: EllioColors.border,
  },
  feedbackLabel: {
    fontSize: 12,
    color: EllioColors.textSecondary,
    marginBottom: 4,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  feedbackButton: {
    padding: 6,
  },
  feedbackIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: EllioColors.textSecondary,
  },
  quickActionsContainer: {
    backgroundColor: EllioColors.surface,
    paddingVertical: EllioSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: EllioColors.border,
  },
  quickActionButton: {
    backgroundColor: EllioColors.background,
    paddingHorizontal: EllioSpacing.md,
    paddingVertical: EllioSpacing.sm,
    borderRadius: EllioBorderRadius.md,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickActionIconBox: {
    width: 24,
    height: 24,
    borderRadius: EllioBorderRadius.sm,
    backgroundColor: EllioColors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {
    fontSize: 8,
    fontWeight: 'bold',
    color: EllioColors.primary,
  },
  quickActionText: {
    fontSize: 13,
    color: EllioColors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: EllioSpacing.md,
    backgroundColor: EllioColors.surface,
    borderTopWidth: 1,
    borderTopColor: EllioColors.border,
    gap: EllioSpacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: EllioColors.background,
    borderRadius: EllioBorderRadius.md,
    paddingHorizontal: EllioSpacing.md,
    paddingVertical: EllioSpacing.sm,
    fontSize: 15,
    maxHeight: 100,
    color: EllioColors.text,
  },
  sendButton: {
    backgroundColor: EllioColors.primary,
    paddingHorizontal: EllioSpacing.lg,
    paddingVertical: EllioSpacing.sm,
    borderRadius: EllioBorderRadius.md,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: EllioColors.border,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  disclaimer: {
    backgroundColor: '#FFF3CD',
    padding: EllioSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#FFE4A3',
  },
  disclaimerText: {
    fontSize: 11,
    color: '#856404',
    textAlign: 'center',
  },
});
