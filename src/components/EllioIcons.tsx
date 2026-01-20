import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface IconProps {
  size?: number;
  color?: string;
}

/**
 * Ellio-branded icon system
 * Minimalist line-style icons matching the Ellio brand aesthetic
 * Purple-first, calm, professional legal design
 */

export const TimelineIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 2v20M12 2l-3 3M12 2l3 3M8 8h8M8 14h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const DeadlineIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="15" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const ExpenseIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v12M9 9h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const VoiceNoteIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 1v6M12 17v6M7 9h10M6 11h12M8 13h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const WitnessIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const SettlementIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M3 12l9-9 9 9M6 12v8h12v-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const EvidenceIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M13 2v7h7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12h8M8 16h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const ServiceIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22v-10h6v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const DiscoveryIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M9 10h.01M13 10h.01M17 10h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const HearingIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="1" />
      <path d="M12 8c-2.21 0-4 1.79-4 4M12 8c2.21 0 4 1.79 4 4M12 4c-4.42 0-8 3.58-8 8M12 4c4.42 0 8 3.58 8 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const MediationIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="8" cy="9" r="3" />
      <circle cx="16" cy="9" r="3" />
      <path d="M8 12c-3.314 0-6 1.343-6 3v2h20v-2c0-1.657-2.686-3-6-3M12 15v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const CourtPrepIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 6h16v12H4zM8 6V3h8v3M6 18v2h12v-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 9h4M9 13h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const JournalIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 4h16v16H4zM7 7h10M7 11h10M7 15h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const CaseStatusIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const HandoffIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M3 9l9-7 9 7" />
      <path d="M5 10v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-10" />
      <path d="M9 14h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const CourtroomIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M3 3h18v18H3zM8 8h8v8H8z" />
      <path d="M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const GlossaryIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
      <path d="M8 10h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const FilingIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const DamageIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 1v6M12 17v6M3 12h6M15 12h6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const ContactIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const NotificationIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const TemplateIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M13 2v7h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const AppealIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const ResearchIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const AnalysisIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M3 3v18h18M7 11l3-3 3 3 3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const MeetingIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18M9 15h2M14 15h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const InsuranceIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 2L3 7v5c0 6 9 11 9 11s9-5 9-11V7l-9-5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 13l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const EthicsIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v6h-6M3 12a9 9 0 0 0 15 6.74l1.46-1.46A9.75 9.75 0 0 0 21 20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const DispositionIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M9 12l2 2 4-4M20.354 15.354A9 9 0 1 0 5.646 5.646" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const DefenseIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 2L3 7v5c0 6 9 11 9 11s9-5 9-11V7l-9-5z" />
      <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

export const StatuteIcon: React.FC<IconProps> = ({ size = 24, color = ellioLawTokens.color.brand }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
      <path d="M8 11h8M8 15h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
