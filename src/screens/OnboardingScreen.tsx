import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
} from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { USState } from '../types/extended';
import { ellioLawTokens } from '../theme/ellioLawTokens';
import { US_STATES } from '../data/stateData';

interface Message {
  id: number;
  text: string;
  isEllio: boolean;
  options?: string[];
  isStateSelector?: boolean;
  needsInput?: boolean;
  placeholder?: string;
}

interface OnboardingScreenProps {
  onComplete: (selectedState: USState) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedState, setSelectedState] = useState<USState | null>(null);
  const [userInput, setUserInput] = useState('');
  const [caseName, setCaseName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [voiceMode, setVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const conversationFlow: Array<{
    ellioMessage: string;
    delay: number;
    needsInput?: boolean;
    isStateSelector?: boolean;
    placeholder?: string;
    options?: string[];
  }> = [
    {
      ellioMessage: "Hey there. I'm ellio.",
      delay: 600,
    },
    {
      ellioMessage: "I help people like you navigate legal stuff without feeling lost or overwhelmed.",
      delay: 1000,
    },
    {
      ellioMessage: "So, what's going on? Tell me in your own words...",
      needsInput: true,
      delay: 1200,
    },
    {
      ellioMessage: "I hear you. That sounds stressful.",
      delay: 800,
    },
    {
      ellioMessage: "Here's what I can do for you:\n\nKeep all your documents organized\nHelp you understand legal terms\nTrack important deadlines\nFind resources near you",
      delay: 1400,
    },
    {
      ellioMessage: "Quick question - which state are you in?",
      isStateSelector: true,
      delay: 800,
    },
    {
      ellioMessage: "Got it. One last thing...",
      delay: 700,
    },
    {
      ellioMessage: "What would you call this situation? Just something simple so you can find it later.",
      placeholder: "Like 'Car accident case' or 'Landlord dispute'",
      needsInput: true,
      delay: 900,
    },
  ];

  useEffect(() => {
    // Start the conversation
    showNextMessage(0);
  }, []);

  const speakMessage = async (text: string) => {
    if (!voiceMode) return;
    
    setIsSpeaking(true);
    await Speech.speak(text, {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.9,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const startVoiceInput = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please enable microphone permissions to use voice input.'
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopVoiceInput = async () => {
    if (!recordingRef.current) return;

    try {
      setIsRecording(false);
      await recordingRef.current.stopAndUnloadAsync();
      
      // For now, show a message that transcription will be added
      Alert.alert(
        'Voice Input',
        'Voice transcription will be available soon. For now, please type your response.',
        [{ text: 'OK' }]
      );
      
      recordingRef.current = null;
    } catch (error) {
      Alert.alert('Error', 'Failed to process voice input.');
    }
  };

  const showNextMessage = (step: number) => {
    if (step >= conversationFlow.length) return;

    const flow = conversationFlow[step];
    
    setTimeout(() => {
      const newMessage: Message = {
        id: messages.length,
        text: flow.ellioMessage,
        isEllio: true,
        options: flow.options,
        isStateSelector: flow.isStateSelector,
        needsInput: flow.needsInput,
        placeholder: flow.placeholder,
      };

      setMessages(prev => [...prev, newMessage]);
      setCurrentStep(step);
      
      // Speak the message if voice mode is enabled
      if (voiceMode) {
        speakMessage(flow.ellioMessage);
      }
      
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Auto-scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
        
        // Auto-focus input if needed
        if (flow.needsInput && !voiceMode) {
          setTimeout(() => inputRef.current?.focus(), 300);
        }
      }, 100);

      // Auto-advance if no user input needed
      if (!flow.needsInput && !flow.isStateSelector && !flow.options) {
        setTimeout(() => {
          showNextMessage(step + 1);
        }, 2000);
      }
    }, flow.delay);
  };

  const handleTextInput = () => {
    if (!userInput.trim()) return;

    // Store based on which input this is
    if (currentStep === 2) {
      setUserDescription(userInput);
    } else if (currentStep === 7) {
      setCaseName(userInput);
    }

    // Add user's response
    const userMessage: Message = {
      id: messages.length,
      text: userInput,
      isEllio: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Continue conversation
    setTimeout(() => {
      showNextMessage(currentStep + 1);
    }, 800);
  };

  const handleOptionSelect = (option: string) => {
    // Add user's response
    const userMessage: Message = {
      id: messages.length,
      text: option,
      isEllio: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Continue conversation
    setTimeout(() => {
      showNextMessage(currentStep + 1);
    }, 800);
  };

  const handleStateSelect = (state: USState) => {
    setSelectedState(state);
    
    // Add user's response
    const userMessage: Message = {
      id: messages.length,
      text: US_STATES.find((s) => s.code === state)?.name || state,
      isEllio: false,
    };
    
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Continue conversation
    setTimeout(() => {
      showNextMessage(currentStep + 1);
    }, 800);
  };

  const completeOnboarding = () => {
    const finalMessage: Message = {
      id: messages.length,
      text: `Perfect! I've created "${caseName || 'My Case'}" for you.\n\nLet's get started - I'll show you around! 🚀`,
      isEllio: true,
    };
    
    setMessages(prev => [...prev, finalMessage]);
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Complete onboarding and navigate
    setTimeout(() => {
      onComplete(selectedState!);
    }, 2000);
  };

  // Check if we've completed all inputs
  useEffect(() => {
    if (selectedState && caseName && currentStep >= conversationFlow.length - 1) {
      completeOnboarding();
    }
  }, [selectedState, caseName, currentStep]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ellio</Text>
          <Text style={styles.subtitle}>legal navigation made simple</Text>
        </View>
        
        <View style={styles.inputModeToggle}>
          <TouchableOpacity
            style={[styles.modeButton, !voiceMode && styles.modeButtonActive]}
            onPress={() => {
              setVoiceMode(false);
              Speech.stop();
            }}
          >
            <Text style={[styles.modeButtonText, !voiceMode && styles.modeButtonTextActive]}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, voiceMode && styles.modeButtonActive]}
            onPress={() => setVoiceMode(true)}
          >
            <Text style={[styles.modeButtonText, voiceMode && styles.modeButtonTextActive]}>Voice</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View key={`msg-${index}-${message.id}`} style={styles.messageWrapper}>
            <View style={[
              styles.messageBubble,
              message.isEllio ? styles.ellioBubble : styles.userBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.isEllio ? styles.ellioText : styles.userText
              ]}>
                {message.text}
              </Text>
            </View>

            {/* Show text input if this is the last message and needs input */}
            {index === messages.length - 1 && message.needsInput && (
              <View style={styles.inputContainer}>
                {!voiceMode ? (
                  <>
                    <TextInput
                      ref={inputRef}
                      style={styles.textInput}
                      value={userInput}
                      onChangeText={setUserInput}
                      placeholder={message.placeholder || "Type your answer..."}
                      placeholderTextColor={ellioLawTokens.color.text.tertiary}
                      multiline
                      onSubmitEditing={handleTextInput}
                      returnKeyType="send"
                      blurOnSubmit={false}
                    />
                    <TouchableOpacity
                      style={[
                        styles.sendButton,
                        !userInput.trim() && styles.sendButtonDisabled
                      ]}
                      onPress={handleTextInput}
                      disabled={!userInput.trim()}
                    >
                      <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.voiceInputContainer}>
                    <TouchableOpacity
                      style={[styles.micButton, isRecording && styles.micButtonActive]}
                      onPress={isRecording ? stopVoiceInput : startVoiceInput}
                    >
                      <Text style={styles.micButtonText}>
                        {isRecording ? '⏹ Stop' : '🎤 Tap to speak'}
                      </Text>
                    </TouchableOpacity>
                    {isSpeaking && (
                      <Text style={styles.speakingIndicator}>Speaking...</Text>
                    )}
                  </View>
                )}
              </View>
            )}

            {/* Show state selector if this is the last message and needs state */}
            {index === messages.length - 1 && message.isStateSelector && (
              <View style={styles.stateListContainer}>
                <ScrollView style={styles.stateList} nestedScrollEnabled>
                  {US_STATES.map((state: { code: USState; name: string }) => (
                    <TouchableOpacity
                      key={state.code}
                      style={[
                        styles.stateButton,
                        selectedState === state.code && styles.stateButtonSelected
                      ]}
                      onPress={() => handleStateSelect(state.code)}
                    >
                      <Text style={[
                        styles.stateButtonText,
                        selectedState === state.code && styles.stateButtonTextSelected
                      ]}>
                        {state.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ellioLawTokens.color.background.primary,
  },
  header: {
    paddingTop: 60,
    paddingBottom: ellioLawTokens.spacing.md,
    paddingHorizontal: ellioLawTokens.spacing.lg,
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: ellioLawTokens.color.borderSubtle,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 60,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ellioLawTokens.color.brand,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: ellioLawTokens.color.text.secondary,
    fontStyle: 'italic',
  },
  inputModeToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: ellioLawTokens.spacing.md,
    gap: ellioLawTokens.spacing.sm,
  },
  modeButton: {
    paddingHorizontal: ellioLawTokens.spacing.lg,
    paddingVertical: ellioLawTokens.spacing.sm,
    borderRadius: ellioLawTokens.radius.md,
    backgroundColor: ellioLawTokens.color.background.primary,
    borderWidth: 2,
    borderColor: ellioLawTokens.color.border,
  },
  modeButtonActive: {
    backgroundColor: ellioLawTokens.color.brand,
    borderColor: ellioLawTokens.color.brand,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: ellioLawTokens.color.text.secondary,
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: ellioLawTokens.spacing.lg,
    paddingBottom: ellioLawTokens.spacing.xl,
  },
  messageWrapper: {
    marginBottom: ellioLawTokens.spacing.lg,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.lg,
    marginBottom: ellioLawTokens.spacing.sm,
  },
  ellioBubble: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: ellioLawTokens.color.brand,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  ellioText: {
    color: ellioLawTokens.color.text.primary,
  },
  userText: {
    color: '#fff',
  },
  inputContainer: {
    marginTop: ellioLawTokens.spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: ellioLawTokens.spacing.sm,
  },
  textInput: {
    flex: 1,
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderRadius: ellioLawTokens.radius.lg,
    padding: ellioLawTokens.spacing.md,
    fontSize: 16,
    color: ellioLawTokens.color.text.primary,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 2,
    borderColor: ellioLawTokens.color.borderSubtle,
  },
  sendButton: {
    backgroundColor: ellioLawTokens.color.brand,
    paddingHorizontal: ellioLawTokens.spacing.lg,
    paddingVertical: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.lg,
    minHeight: 48,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: ellioLawTokens.color.border,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    marginTop: ellioLawTokens.spacing.sm,
    gap: ellioLawTokens.spacing.sm,
  },
  optionButton: {
    backgroundColor: ellioLawTokens.color.background.secondary,
    padding: ellioLawTokens.spacing.md,
    borderRadius: ellioLawTokens.radius.md,
    borderWidth: 2,
    borderColor: ellioLawTokens.color.brand,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: ellioLawTokens.color.brand,
    fontWeight: '600',
  },
  stateListContainer: {
    marginTop: ellioLawTokens.spacing.md,
    maxHeight: 300,
    backgroundColor: ellioLawTokens.color.background.secondary,
    borderRadius: ellioLawTokens.radius.lg,
    padding: ellioLawTokens.spacing.sm,
  },
  stateList: {
    maxHeight: 280,
  },
  stateButton: {
    padding: ellioLawTokens.spacing.md,
    backgroundColor: ellioLawTokens.color.background.primary,
    borderRadius: ellioLawTokens.radius.sm,
    marginBottom: 4,
  },
  stateButtonSelected: {
    backgroundColor: ellioLawTokens.color.brand,
  },
  stateButtonText: {
    fontSize: 15,
    color: ellioLawTokens.color.text.primary,
  },
  stateButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  voiceInputContainer: {
    alignItems: 'center',
    paddingVertical: ellioLawTokens.spacing.md,
  },
  micButton: {
    backgroundColor: ellioLawTokens.color.brand,
    paddingHorizontal: ellioLawTokens.spacing.xl,
    paddingVertical: ellioLawTokens.spacing.lg,
    borderRadius: ellioLawTokens.radius.lg,
    minWidth: 200,
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: '#e74c3c',
  },
  micButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  speakingIndicator: {
    marginTop: ellioLawTokens.spacing.sm,
    fontSize: 14,
    color: ellioLawTokens.color.brand,
    fontStyle: 'italic',
  },
});

export default OnboardingScreen;