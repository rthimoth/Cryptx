import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import BitcoinLogo from '@/assets/images/BitcoinLogo';
import EthLogo from '@/assets/images/ETHLogo';
import XrpLogo from '@/assets/images/xrpusdt';
import AdaLogo from '@/assets/images/ada';
import DogeLogo from '@/assets/images/doge';
import SolLogo from '@/assets/images/sol';
import BnbLogo from '@/assets/images/bnb';
import LtcLogo from '@/assets/images/ltc';
import DotLogo from '@/assets/images/dot';
import EosLogo from '@/assets/images/eos'
import Animated, { FadeIn, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { useCallback } from 'react';
import Settings from '@/assets/images/Settings';
import ButtonStyle from '@/components/ButtonStyle';
import CryptoTabs from '@/components/CryptoTabs';
import LiveChartDetails from '@/components/LiveChartDetails';
import {
  getCryptoInfo,
  subscribeToPriceUpdates,
  getCryptoHistoricalData,
} from '../../query/cryptoService';
import AdaptiveSkeletonCard from '@/components/AdaptiveSkeletonCard';

const screenWidth = Dimensions.get('window').width;
const chartWidth = Math.min(screenWidth * 0.9, 350);

export default function Explore() {
  const params = useLocalSearchParams();
  const [currentPrice, setCurrentPrice] = useState<string>('0');
  const [cryptoInfo, setCryptoInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const initialCrypto = (params.crypto as string) || 'BTC';
  const opacity = useSharedValue(0);
  
  // Utiliser le paramètre passé ou BTC par défaut
  const [selectedCoin, setSelectedCoin] = useState<string>(`${initialCrypto}USDT`);

  const coinLogos: Record<string, any> = {
    XRP: XrpLogo,
    BTC: BitcoinLogo,
    ETH: EthLogo,
    ADA: AdaLogo,
    DOGE: DogeLogo,
    SOL: SolLogo,
    BNB: BnbLogo,
    LTC: LtcLogo,
    DOT: DotLogo,
    EOS: EosLogo
  }

  // Style animé
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // Animation à chaque fois que la page reçoit le focus
  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      opacity.value = withTiming(1, { duration: 400 });
    }, [opacity])
  );

  useEffect(() => {
    const fetchCryptoInfo = async () => {
      try {
        setLoading(true);
        const info = await getCryptoInfo(selectedCoin);
        setCryptoInfo(info);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des infos de crypto', error);
        setLoading(false);
      }
    };

    getCryptoHistoricalData(selectedCoin).then((data) => {
      console.log('Historical data:', data[0]);
    });

    fetchCryptoInfo();
  }, [selectedCoin]);

  useEffect(() => {
    const ws = subscribeToPriceUpdates(selectedCoin.toLowerCase(), (price) => {
      setCurrentPrice(price);
    });

    return () => {
      ws.close();
    };
  }, [selectedCoin]);

  useEffect(() => {
    if (params.crypto && params.crypto !== selectedCoin.replace('USDT', '')) {
      setSelectedCoin(`${params.crypto}USDT`);
    }
  }, [params.crypto]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trading</Text>
        <Settings />
      </View>

      <CryptoTabs
        coins={['BTC', 'ETH', 'LTC', 'XRP', 'EOS', 'SOL', 'ADA', 'DOT', 'BNB']}
        onSelectCoin={setSelectedCoin}
        selectedCoin={selectedCoin.replace('USDT', '')}
      />

      {loading ? (
        <AdaptiveSkeletonCard
          height={60}
          padding={0}
          borderRadius={6}
          leftSection
          centerSection={false}
          rightSection
          style={{
            margin: 15,
            paddingHorizontal: 20,
            width: '90%',
          }}
        />
      ) : (
        <View style={styles.cryptoInfoContainer}>
          <View style={styles.logoContainer}>
            {
              (() => {
                const Symbol = selectedCoin.replace('USDT', '');
                const SvgIcon = coinLogos[Symbol] || coinLogos.BTC;
                return SvgIcon ? <SvgIcon width={40} height={40} /> : null;
              })()
            } 
          </View>

          <View style={styles.cryptoDetails}>
            <View style={styles.row}>
              <Text style={styles.cryptoName}>
                {cryptoInfo.name || 'Loading...'}
              </Text>
              <Text style={styles.cryptoPrice}>
                ${parseFloat(currentPrice).toFixed(2)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cryptoSymbol}>
                {cryptoInfo.symbol || 'Loading...'}
              </Text>
              <Text style={styles.cryptoAmount}>
                0 {selectedCoin.replace('USDT', '')}
              </Text>
            </View>
          </View>
        </View>
      )}

      {loading ? (
        <AdaptiveSkeletonCard
          height={185}
          padding={16}
          borderRadius={12}
          leftSection={false}
          centerSection={false}
          rightSection={false}
          style={{ width: '90%' }} 
        />
      ) : (
        <View style={{ width: chartWidth, alignSelf: 'flex-start', height: 200 }}>
          <LiveChartDetails
            symbol={selectedCoin}
            width={chartWidth}
            height={200}
            stroke="#4CD964"
            strokeWidth={2}
            timePeriod="7d"
          />
        </View>
      )}


      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <ButtonStyle
            type="Fill"
            label="Buy"
            onPress={() => console.log('Buy pressed')}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonStyle
            type="Transparent"
            label="Sell"
            onPress={() => console.log('Sell pressed')}
          />
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>At Price | USD</Text>
        <Text style={styles.infoValue}>0</Text>
        <View style={styles.separator} />
      </View>

      <View style={styles.infoSection}>
        <View style={styles.row}>
          <View style={styles.amountWrapper}>
            <Text style={styles.infoLabel}>Amount</Text>
            <Text style={styles.infoValue}>0 USD</Text>
          </View>

          <View style={styles.percentageWrapper}>
            <Text style={styles.percentage}>25%</Text>
            <Text style={styles.percentage}>50%</Text>
            <Text style={styles.percentage}>100%</Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    alignItems: 'center',
    paddingBottom: 80,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
    marginRight: 10,
  },
  cryptoInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  logoContainer: {
    height: 60,
    width: 60,
    borderRadius: 6,
    backgroundColor: '#212125',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  cryptoDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cryptoName: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  cryptoPrice: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  cryptoSymbol: {
    color: '#6C757D',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  cryptoAmount: {
    color: '#6C757D',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginTop: 20,
  },
  infoSection: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  infoLabel: {
    color: '#B9C1D9',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  infoValue: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#6C757D',
    marginTop: 10,
    width: '100%',
    marginBottom: 10,
  },
  amountWrapper: {
    alignItems: 'flex-start',
  },
  percentageWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    paddingRight: 50,
    width: '100%',
  },
  percentage: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    paddingRight: 10,
  },
});
