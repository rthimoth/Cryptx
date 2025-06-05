import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { getCryptoHistoricalData } from '@/query/cryptoService';

interface LiveChartProps extends SvgProps {
  symbol: string;        // Symbole de la crypto (ex: BTCUSDT)
  width?: number;        // Largeur du graphique
  height?: number;       // Hauteur du graphique
  stroke?: string;       // Couleur du trait
  strokeWidth?: number;  // Épaisseur du trait
  interval?: string;     // Intervalle temporel ('1d', '4h', etc.)
  limit?: number;        // Nombre de points
  timePeriod?: '24h' | '7d' | '30d' | '90d' | '1y'; // Période prédéfinie
}

/**
 * Composant pour afficher un graphique en temps réel d'une crypto-monnaie
 */
const LiveChart: React.FC<LiveChartProps> = ({
  symbol,
  width = 80,
  height = 30,
  stroke = "#4CD964",
  strokeWidth = 1.5,
  interval,
  limit,
  timePeriod = '30d',
  ...props
}) => {
  const [pathData, setPathData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Déterminer l'intervalle et la limite en fonction de la période
  const getChartParams = (period: string): { interval: string, limit: number } => {
    switch (period) {
      case '24h':
        return { interval: '15m', limit: 96 }; // 96 points × 15 minutes = 24 heures
      case '7d':
        return { interval: '2h', limit: 84 };  // 84 points × 2 heures = 7 jours
      case '30d':
        return { interval: '8h', limit: 90 };  // 90 points × 8 heures = 30 jours
      case '90d':
        return { interval: '1d', limit: 90 };  // 90 jours
      case '1y':
        return { interval: '3d', limit: 122 }; // 122 points × 3 jours = 1 an
      default:
        return { interval: '1d', limit: 30 };  // Par défaut, 30 jours
    }
  };

  // Récupérer les données historiques et générer le chemin SVG
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Utiliser les paramètres spécifiés ou ceux déterminés par la période
        const params = interval && limit 
          ? { interval, limit } 
          : getChartParams(timePeriod);
        
        // Récupérer les données historiques
        const historicalData = await getCryptoHistoricalData(
          symbol,
          params.interval,
          params.limit
        );
        
        if (historicalData && historicalData.length > 0) {
          // Extraire les prix de clôture
          const closePrices = historicalData.map(point => parseFloat(point.close));
          
          // Créer le chemin SVG
          const svgPath = generateSvgPath(closePrices, width, height);
          setPathData(svgPath);
        } else {
          setError('Aucune donnée disponible');
        }
      } catch (err) {
        console.error(`Erreur lors du chargement des données pour ${symbol}:`, err);
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Déterminer l'intervalle de rafraîchissement en fonction de la période
    const refreshInterval = timePeriod === '24h' ? 1 * 60 * 1000 : 5 * 60 * 1000; // 1 min pour 24h, 5 min pour les autres
    
    // Actualiser les données périodiquement
    const intervalId = setInterval(fetchData, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [symbol, width, height, interval, limit, timePeriod]);

  // Générer le chemin SVG à partir des prix
  const generateSvgPath = (prices: number[], width: number, height: number): string => {
    if (!prices || prices.length === 0) return '';
    
    // Trouver les valeurs min/max pour la normalisation
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Ajouter une marge de 5% en haut et en bas pour un meilleur rendu visuel
    const paddingFactor = 0.05;
    const adjustedMinPrice = minPrice - (priceRange * paddingFactor);
    const adjustedMaxPrice = maxPrice + (priceRange * paddingFactor);
    const adjustedRange = adjustedMaxPrice - adjustedMinPrice;
    
    // Gérer le cas où tous les prix sont identiques
    if (priceRange === 0) {
      const y = height / 2;
      return `M0,${y} L${width},${y}`;
    }
    
    // Calculer l'espacement horizontal
    const step = width / (prices.length - 1);
    
    // Normaliser les prix entre 0 et height (inversé car SVG a l'origine en haut)
    const normalizedPrices = prices.map(price => 
      height - (((price - adjustedMinPrice) / adjustedRange) * height)
    );
    
    // Construire le chemin SVG avec une courbe plus douce
    let path = `M0,${normalizedPrices[0]}`;
    
    // Utiliser une courbe pour un graphique plus fluide
    for (let i = 1; i < normalizedPrices.length; i++) {
      path += ` L${i * step},${normalizedPrices[i]}`;
    }
    
    return path;
  };

  // Afficher un espace vide pendant le chargement
  if (loading) {
    return <View style={[styles.container, { width, height }]} />;
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height} {...props}>
        {pathData && (
          <Path
            d={pathData}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default LiveChart; 