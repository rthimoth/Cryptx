import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  SafeAreaView, 
  RefreshControl,
  ListRenderItem 
} from 'react-native';
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
import SkeletonCard from '@/components/SkeletonCard';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import { updateWalletPrices, getWallet, Asset } from '@/query/walletService';
import { useRouter } from 'expo-router';
import { clearOnboarding } from '@/core/storage';

// Types pour gérer les différents états
type LoadingState = 'idle' | 'loading' | 'refreshing' | 'error';

export default function HomeScreen() {
  const router = useRouter();
  const [wallet, setWallet] = useState(getWallet());
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [refreshing, setRefreshing] = useState(false);

  // Charger les données du portefeuille
  const loadWalletData = useCallback(async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoadingState('loading');
      }
      
      const updatedWallet = await updateWalletPrices();
      setWallet(updatedWallet);
      setLoadingState('idle');
    } catch (error) {
      console.error('Erreur de chargement du portefeuille:', error);
      setLoadingState('error');
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Effet initial pour charger les données
  useEffect(() => {
    loadWalletData();

    // Rafraîchir les données toutes les 8 minutes environ
    const interval = setInterval(() => {
      loadWalletData();
    }, 500000);

    return () => clearInterval(interval);
  }, [loadWalletData]);

  // Gérer le pull-to-refresh
  const onRefresh = useCallback(() => {
    loadWalletData(true);
  }, [loadWalletData]);

  // Gérer le retry en cas d'erreur
  const onRetry = useCallback(() => {
    loadWalletData();
  }, [loadWalletData]);

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
        timePeriod="7d"
        strokeWidth={1.5}
        {...props}
      />
    );
  };

  // Fonction pour naviguer vers explore avec la crypto sélectionnée
  const navigateToExplore = useCallback((cryptoSymbol: string) => {
    router.push({
      pathname: '/explore',
      params: { crypto: cryptoSymbol }
    });
  }, [router]);

  // Fonction pour naviguer vers explore page générale
  const navigateToExploreGeneral = useCallback(() => {
    router.push('/explore');
  }, [router]);

  // Fonction pour naviguer vers account
  const navigateToAccount = useCallback(() => {
    router.push('/account');
  }, [router]);

  // Rendu d'un élément de la liste
  const renderCryptoItem: ListRenderItem<Asset> = ({ item: asset, index }) => {
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
        onPress={() => navigateToExplore(asset.symbol)}
      />
    );
  };

  // Rendu du skeleton pendant le chargement
  const renderSkeletonItem = ({ index }: { index: number }) => (
    <SkeletonCard index={index} />
  );

  // Données pour le skeleton (3 éléments)
  const skeletonData = new Array(3).fill(null).map((_, index) => ({ id: index }));

  // Composant Header de la FlatList
  const ListHeaderComponent = () => (
    <View style={styles.header}>
      <ProfileHeader 
        onProfilePress={navigateToAccount}
        onSettingsPress={() => clearOnboarding()}
      />
      
      <BackgroundGradient height={360} />
      
      <View style={styles.mainContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Hello Alex
          </Text>
        </View>
        
        <BalanceCard 
          balance={loadingState === 'loading' ? "Chargement..." : formatUSD(wallet.totalValue)} 
          percentChange={loadingState === 'loading' ? "0%" : formatPercentChange(wallet.percentChange)} 
          isPositive={isPositiveChange}
          // animation="slideDown"
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
      
      <SectionHeader 
        title="Holdings"
        actionText="See All"
        onActionPress={navigateToExploreGeneral}
      />
    </View>
  );

  // Gérer les différents états d'affichage
  const renderContent = () => {
    if (loadingState === 'error') {
      return (
        <FlatList
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={() => (
            <ErrorState 
              onRetry={onRetry}
              title="Erreur de chargement"
              subtitle="Impossible de charger les données du portefeuille"
            />
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
              titleColor="#FFFFFF"
            />
          }
        />
      );
    }

    if (loadingState === 'loading') {
      return (
        <FlatList
          data={skeletonData}
          renderItem={renderSkeletonItem}
          keyExtractor={(item) => `skeleton-${item.id}`}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
              titleColor="#FFFFFF"
            />
          }
        />
      );
    }

    if (wallet.assets.length === 0) {
      return (
        <FlatList
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={() => (
            <EmptyState 
              title="Portefeuille vide"
              subtitle="Commencez par ajouter des cryptomonnaies à votre portefeuille"
            />
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
              titleColor="#FFFFFF"
            />
          }
        />
      );
    }

    return (
      <FlatList
        data={wallet.assets}
        renderItem={renderCryptoItem}
        keyExtractor={(item) => item.symbol}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
            titleColor="#FFFFFF"
          />
        }
        // Optimisations de performance
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={5}
        getItemLayout={(data, index) => ({
          length: 77, // hauteur approximative d'une CryptoCard (62px + 15px margin)
          offset: 77 * index,
          index,
        })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  flatListContent: {
    backgroundColor: '#000000',
    paddingBottom: 50,
  },
  header: {
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
    height: 360,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 20,
    marginBottom: 10,
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
});