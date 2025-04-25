import Settings from '@/assets/images/Settings';
import ButtonStyle from '@/components/ButtonStyle';
import CryptoTabs from '@/components/CryptoTabs';
import { View, Text } from 'react-native';
import ChartComponent from '@/components/ChartComponent';
import BitcoinLogo from '@/assets/images/BitcoinLogo';

export default function Explore() {
  return (
      <View style={{flex: 1, backgroundColor: '#070707', alignItems: 'center', paddingBottom: 80, paddingTop: 50}}>
      
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

      <CryptoTabs coins={['BTC', 'ETH', 'LTC', 'XRP', 'EOS', 'SOL', 'ADA', 'DOT', 'BNB']} />

      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 15,
      }}>
        <View style={{
          height: 60,
          width: 60,
          borderRadius: 5,
          backgroundColor: '#212125',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <BitcoinLogo />
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
              Bitcoin
            </Text>
            <Text style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
            }}>
              $26927
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
              BTC
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
          <View style={{flexDirection: 'row',}}>

            <View style={{alignItems: 'flex-start'}}>
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
