import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Settings from '@/assets/images/Settings';
import ButtonStyle from '@/components/ButtonStyle';
import CryptoTabs from '@/components/CryptoTabs';
import ChartComponent from '@/components/ChartComponent';
import { getCryptoInfo, subscribeToPriceUpdates } from '../../query/cryptoService';

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
    <View style={{ flex: 1, backgroundColor: '#070707', alignItems: 'center', paddingBottom: 80, paddingTop: 50 }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
        <Text style={{
          fontSize: 30,
          color: '#FFF',
          fontFamily: 'Poppins-Regular',
          marginRight: 10,
        }}>
          Trading
        </Text>
        <Settings />
      </View>

      <CryptoTabs 
        coins={['BTC', 'ETH', 'LTC', 'XRP', 'EOS', 'SOL', 'ADA', 'DOT', 'BNB']} 
        onSelectCoin={setSelectedCoin}
      />

      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 15,
      }}>
        <View style={{
          height: 60,
          width: 60,
          borderRadius: 6,
          backgroundColor: '#212125',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {cryptoInfo.logo && <Image source={{ uri: cryptoInfo.logo }} style={{ width: 40, height: 40 }} />}
        </View>

        <View style={{ flex: 1, paddingLeft: 10 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <Text style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
            }}>
              {cryptoInfo.name || 'Loading...'}
            </Text>
            <Text style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
            }}>
              ${parseFloat(currentPrice).toFixed(2)}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <Text style={{
              color: '#6C757D',
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
            }}>
              {cryptoInfo.symbol || 'Loading...'}
            </Text>
            <Text style={{
              color: '#6C757D',
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
            }}>
              2.05 BTC
            </Text>
          </View>
        </View>
      </View>

      <ChartComponent />

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 10,
      }}>
        <View style={{ flex: 1 }}>
          <ButtonStyle
            type="Fill"
            label="Buy"
            onPress={() => console.log('Buy pressed')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ButtonStyle
            type="Transparent"
            label="Sell"
            onPress={() => console.log('Sell pressed')}
          />
        </View>
      </View>

      <View style={{
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginBottom: 15,
        paddingVertical: 10,
        width: '100%',
      }}>
        <Text style={{
          color: '#B9C1D9',
          fontSize: 14,
          fontFamily: 'Poppins-Regular',
          textAlign: 'center',
        }}>
          At Price | USD
        </Text>
        <Text style={{
          color: '#FFF',
          fontSize: 20,
          fontFamily: 'Poppins-Regular',
          textAlign: 'center',
        }}>
          0.031
        </Text>

        <View style={{
          height: 1,
          backgroundColor: '#6C757D',
          marginTop: 10,
          width: '100%',
        }} />
      </View>

      <View style={{
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginBottom: 15,
        paddingVertical: 10,
        width: '100%',
      }}>
        <View style={{ flexDirection: 'row', }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{
              color: '#B9C1D9',
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
            }}>
              Amount
            </Text>
            <Text style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
            }}>
              345 USD
            </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            width: '100%',
          }}>
            <Text style={{
              color: '#FFF',
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
              marginRight: 10,
            }}>
              25%
            </Text>
            <Text style={{
              color: '#FFF',
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
              marginRight: 10,
            }}>
              50%
            </Text>
            <Text style={{
              color: '#FFF',
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
            }}>
              100%
            </Text>
          </View>
        </View>

        <View style={{
          height: 1,
          backgroundColor: '#6C757D',
          marginTop: 10,
          width: '100%',
        }} />
      </View>
    </View>
  );
}
