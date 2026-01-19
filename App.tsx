import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreen } from './src/screens/HomeScreen';
import { CaseDetailsScreen } from './src/screens/CaseDetailsScreen';
import { LegalAidScreen } from './src/screens/LegalAidScreen';
import { GlossaryScreen } from './src/screens/GlossaryScreen';
import { CourtInfoScreen } from './src/screens/CourtInfoScreen';
import { TemplatesScreen } from './src/screens/TemplatesScreen';
import { WorkflowsScreen } from './src/screens/WorkflowsScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { CourtFormsScreen } from './src/screens/CourtFormsScreen';
import { LegalResearchScreen } from './src/screens/LegalResearchScreen';
import { ProBonoScreen } from './src/screens/ProBonoScreen';
import { AppealGuideScreen } from './src/screens/AppealGuideScreen';
import { LegalChatbot } from './src/components/LegalChatbot';
import { USState } from './src/types/extended';

const Stack = createStackNavigator();

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [userState, setUserState] = useState<USState | null>(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingComplete = await AsyncStorage.getItem('onboarding_complete');
      const savedState = await AsyncStorage.getItem('user_state');
      
      setHasCompletedOnboarding(onboardingComplete === 'true');
      if (savedState) {
        setUserState(savedState as USState);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setHasCompletedOnboarding(false);
    }
  };

  const handleOnboardingComplete = async (selectedState: USState) => {
    try {
      await AsyncStorage.setItem('onboarding_complete', 'true');
      await AsyncStorage.setItem('user_state', selectedState);
      setUserState(selectedState);
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

  // Show loading screen while checking onboarding status
  if (hasCompletedOnboarding === null) {
    return null;
  }

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          initialParams={{ userState }}
        />
        <Stack.Screen name="CaseDetails" component={CaseDetailsScreen} />
        <Stack.Screen name="LegalAid" component={LegalAidScreen} />
        <Stack.Screen name="Glossary" component={GlossaryScreen} />
        <Stack.Screen name="CourtInfo" component={CourtInfoScreen} />
        <Stack.Screen name="Templates" component={TemplatesScreen} />
        <Stack.Screen name="Workflows" component={WorkflowsScreen} />
        <Stack.Screen name="CourtForms" component={CourtFormsScreen} />
        <Stack.Screen name="LegalResearch" component={LegalResearchScreen} />
        <Stack.Screen name="ProBono" component={ProBonoScreen} />
        <Stack.Screen name="AppealGuide" component={AppealGuideScreen} />
        <Stack.Screen 
          name="Chatbot" 
          component={LegalChatbot}
          initialParams={{ userState }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
