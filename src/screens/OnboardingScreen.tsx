import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { OnboardingStep, USState } from '../types/extended';
import { EllioColors, EllioSpacing, EllioBorderRadius } from '../theme/ellioTheme';

interface OnboardingScreenProps {
  onComplete: (selectedState: USState) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedState, setSelectedState] = useState<USState | null>(null);

  const steps: OnboardingStep[] = [
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
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: EllioSpacing.lg,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: EllioColors.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: EllioSpacing.sm,
    paddingVertical: EllioSpacing.lg,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: EllioColors.border,
  },
  progressDotActive: {
    backgroundColor: EllioColors.primary,
    width: 24,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: EllioSpacing.xl,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: EllioColors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: EllioSpacing.lg,
  },
  stepIcon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: EllioColors.primary,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: EllioColors.text,
    textAlign: 'center',
    marginBottom: EllioSpacing.md,
  },
  stepDescription: {
    fontSize: 16,
    color: EllioColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: EllioSpacing.xl,
  },
  featuresContainer: {
    width: '100%',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EllioColors.background,
    padding: EllioSpacing.md,
    borderRadius: EllioBorderRadius.md,
    marginBottom: EllioSpacing.sm,
  },
  featureIconBox: {
    width: 48,
    height: 48,
    borderRadius: EllioBorderRadius.sm,
    backgroundColor: EllioColors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: EllioSpacing.md,
  },
  featureIcon: {
    fontSize: 12,
    fontWeight: 'bold',
    color: EllioColors.primary,
  },
  featureText: {
    fontSize: 15,
    color: EllioColors.text,
    flex: 1,
  },
  stateList: {
    width: '100%',
    maxHeight: 300,
  },
  stateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: EllioColors.background,
    padding: EllioSpacing.md,
    borderRadius: EllioBorderRadius.sm,
    marginBottom: 4,
  },
  stateButtonSelected: {
    backgroundColor: EllioColors.primary,
  },
  stateButtonText: {
    fontSize: 15,
    color: EllioColors.text,
  },
  stateButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    padding: EllioSpacing.lg,
    gap: EllioSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: EllioColors.border,
  },
  backButton: {
    paddingHorizontal: EllioSpacing.lg,
    paddingVertical: EllioSpacing.md,
    borderRadius: EllioBorderRadius.md,
    backgroundColor: EllioColors.background,
  },
  backButtonText: {
    fontSize: 16,
    color: EllioColors.text,
    fontWeight: '600',
  },
  skipButton: {
    flex: 1,
    paddingVertical: EllioSpacing.md,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    color: EllioColors.textSecondary,
  },
  nextButton: {
    flex: 2,
    backgroundColor: EllioColors.primary,
    paddingVertical: EllioSpacing.md,
    borderRadius: EllioBorderRadius.md,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: EllioColors.border,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
