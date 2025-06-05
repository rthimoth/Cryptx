import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming 
} from 'react-native-reanimated';

interface SkeletonCardProps {
  index?: number;
}

/**
 * Composant skeleton pour afficher un état de chargement
 * animé pendant que les données des cryptos se chargent
 */
const SkeletonCard: React.FC<SkeletonCardProps> = ({ index = 0 }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    // Animation de pulsation continue
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.skeletonCard}>
      {/* Section gauche: icône et infos */}
      <View style={styles.leftSection}>
        <Animated.View style={[styles.skeletonIcon, animatedStyle]} />
        <View style={styles.skeletonInfo}>
          <Animated.View style={[styles.skeletonName, animatedStyle]} />
          <Animated.View style={[styles.skeletonSymbol, animatedStyle]} />
        </View>
      </View>
      
      {/* Section centrale: graphique */}
      <View style={styles.centerSection}>
        <Animated.View style={[styles.skeletonGraph, animatedStyle]} />
      </View>
      
      {/* Section droite: prix */}
      <View style={styles.rightSection}>
        <Animated.View style={[styles.skeletonPrice, animatedStyle]} />
        <Animated.View style={[styles.skeletonQuantity, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
  rightSection: {
    alignItems: 'flex-end',
    width: '30%',
  },
  skeletonIcon: {
    width: 34,
    height: 34,
    backgroundColor: '#333333',
    borderRadius: 10,
    marginRight: 10,
  },
  skeletonInfo: {
    flex: 1,
  },
  skeletonName: {
    height: 16,
    backgroundColor: '#333333',
    borderRadius: 4,
    marginBottom: 4,
    width: '80%',
  },
  skeletonSymbol: {
    height: 14,
    backgroundColor: '#333333',
    borderRadius: 4,
    width: '50%',
  },
  skeletonGraph: {
    width: 70,
    height: 25,
    backgroundColor: '#333333',
    borderRadius: 4,
  },
  skeletonPrice: {
    height: 16,
    backgroundColor: '#333333',
    borderRadius: 4,
    width: 60,
    marginBottom: 4,
  },
  skeletonQuantity: {
    height: 12,
    backgroundColor: '#333333',
    borderRadius: 4,
    width: 40,
  },
});

export default SkeletonCard;