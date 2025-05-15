// CryptxApp/query/walletService.ts
import { fetchTickerPrice } from './cryptoService';

// Définir le type pour les actifs du portefeuille
export interface WalletAsset {
  symbol: string;          // Symbole de la crypto (ex: "BTC")
  fullSymbol: string;      // Symbole complet pour l'API (ex: "BTCUSDT")
  name: string;            // Nom complet (ex: "Bitcoin")
  quantity: number;        // Quantité détenue (ex: 2.05)
  initialPrice: number;    // Prix d'achat initial (pour calculer les variations)
  currentPrice?: number;   // Prix actuel (sera mis à jour)
  value?: number;          // Valeur actuelle (sera calculée)
  percentChange?: number;  // Pourcentage de variation (sera calculé)
}

// Portefeuille fictif prédéfini
const mockWallet: WalletAsset[] = [
  {
    symbol: "BTC",
    fullSymbol: "BTCUSDT",
    name: "Bitcoin",
    quantity: 2.05,
    initialPrice: 26500
  },
  {
    symbol: "ETH",
    fullSymbol: "ETHUSDT",
    name: "Ethereum",
    quantity: 50,
    initialPrice: 490
  },
  {
    symbol: "SOL",
    fullSymbol: "SOLUSDT",
    name: "Solana",
    quantity: 150,
    initialPrice: 68
  },
  {
    symbol: "BNB",
    fullSymbol: "BNBUSDT",
    name: "Binance Coin",
    quantity: 30,
    initialPrice: 250
  },
  {
    symbol: "XRP",
    fullSymbol: "XRPUSDT",
    name: "XRP",
    quantity: 1000,
    initialPrice: 0.5
  },
  {
    symbol: "ADA",
    fullSymbol: "ADAUSDT",
    name: "Cardano",
    quantity: 1000,
    initialPrice: 0.5
  },
];

// État global du portefeuille
let walletState = {
  assets: [...mockWallet],
  totalValue: 0,
  totalInitialValue: 0,
  percentChange: 0,
  lastUpdated: new Date()
};

// Initialiser les valeurs du portefeuille
const calculateInitialValues = () => {
  let totalInitial = 0;
  walletState.assets.forEach(asset => {
    totalInitial += asset.quantity * asset.initialPrice;
  });
  walletState.totalInitialValue = totalInitial;
};

// Mettre à jour les prix et valeurs du portefeuille
export const updateWalletPrices = async () => {
  try {
    // Si c'est la première fois, calculer les valeurs initiales
    if (walletState.totalInitialValue === 0) {
      calculateInitialValues();
    }

    // Mettre à jour chaque actif
    let totalCurrentValue = 0;
    
    for (const asset of walletState.assets) {
      const priceData = await fetchTickerPrice(asset.fullSymbol);
      const currentPrice = parseFloat(priceData.price);
      
      asset.currentPrice = currentPrice;
      asset.value = asset.quantity * currentPrice;
      asset.percentChange = ((currentPrice - asset.initialPrice) / asset.initialPrice) * 100;
      
      totalCurrentValue += asset.value;
    }
    
    // Mettre à jour les totaux
    walletState.totalValue = totalCurrentValue;
    walletState.percentChange = ((totalCurrentValue - walletState.totalInitialValue) / walletState.totalInitialValue) * 100;
    walletState.lastUpdated = new Date();
    
    return walletState;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du portefeuille:', error);
    throw error;
  }
};

// Obtenir l'état actuel du portefeuille
export const getWallet = () => {
  return walletState;
};

// Obtenir un actif spécifique
export const getAsset = (symbol: string) => {
  return walletState.assets.find(asset => asset.symbol === symbol);
};