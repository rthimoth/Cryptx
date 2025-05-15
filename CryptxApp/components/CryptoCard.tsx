import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import AnimatedCard from './AnimatedCard';

interface CryptoCardProps {
  index: number;
  name: string;
  symbol: string;
  price: string;
  quantity: string;
  iconComponent: React.FC<SvgProps>;
  graphComponent: React.FC<SvgProps>;
  graphStrokeColor?: string;
  animationDelay?: number;
  animationType?: 'fadeDown' | 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'slideDown' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoom';
}

/**
 * Composant de carte pour afficher les informations d'une crypto-monnaie
 * 
 * @param props.index - Index pour calculer le délai d'animation
 * @param props.name - Nom de la crypto-monnaie (ex: "Bitcoin")
 * @param props.symbol - Symbole de la crypto-monnaie (ex: "BTC")
 * @param props.price - Prix formaté en chaîne de caractères (ex: "$26927")
 * @param props.quantity - Quantité formatée en chaîne de caractères (ex: "2.05 BTC")
 * @param props.iconComponent - Composant SVG pour l'icône de la crypto-monnaie
 * @param props.graphComponent - Composant SVG pour le graphique
 * @param props.graphStrokeColor - Couleur de la ligne du graphique
 * @param props.animationDelay - Délai entre les animations (ms)
 * @param props.animationType - Type d'animation à utiliser
 */
const CryptoCard: React.FC<CryptoCardProps> = ({
  index,
  name,
  symbol,
  price,
  quantity,
  iconComponent: IconComponent,
  graphComponent: GraphComponent,
  graphStrokeColor = "#4CD964",
  animationDelay = 250,
  animationType = "fadeDown"
}) => {
  return (
    <AnimatedCard
      index={index}
      style={styles.cryptoCard}
      delay={animationDelay}
      animation={animationType}
    >
      <View style={styles.cryptoIconContainer}>
        <IconComponent
          width={24}
          height={24}
          style={styles.cryptoIcon}
        />
      </View>
      <View style={styles.cryptoInfo}>
        <Text style={styles.cryptoName}>{name}</Text>
        <Text style={styles.cryptoSymbol}>{symbol}</Text>
      </View>
      <View style={styles.cryptoGraph}>
        <GraphComponent 
          style={styles.graphLine}
          stroke={graphStrokeColor}
        />
      </View>
      <View style={styles.cryptoValue}>
        <Text style={styles.cryptoPrice}>{price}</Text>
        <Text style={styles.cryptoQuantity}>{quantity}</Text>
      </View>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  cryptoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },
  cryptoIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#333333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cryptoIcon: {
    width: 24,
    height: 24,
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cryptoSymbol: {
    color: '#8E8E93',
    fontSize: 14,
  },
  cryptoGraph: {
    width: 80,
    height: 30,
    marginHorizontal: 10,
  },
  graphLine: {
    width: '100%',
    height: '100%',
  },
  cryptoValue: {
    alignItems: 'flex-end',
  },
  cryptoPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cryptoQuantity: {
    color: '#8E8E93',
    fontSize: 12,
  },
});

export default CryptoCard; 