import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Group from '@/assets/images/Group';

interface BackgroundGradientProps {
  height?: number | string;
  zIndex?: number;
}

/**
 * Arrière-plan dégradé réutilisable avec le composant Group
 * 
 * @param props.height - Hauteur de l'arrière-plan (défaut: "100%")
 * @param props.zIndex - Z-index de l'arrière-plan (défaut: 0)
 */
const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  height = "100%",
  zIndex = 0
}) => {
  const windowWidth = Dimensions.get('window').width;
  
  return (
    <View style={[styles.container, { height, zIndex }]}>
      <Group style={styles.gradient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
  gradient: {
    width: Dimensions.get('window').width,
    height: '100%',
  }
});

export default BackgroundGradient; 