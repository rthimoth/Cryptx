import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface SkeletonCardProps {
  height?: number;
  borderRadius?: number;
  padding?: number;
  leftSection?: boolean;
  centerSection?: boolean;
  rightSection?: boolean;
  style?: ViewStyle;
}

const AdaptiveSkeletonCard: React.FC<SkeletonCardProps> = ({
  height = 80,
  borderRadius = 16,
  padding = 12,
  leftSection = true,
  centerSection = true,
  rightSection = true,
  style,
}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
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
    <View style={[styles.card, { height, borderRadius, padding }, style]}>
      {leftSection && (
        <View style={styles.leftSection}>
          <Animated.View style={[styles.icon, animatedStyle]} />
          <View style={styles.info}>
            <Animated.View style={[styles.name, animatedStyle]} />
            <Animated.View style={[styles.symbol, animatedStyle]} />
          </View>
        </View>
      )}
      {centerSection && (
        <View style={styles.centerSection}>
          <Animated.View style={[styles.graph, animatedStyle]} />
        </View>
      )}
      {rightSection && (
        <View style={styles.rightSection}>
          <Animated.View style={[styles.price, animatedStyle]} />
          <Animated.View style={[styles.quantity, animatedStyle]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    marginBottom: 15,
    paddingHorizontal: 16, // optional, controls side margin
    },

    leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    },

    centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },

    rightSection: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    },
  icon: {
    width: 34,
    height: 34,
    backgroundColor: '#333333',
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    height: 16,
    backgroundColor: '#333333',
    borderRadius: 4,
    marginBottom: 4,
    width: '80%',
  },
  symbol: {
    height: 14,
    backgroundColor: '#333333',
    borderRadius: 4,
    width: '50%',
  },
  graph: {
    width: 70,
    height: 25,
    backgroundColor: '#333333',
    borderRadius: 4,
  },
  price: {
    height: 16,
    backgroundColor: '#333333',
    borderRadius: 4,
    width: 60,
    marginBottom: 4,
  },
  quantity: {
    height: 12,
    backgroundColor: '#333333',
    borderRadius: 4,
    width: 40,
  },
});

export default AdaptiveSkeletonCard;
