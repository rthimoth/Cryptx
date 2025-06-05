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
      {/* Section gauche: logo et infos */}
      <View style={styles.leftSection}>
        <View style={styles.cryptoIconContainer}>
          <IconComponent
            width={18}
            height={18}
            style={styles.cryptoIcon}
          />
        </View>
        <View style={styles.cryptoInfo}>
          <Text style={styles.cryptoName} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
          <Text style={styles.cryptoSymbol}>{symbol}</Text>
        </View>
      </View>
      
      {/* Section centrale: graphique */}
      <View style={styles.centerSection}>
        <View style={styles.cryptoGraph}>
          <GraphComponent 
            style={styles.graphLine}
            stroke={graphStrokeColor}
          />
        </View>
      </View>
      
      {/* Section droite: prix */}
      <View style={styles.rightSection}>
        <View style={styles.cryptoValue}>
          <Text style={styles.cryptoPrice}>{price}</Text>
          <Text style={styles.cryptoQuantity}>{quantity}</Text>
        </View>
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
  cryptoIconContainer: {
    width: 34,
    height: 34,
    backgroundColor: '#333333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cryptoIcon: {
    width: 18,
    height: 18,
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cryptoSymbol: {
    color: '#8E8E93',
    fontSize: 12,
  },
  cryptoGraph: {
    width: 70,
    height: 25,
    alignSelf: 'center',
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  cryptoQuantity: {
    color: '#8E8E93',
    fontSize: 11,
  },
});

export default CryptoCard; 