import axios from 'axios';

export interface TickerPrice {
    symbol: string;
    price: string;
}

export interface WebSocketMessage {
    s: string;
    c: string;
}

const cryptoNameMap = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    LTC: 'Litecoin',
    XRP: 'XRP',
    EOS: 'EOS',
    SOL: 'Solana',
    ADA: 'Cardano',
    DOT: 'Polkadot',
    BNB: 'BNB',
    DOGE: 'Dogecoin',
};

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
        const symbolFull = crypto.symbol;
  
        const cryptoFullName = cryptoNameMap[baseAsset as keyof typeof cryptoNameMap] || baseAsset;
  
        const logoUrl = `https://cryptologos.cc/logos/${cryptoFullName.toLowerCase()}-${baseAsset.toLowerCase()}-logo.png`;
  
        return {
          name: cryptoFullName,
          symbol: baseAsset,
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

export const getCryptoHistoricalData = async (
  symbol: string,
  interval: string = '1d',
  limit: number = 30
): Promise<any[]> => {
    try {
        const res = await axios.get('https://api.binance.com/api/v3/klines', {
            params: {
                symbol: symbol,
                interval: interval, // Intervalles disponibles: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
                limit: limit, // Maximum 1000 points de données
            },
        });

        const data = res.data.map((item: any) => ({
            time: new Date(item[0]),
            open: parseFloat(item[1]),
            high: parseFloat(item[2]),
            low: parseFloat(item[3]),
            close: parseFloat(item[4]),
            volume: parseFloat(item[5]),
        }));

        return data;
    } catch (error) {
        console.error('Error fetching historical data:', error);
        throw error;
    }
};
