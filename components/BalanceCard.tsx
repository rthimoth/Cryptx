import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AnimatedCard from './AnimatedCard';

interface BalanceCardProps {
  balance: string;
  percentChange: string;
  isPositive?: boolean;
  backgroundImage?: any;
  label?: string;
  // animation?: 'fadeDown' | 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'slideDown' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoom';
}

/**
 * Carte réutilisable pour afficher un solde avec une variation en pourcentage
 * 
 * @param props.balance - Le montant du solde à afficher (ex: "$87,430.12")
 * @param props.percentChange - Le pourcentage de variation (ex: "10.2%")
 * @param props.isPositive - Si la variation est positive ou négative (défaut: true)
 * @param props.backgroundImage - Image d'arrière-plan (défaut: Rectangle.png)
 * @param props.label - Texte d'en-tête de la carte (défaut: "Current Balance")
 * @param props.animation - Type d'animation à utiliser
 */
const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  percentChange,
  isPositive = true,
  backgroundImage = require('@/assets/images/Rectangle.png'),
  label = "Current Balance",
  // animation = "fadeIn"
}) => {
  return (
    <AnimatedCard
      index={0}
      style={styles.balanceCard}
      // animation={animation}
    >
      <Image 
        source={backgroundImage}
        style={styles.balanceBackground}
        resizeMode="cover"
      />
      <Text style={styles.balanceLabel}>{label}</Text>
      <View style={styles.balanceRow}>
        <Text style={styles.balanceAmount}>{balance}</Text>
        <Text style={[
          styles.balancePercent, 
          { color: isPositive ? '#8833ff' : '#FF3B30' }
        ]}>
          {isPositive ? '↑' : '↓'} {percentChange}
        </Text>
      </View>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    width: '100%',
    padding: 16,
    borderRadius: 20,
    position: 'relative',
    marginLeft: 30,
    height: 150,
    overflow: 'hidden',
  },
  balanceBackground: {
    position: 'absolute',
    width: '100%',
    height: '120%',
    top: 0,
    left: 0,
    borderRadius: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#070707',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#070707',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  balancePercent: {
    marginRight: 35,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BalanceCard; 