import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Settings from '@/assets/images/Settings';
import ButtonStyle from '@/components/ButtonStyle';
import CryptoTabs from '@/components/CryptoTabs';
import ChartComponent from '@/components/ChartComponent';
import { getCryptoInfo, subscribeToPriceUpdates, getCryptoHistoricalData } from '../../query/cryptoService';

export default function Explore() {
  const [currentPrice, setCurrentPrice] = useState<string>('0');
  const [cryptoInfo, setCryptoInfo] = useState<any>({});
  const [selectedCoin, setSelectedCoin] = useState<string>('BTCUSDT');

  useEffect(() => {
    const fetchCryptoInfo = async () => {
      try {
        const info = await getCryptoInfo(selectedCoin);
        setCryptoInfo(info);
      } catch (error) {
        console.error('Erreur lors de la récupération des infos de crypto', error);
      }
    };

    getCryptoHistoricalData(selectedCoin).then((data) => {
      console.log('Historical data:', data[0]);
    });
    fetchCryptoInfo();
  }, [selectedCoin]);

  useEffect(() => {
    const ws = subscribeToPriceUpdates(selectedCoin.toLocaleLowerCase(), (price) => {
      setCurrentPrice(price);
    });

    return () => {
      ws.close();
    };
  }, [selectedCoin]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trading</Text>
        <Settings />
      </View>

      <CryptoTabs 
        coins={['BTC', 'ETH', 'LTC', 'XRP', 'EOS', 'SOL', 'ADA', 'DOT', 'BNB']} 
        onSelectCoin={setSelectedCoin}
      />

      <View style={styles.cryptoInfoContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040' }}
            style={styles.logo}
          />
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
              0 BTC
            </Text>
          </View>
        </View>
      </View>

      <ChartComponent />

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
    </View>
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
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
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
