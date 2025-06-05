import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Text } from 'react-native';
import BitcoinLogo from '@/assets/images/BitcoinLogo';
import EthLogo from '@/assets/images/ETHLogo';
import CryptoCard from '@/components/CryptoCard';
import BalanceCard from '@/components/BalanceCard';
import SectionHeader from '@/components/SectionHeader';
import ProfileHeader from '@/components/ProfileHeader';
import BackgroundGradient from '@/components/BackgroundGradient';
import ButtonStyle from '@/components/ButtonStyle';
import LiveChart from '@/components/LiveChart';
import { updateWalletPrices, getWallet } from '@/query/walletService';

export default function HomeScreen() {
  const [wallet, setWallet] = useState(getWallet());
  const [loading, setLoading] = useState(true);

  // Charger les données du portefeuille
  useEffect(() => {
    const loadWalletData = async () => {
      try {
        setLoading(true);
        const updatedWallet = await updateWalletPrices();
        setWallet(updatedWallet);
      } catch (error) {
        console.error('Erreur de chargement du portefeuille:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWalletData();

    // Rafraîchir les données toutes les 8 minutes environ
    const interval = setInterval(() => {
      loadWalletData();
    }, 500000);

    return () => clearInterval(interval);
  }, []);

  // Formater les montants en USD
  const formatUSD = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  };

  // Déterminer si la variation est positive
  const isPositiveChange = wallet.percentChange >= 0;

  // Formater le pourcentage de variation
  const formatPercentChange = (percent: number) => {
    return `${Math.abs(percent).toFixed(2)}%`;
  };

  // Créer un composant pour le graphique en temps réel
  const createLiveChartComponent = (symbol: string, isPositive: boolean) => {
    return (props: any) => (
      <LiveChart
        symbol={symbol}
        stroke={isPositive ? "#4CD964" : "#FF3B30"}
        width={props.width || 80}
        height={props.height || 30}
        timePeriod="7d"  // Afficher les données sur 90 jours
        strokeWidth={1.5}
        {...props}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ProfileHeader 
            onProfilePress={() => console.log('Profile pressed')}
            onSettingsPress={() => console.log('Settings pressed')}
          />
          
          <BackgroundGradient height={360} />
          
          <View style={styles.mainContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                Hello Alex
              </Text>
            </View>
            
            <BalanceCard 
              balance={loading ? "Chargement..." : formatUSD(wallet.totalValue)} 
              percentChange={loading ? "0%" : formatPercentChange(wallet.percentChange)} 
              isPositive={isPositiveChange}
              animation="slideDown"
            />
            
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <ButtonStyle type="Fill" label="Deposit" onPress={() => console.log('Deposit pressed')} />
              </View>
              <View style={styles.buttonWrapper}>
                <ButtonStyle type="Transparent" label="Withdraw" onPress={() => console.log('Withdraw pressed')} />
              </View>
            </View>
          </View>
        </View>
        
        <SectionHeader 
          title="Holdings"
          actionText="See All"
          onActionPress={() => console.log('See All pressed')}
        />

        <View style={styles.cryptoList}>
          {!loading && wallet.assets.map((asset, index) => {
            // Définir quel logo de crypto utiliser
            let IconComponent;
            
            if (asset.symbol === 'BTC') {
              IconComponent = BitcoinLogo;
            } else if (asset.symbol === 'ETH') {
              IconComponent = EthLogo;
            } else {
              // Pour les autres, vous devriez ajouter des logos supplémentaires
              IconComponent = asset.symbol === 'BNB' ? BitcoinLogo : EthLogo; // Temporaire
            }
            
            // Vérifier si percentChange est défini
            const isPositive = asset.percentChange !== undefined ? asset.percentChange >= 0 : true;
            
            // Créer dynamiquement le composant de graphique
            const GraphComponent = createLiveChartComponent(asset.fullSymbol, isPositive);
            
            return (
              <CryptoCard 
                key={asset.symbol}
                index={index}
                name={asset.name}
                symbol={asset.symbol}
                price={formatUSD(asset.currentPrice || 0)}
                quantity={`${asset.quantity} ${asset.symbol}`}
                iconComponent={IconComponent}
                graphComponent={GraphComponent}
                graphStrokeColor={isPositive ? "#4CD964" : "#FF3B30"}
                animationType={index % 2 === 0 ? "fadeLeft" : "fadeRight"}
                animationDelay={150}
              />
            );
          })}
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
  titleContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
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
  cryptoList: {
    paddingHorizontal: 20,
  },
});