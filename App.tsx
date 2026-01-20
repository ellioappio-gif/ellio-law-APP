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
import { TimelineBuilderScreen } from './src/screens/TimelineBuilderScreen';
import { DeadlineTrackerScreen } from './src/screens/DeadlineTrackerScreen';
import { ExpenseTrackerScreen } from './src/screens/ExpenseTrackerScreen';
import { VoiceNotesScreen } from './src/screens/VoiceNotesScreen';
import { WitnessManagerScreen } from './src/screens/WitnessManagerScreen';
import { SettlementCalculatorScreen } from './src/screens/SettlementCalculatorScreen';
import { EvidenceOrganizerScreen } from './src/screens/EvidenceOrganizerScreen';
import { ServiceTrackerScreen } from './src/screens/ServiceTrackerScreen';
import { DiscoveryManagerScreen } from './src/screens/DiscoveryManagerScreen';
import { HearingOutcomesScreen } from './src/screens/HearingOutcomesScreen';
import { MediationPrepScreen } from './src/screens/MediationPrepScreen';
import { CourtAppearancePrepScreen } from './src/screens/CourtAppearancePrepScreen';
import { CaseJournalScreen } from './src/screens/CaseJournalScreen';
import { CaseStatusDashboardScreen } from './src/screens/CaseStatusDashboardScreen';
import { AttorneyHandoffScreen } from './src/screens/AttorneyHandoffScreen';
import { CourtroomAccessScreen } from './src/screens/CourtroomAccessScreen';
import { LegalGlossaryScreen } from './src/screens/LegalGlossaryScreen';
import { FilingChecklistScreen } from './src/screens/FilingChecklistScreen';
import { DamageCalculatorScreen } from './src/screens/DamageCalculatorScreen';
import { ContactManagerScreen } from './src/screens/ContactManagerScreen';
import { CaseTimelineViewerScreen } from './src/screens/CaseTimelineViewerScreen';
import { NotificationCenterScreen } from './src/screens/NotificationCenterScreen';
import { DocumentTemplatesScreen } from './src/screens/DocumentTemplatesScreen';
import { SettlementTrackerScreen } from './src/screens/SettlementTrackerScreen';
import { AppealPlanningScreen } from './src/screens/AppealPlanningScreen';
import { LegalResearchToolScreen } from './src/screens/LegalResearchToolScreen';
import { CaseAnalysisDashboardScreen } from './src/screens/CaseAnalysisDashboardScreen';
import { MeetingNotesScreen } from './src/screens/MeetingNotesScreen';
import { CaseInsuranceTrackerScreen } from './src/screens/CaseInsuranceTrackerScreen';
import { EthicalRulesGuideScreen } from './src/screens/EthicalRulesGuideScreen';
import { DispositionTrackingScreen } from './src/screens/DispositionTrackingScreen';
import { DefenseStrategyScreen } from './src/screens/DefenseStrategyScreen';
import { StatuteOfLimitationsTrackerScreen } from './src/screens/StatuteOfLimitationsTrackerScreen';
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
      // TEMP: Force show onboarding wizard - remove these 2 lines after viewing
      await AsyncStorage.removeItem('onboarding_complete');
      await AsyncStorage.removeItem('user_state');
      
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
        <Stack.Screen name="Timeline" component={TimelineBuilderScreen} />
        <Stack.Screen name="Deadlines" component={DeadlineTrackerScreen} />
        <Stack.Screen name="Expenses" component={ExpenseTrackerScreen} />
        <Stack.Screen name="VoiceNotes" component={VoiceNotesScreen} />
        <Stack.Screen name="Witnesses" component={WitnessManagerScreen} />
        <Stack.Screen name="SettlementCalc" component={SettlementCalculatorScreen} />
        <Stack.Screen name="Evidence" component={EvidenceOrganizerScreen} />
        <Stack.Screen name="Service" component={ServiceTrackerScreen} />
        <Stack.Screen name="Discovery" component={DiscoveryManagerScreen} />
        <Stack.Screen name="HearingOutcomes" component={HearingOutcomesScreen} />
        <Stack.Screen name="MediationPrep" component={MediationPrepScreen} />
        <Stack.Screen name="CourtPrep" component={CourtAppearancePrepScreen} />
        <Stack.Screen name="Journal" component={CaseJournalScreen} />
        <Stack.Screen name="CaseStatus" component={CaseStatusDashboardScreen} />
        <Stack.Screen name="Handoff" component={AttorneyHandoffScreen} />
        <Stack.Screen name="Courtroom" component={CourtroomAccessScreen} />
        <Stack.Screen name="LegalGlossary" component={LegalGlossaryScreen} />
        <Stack.Screen name="FilingChecklist" component={FilingChecklistScreen} />
        <Stack.Screen name="DamageCalc" component={DamageCalculatorScreen} />
        <Stack.Screen name="Contacts" component={ContactManagerScreen} />
        <Stack.Screen name="Timeline2" component={CaseTimelineViewerScreen} />
        <Stack.Screen name="Notifications" component={NotificationCenterScreen} />
        <Stack.Screen name="Templates2" component={DocumentTemplatesScreen} />
        <Stack.Screen name="Settlement" component={SettlementTrackerScreen} />
        <Stack.Screen name="Appeal" component={AppealPlanningScreen} />
        <Stack.Screen name="LegalResearch2" component={LegalResearchToolScreen} />
        <Stack.Screen name="CaseAnalysis" component={CaseAnalysisDashboardScreen} />
        <Stack.Screen name="MeetingNotes" component={MeetingNotesScreen} />
        <Stack.Screen name="Insurance" component={CaseInsuranceTrackerScreen} />
        <Stack.Screen name="EthicalRules" component={EthicalRulesGuideScreen} />
        <Stack.Screen name="Disposition" component={DispositionTrackingScreen} />
        <Stack.Screen name="Defense" component={DefenseStrategyScreen} />
        <Stack.Screen name="StatuteOfLimitations" component={StatuteOfLimitationsTrackerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
