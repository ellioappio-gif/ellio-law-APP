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
  Image,
} from 'react-native';
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
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const conversationFlow = [
    {
      ellioMessage: "Hey there 👋 I'm ellio.",
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
      ellioMessage: "Here's what I can do for you:\n\n• Keep all your documents organized\n• Help you understand legal terms\n• Track important deadlines\n• Find resources near you",
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
        if (flow.needsInput) {
          setTimeout(() => inputRef.current?.focus(), 300);
        }
      }, 100);
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
      text: US_STATES.find(s => s.code === state)?.name || state,
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
          <Image 
            source={require('../../assets/images/ellio-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>legal navigation made simple</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View key={message.id} style={styles.messageWrapper}>
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
              </View>
            )}

            {/* Show state selector if this is the last message and needs state */}
            {index === messages.length - 1 && message.isStateSelector && (
              <View style={styles.stateListContainer}>
                <ScrollView style={styles.stateList} nestedScrollEnabled>
                  {US_STATES.map((state) => (
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
    {
      id: '1',
      title: 'Welcome to ellio Law',
      description: 'Your personal legal assistant for organizing cases, understanding legal processes, and accessing resources across all 50 states.',
      icon: '',
      completed: false,
    },
    {
      id: '2',
      title: 'Organize Your Case',
      description: 'Capture documents, build timelines, track expenses, manage witnesses, and never miss a deadline.',
      icon: 'ORG',
      completed: false,
    },
    {
      id: '3',
      title: 'Get Legal Guidance',
      description: 'Chat with Ellio AI for instant help. Access legal aid, court information, templates, and step-by-step workflows.',
      icon: 'AI',
      completed: false,
    },
    {
      id: '4',
      title: 'Select Your State',
      description: 'Choose your state to access state-specific legal resources, courts, and legal aid organizations.',
      icon: 'LOC',
      completed: false,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (selectedState) {
      onComplete(selectedState);
    }
  };

  const handleSkip = () => {
    setCurrentStep(steps.length - 1);
  };

  const renderStateSelection = () => {
    const states = Object.values(USState).sort();
    
    return (
      <ScrollView style={styles.stateList}>
        {states.map((state) => (
          <TouchableOpacity
            key={state}
            style={[
              styles.stateButton,
              selectedState === state && styles.stateButtonSelected,
            ]}
            onPress={() => setSelectedState(state)}
          >
            <Text
              style={[
                styles.stateButtonText,
                selectedState === state && styles.stateButtonTextSelected,
              ]}
            >
              {state}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ellio law</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index <= currentStep && styles.progressDotActive,
            ]}
          />
        ))}
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.stepIcon}>{currentStepData.icon}</Text>
        </View>

        <Text style={styles.stepTitle}>{currentStepData.title}</Text>
        <Text style={styles.stepDescription}>{currentStepData.description}</Text>

        {isLastStep && renderStateSelection()}

        {!isLastStep && (
          <View style={styles.featuresContainer}>
            {currentStep === 0 && (
              <>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>APP</Text></View>
                  <Text style={styles.featureText}>Works on iPhone and Android</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>SEC</Text></View>
                  <Text style={styles.featureText}>Your data stays private on your device</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>FREE</Text></View>
                  <Text style={styles.featureText}>100% free - no hidden costs</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>USA</Text></View>
                  <Text style={styles.featureText}>All 50 states + federal law</Text>
                </View>
              </>
            )}

            {currentStep === 1 && (
              <>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>TIME</Text></View>
                  <Text style={styles.featureText}>Build visual case timelines</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>$$$</Text></View>
                  <Text style={styles.featureText}>Track expenses and receipts</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>DATE</Text></View>
                  <Text style={styles.featureText}>Never miss court deadlines</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>PPL</Text></View>
                  <Text style={styles.featureText}>Manage witness information</Text>
                </View>
              </>
            )}

            {currentStep === 2 && (
              <>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>AI</Text></View>
                  <Text style={styles.featureText}>AI chatbot for instant legal guidance</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>HELP</Text></View>
                  <Text style={styles.featureText}>Find free legal aid in your area</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>DOC</Text></View>
                  <Text style={styles.featureText}>Fill-in-the-blank legal templates</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIconBox}><Text style={styles.featureIcon}>DEF</Text></View>
                  <Text style={styles.featureText}>Legal dictionary in plain English</Text>
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}

        {!isLastStep && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.nextButton,
            isLastStep && !selectedState && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={isLastStep && !selectedState}
        >
          <Text style={styles.nextButtonText}>
            {isLastStep ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
});
