import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import Home from '@/assets/images/Home';
import Details from '@/assets/images/Details';
import Account from '@/assets/images/Account';
import { useStorage } from '@/core/storage';

export default function TabLayout() {
  const [isOnboarded] = useStorage('is_onboarded')

  if (isOnboarded === null) {
    return <Redirect href={"/onboarding"} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        tabBarInactiveTintColor: Colors['light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabelStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabelStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <Details color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabelStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <Account color={color} />,
        }}
      />
    </Tabs>
  );
}
