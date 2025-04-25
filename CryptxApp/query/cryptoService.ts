import axios from 'axios';

export interface TickerPrice {
    symbol: string;
    price: string;
  }
  
  export interface WebSocketMessage {
    s: string;
    c: string;
  }
  
  export const fetchTickerPrice = async (symbol: string): Promise<TickerPrice> => {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    if (!res.ok) throw new Error('Error fetching ticker price');
    return res.json();
  };
  
  export const subscribeToPriceUpdates = (
    symbol: string,
    onPriceUpdate: (price: string) => void
  ): WebSocket => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`);
    
    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);
      onPriceUpdate(message.c);
    };
  
    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  
    return ws;
  };

export const getCryptoInfo = async (symbol: string) => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');

    const symbols = response.data.symbols;

    const crypto = symbols.find((item: any) => item.symbol === symbol);

    if (crypto) {
      const baseAsset = crypto.baseAsset;
      const quoteAsset = crypto.quoteAsset;

      const symbolFull = crypto.symbol; 

      const logoUrl = `https://cryptologos.cc/logos/${baseAsset.toLowerCase()}-logo.svg`;

      //https://cryptologos.cc/logos/bitcoin-btc-logo.svg

      return {
        name: baseAsset,
        symbol: symbolFull,
        logo: logoUrl,
      };
    } else {
      throw new Error('Crypto not found');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des infos de crypto :', error);
    throw error;
  }
};
