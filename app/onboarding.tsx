import { View, Text, StyleSheet, Dimensions, Platform, FlatList, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import React, { useState, useRef } from 'react';
import { useStorage } from '@/core/storage';
import { router } from 'expo-router';
import ButtonStyle from '../components/ButtonStyle';
import Shape from '../assets/images/Shape 1.svg';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Bienvenue sur Crypt',
    subtitle: 'Commencez votre voyage crypto',
    description: 'Découvrez le monde passionnant des cryptomonnaies',
  },
  {
    id: '2',
    title: 'Trading Simplifié',
    subtitle: 'Achetez et vendez facilement',
    description: 'Une interface intuitive pour vos transactions',
  },
  {
    id: '3',
    title: 'Crypt',
    subtitle: 'Jump start your crypto portfolio',
    description: 'Take your investment portfolio to next level',
  },
];

export default function Onboarding() {
  const [, setIsOnboarded] = useStorage('is_onboarded');
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const registerForPushNotifications = async () => {
    try {
      // Vérifier si c'est un vrai appareil
      if (!Device.isDevice) {
        console.log('Les notifications nécessitent un vrai appareil');
        return;
      }

      // Vérifier les permissions existantes
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Si nous n'avons pas déjà la permission, la demander
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permission refusée');
        return;
      }

      // Obtenir le token
      const token = await Notifications.getExpoPushTokenAsync();
      console.log('Token de notification:', token);

      // Configuration spécifique à Android
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        });
      }
    } catch (error) {
      console.log('Erreur:', error);
    }
  };

  const onSkip = async () => {
    await registerForPushNotifications();
    setIsOnboarded('true');
    router.push('/(tabs)');
  };

  const renderItem = ({ item, index }: { item: Slide; index: number }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <Text style={styles.title}>
          {index === 0 ? (
            <>
              Bienvenue sur Crypt<Text style={styles.highlight}>X</Text>
            </>
          ) : index === 2 ? (
            <>
              {item.title}<Text style={styles.highlight}>X</Text>
            </>
          ) : (
            item.title
          )}
        </Text>
        {index === 2 && <Shape width={width * 1.1} height={width * 1.1} style={styles.shape} />}
        <Text style={[
          styles.subtitle,
          index === 2 ? styles.lastSlideSubtitle : null
        ]}>
          {item.subtitle}
        </Text>
        <Text style={styles.subsubtitle}>
          {item.description}
        </Text>
      </View>
    );
  };

  const renderDots = () => {
    if (currentIndex === 2) return null;

    return (
      <View style={styles.dotContainer}>
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { 
            useNativeDriver: false,
            listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              console.log('Current index:', newIndex);
              setCurrentIndex(newIndex);
            }
          }
        )}
      />
      {currentIndex !== 2 && renderDots()}
      <View style={[
        styles.buttonContainer,
        { opacity: currentIndex === 2 ? 1 : 0, display: currentIndex === 2 ? 'flex' : 'none' }
      ]}>
        <ButtonStyle 
          type="Fill" 
          onPress={onSkip} 
          label="Get Started"
          style={{ paddingVertical: 20 }} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  slide: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 20,
    overflow: 'hidden',
  },
  title: {
    width: '90%',
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  highlight: {
    color: '#6552FE',
  },
  shape: {
    alignSelf: 'center',
    marginTop: -20,
  },
  subtitle: {
    width: '80%',
    fontSize: 35,
    paddingHorizontal: 20,
    color: '#000',
    fontWeight: '600',
  },
  lastSlideSubtitle: {
    marginTop: -40,
  },
  subsubtitle: {
    width: '90%',
    fontSize: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    color: '#666',
    fontWeight: '400',
    lineHeight: 28,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 75,
    width: '100%',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6552FE',
    marginHorizontal: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 100,
  },
});