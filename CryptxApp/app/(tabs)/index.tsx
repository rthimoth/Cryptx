import { Image, StyleSheet, View, ScrollView, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import BitcoinLogo from '@/assets/images/bitcoin_logo';
import EthLogo from '@/assets/images/eth_icon';
import Settings from '@/assets/images/Settings';
import GraphEth from '@/assets/images/Graph_eth';
import GraphBtc from '@/assets/images/Graph_btc';
import Group from '@/assets/images/Group';
import ButtonStyle from '@/components/ButtonStyle';

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.space}>
            <Image
              source={require('@/assets/images/profil.png')}
              style={styles.profil}
              resizeMode="contain"
            />
            <Settings />
          </View>
          
          <Group
            style={styles.reactLogo}
          />
          
          <View style={styles.mainContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                Hello Alex
              </Text>
            </View>
            
            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Current Balance</Text>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceAmount}>$87,430.12</Text>
                <Text style={styles.balancePercent}>↑ 10.2%</Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <ButtonStyle type="Fill" label="Deposit" onPress={() => {}} />
              </View>
              <View style={styles.buttonWrapper}>
                <ButtonStyle type="Transparent" label="Withdraw" onPress={() => {}} />
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.holding}>
          <Text style={styles.holdingTitle}>
            Holdings
          </Text>
          <Text style={styles.seeAllText}>
            See All
          </Text>
        </View>
        <View style={styles.cryptoList}>
          <View style={styles.cryptoCard}>
            <View style={styles.cryptoIconContainer}>
              <EthLogo
                width={24}
                height={24}
                style={styles.cryptoIcon}
              />
            </View>
            <View style={styles.cryptoInfo}>
              <Text style={styles.cryptoName}>Ethereum</Text>
              <Text style={styles.cryptoSymbol}>ETH</Text>
            </View>
            <View style={styles.cryptoGraph}>
              <GraphEth 
                style={styles.graphLine}
                stroke="#4CD964"
              />
            </View>
            <View style={styles.cryptoValue}>
              <Text style={styles.cryptoPrice}>$503.12</Text>
              <Text style={styles.cryptoQuantity}>50 ETH</Text>
            </View>
          </View>
          
          <View style={styles.cryptoCard}>
            <View style={styles.cryptoIconContainer}>
              <BitcoinLogo
                width={22}
                height={22}
                style={styles.cryptoIcon}
              />
            </View>
            <View style={styles.cryptoInfo}>
              <Text style={styles.cryptoName}>Bitcoin</Text>
              <Text style={styles.cryptoSymbol}>BTC</Text>
            </View>
            <View style={styles.cryptoGraph}>
              <GraphBtc
                style={styles.graphLine}
                stroke="#FF3B30"
              />
            </View>
            <View style={styles.cryptoValue}>
              <Text style={styles.cryptoPrice}>$26927</Text>
              <Text style={styles.cryptoQuantity}>2.05 BTC</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    backgroundColor: '#000000',
  },
  header: {
    height: 360,
    backgroundColor: '#000000',
    position: 'relative',
    width: '100%',
    marginBottom: 0,
  },
  mainContent: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 100,
    zIndex: 2,
  },
  content: {
    padding: 32,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  holdingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  reactLogo: {
    width: windowWidth,
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  profil: {
    width: 48,
    height: 48,
  },
  settings: {
    width: 24,
    height: 24,
  },
  space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 30,
    zIndex: 3,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 20,
    marginBottom: 20,
  },
  balanceCard: {
    width: '85%',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#333333',
    marginBottom: 20,
    zIndex: 2,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balancePercent: {
    marginRight: 35,
    fontSize: 16,
    color: '#8833ff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 10,
    zIndex: 2,
  },
  buttonWrapper: {
    width: '48%',
  },
  holding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  cryptoList: {
    paddingHorizontal: 20,
  },
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