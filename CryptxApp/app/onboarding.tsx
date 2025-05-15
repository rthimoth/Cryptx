import { View, Text } from 'react-native';
import React from 'react';
import { useStorage } from '@/core/storage';
import { router } from 'expo-router';

export default function Onboarding() {
  const [, setIsOnboarded] = useStorage('is_onboarded')

  const onSkip = () => {
    setIsOnboarded('true')
    router.push('/(tabs)')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ONBOARDING SCREEN 🎉</Text>
    </View>
  );
}