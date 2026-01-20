import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { ellioLawTokens } from '../theme/ellioLawTokens';

interface PulsatingElephantProps {
  size?: number;
}

/**
 * Animated Ellio elephant icon with pulsating glow effect
 * Matches the official Ellio brand colors and design
 * Used as AI chatbot button throughout the app
 */
export const PulsatingElephant: React.FC<PulsatingElephantProps> = ({ 
  size = 60,
}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulsing = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );
    pulsing.start();
    return () => pulsing.stop();
  }, [pulseAnim]);

  const shadowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const shadowRadius = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 16],
  });

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          shadowOpacity,
          shadowRadius,
          transform: [{ scale }],
        },
      ]}
    >
      <svg width={size - 16} height={size - 16} viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="elephantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B4DB3" />
            <stop offset="50%" stopColor="#6C5CE7" />
            <stop offset="100%" stopColor="#7D6DF0" />
          </linearGradient>
        </defs>
        
        {/* Elephant body */}
        <circle cx="60" cy="70" r="35" fill="url(#elephantGradient)" opacity="0.9" />
        
        {/* Elephant head */}
        <circle cx="60" cy="45" r="28" fill="url(#elephantGradient)" />
        
        {/* Elephant ears */}
        <ellipse cx="35" cy="45" rx="18" ry="25" fill="url(#elephantGradient)" opacity="0.85" />
        <ellipse cx="85" cy="45" rx="18" ry="25" fill="url(#elephantGradient)" opacity="0.85" />
        
        {/* Trunk - curved */}
        <path
          d="M 60 60 Q 65 75 60 85"
          stroke="url(#elephantGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Eyes */}
        <circle cx="50" cy="40" r="3.5" fill="white" />
        <circle cx="70" cy="40" r="3.5" fill="white" />
        
        {/* Tusks */}
        <path
          d="M 50 65 Q 48 75 50 82"
          stroke="#A29BFE"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 70 65 Q 72 75 70 82"
          stroke="#A29BFE"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#f8f9fc',
    shadowColor: ellioLawTokens.color.brand,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});
