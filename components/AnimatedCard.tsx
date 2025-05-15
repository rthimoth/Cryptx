import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, { 
  FadeInDown,
  FadeInUp,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  SlideInDown,
  SlideInUp,
  SlideInLeft,
  SlideInRight,
  ZoomIn
} from 'react-native-reanimated';

interface AnimatedCardProps {
  index: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  delay?: number; // Délai supplémentaire en ms
  duration?: number; // Durée de l'animation en ms
  animation?: 'fadeDown' | 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'slideDown' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoom';
}

/**
 * Composant réutilisable pour animer n'importe quel contenu avec différents effets
 * 
 * @param props.index - Index pour calculer le délai entre les éléments
 * @param props.children - Contenu à animer
 * @param props.style - Styles optionnels à appliquer au conteneur
 * @param props.delay - Délai supplémentaire en ms (par défaut: 100)
 * @param props.duration - Durée de l'animation en ms (par défaut: 500)
 * @param props.animation - Type d'animation (par défaut: 'fadeDown')
 */
const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  index, 
  children, 
  style, 
  delay = 100, 
  duration = 500,
  animation = 'fadeDown'
}) => {
  // Fonction pour sélectionner l'animation basée sur le type
  const getAnimation = () => {
    switch (animation) {
      case 'fadeDown':
        return FadeInDown.duration(duration).delay(index * delay);
      case 'fadeUp':
        return FadeInUp.duration(duration).delay(index * delay);
      case 'fadeIn':
        return FadeIn.duration(duration).delay(index * delay);
      case 'fadeLeft':
        return FadeInLeft.duration(duration).delay(index * delay);
      case 'fadeRight':
        return FadeInRight.duration(duration).delay(index * delay);
      case 'slideDown':
        return SlideInDown.duration(duration).delay(index * delay);
      case 'slideUp':
        return SlideInUp.duration(duration).delay(index * delay);
      case 'slideLeft':
        return SlideInLeft.duration(duration).delay(index * delay);
      case 'slideRight':
        return SlideInRight.duration(duration).delay(index * delay);
      case 'zoom':
        return ZoomIn.duration(duration).delay(index * delay);
      default:
        return FadeInDown.duration(duration).delay(index * delay);
    }
  };

  return (
    <Animated.View
      entering={getAnimation()}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedCard; 