import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';
import { getCryptoHistoricalData } from '@/query/cryptoService';

interface LiveChartProps extends SvgProps {
  symbol: string;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  interval?: string;
  limit?: number;
  timePeriod?: '24h' | '7d' | '30d' | '90d' | '1y';
}

const LiveChartDetails: React.FC<LiveChartProps> = ({
  symbol,
  width = 300,
  height = 200,
  stroke = '#4C5FFF',
  strokeWidth = 2,
  interval,
  limit,
  timePeriod = '7d',
  ...props
}) => {
  const [pathData, setPathData] = useState('');
  const [areaPathData, setAreaPathData] = useState('');
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getChartParams = (period: string): { interval: string; limit: number } => {
    switch (period) {
      case '24h':
        return { interval: '15m', limit: 96 };
      case '7d':
        return { interval: '2h', limit: 84 };
      case '30d':
        return { interval: '8h', limit: 90 };
      case '90d':
        return { interval: '1d', limit: 90 };
      case '1y':
        return { interval: '3d', limit: 122 };
      default:
        return { interval: '1d', limit: 30 };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = interval && limit ? { interval, limit } : getChartParams(timePeriod);
      try {
        const historicalData = await getCryptoHistoricalData(symbol, params.interval, params.limit);
        const closePrices = historicalData.map(point => parseFloat(point.close));
        const timestampsData = historicalData.map(point => point.time);
        const line = generateSmoothPath(closePrices, width, height);
        const area = generateAreaPath(closePrices, width, height);
        setPathData(line);
        setAreaPathData(area);
        setPrices(closePrices);
        setTimestamps(timestampsData);
        setSelectedIndex(null); // reset selection on new data
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const refreshInterval = timePeriod === '24h' ? 60_000 : 5 * 60_000;
    const intervalId = setInterval(fetchData, refreshInterval);
    return () => clearInterval(intervalId);
  }, [symbol, interval, limit, timePeriod, width, height]);

  const generateSmoothPath = (data: number[], width: number, height: number): string => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const padding = 0.05 * range;
    const norm = (val: number) => height - ((val - (min - padding)) / (range + padding * 2)) * height;
    const step = width / (data.length - 1);
    let d = `M0,${norm(data[0])}`;
    for (let i = 1; i < data.length - 1; i++) {
      const x = step * i;
      const cp1x = x - step / 2;
      const cp1y = norm(data[i - 1]);
      const cp2x = x;
      const cp2y = norm(data[i]);
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${cp2y}`;
    }
    return d;
  };

  const generateAreaPath = (data: number[], width: number, height: number): string => {
    const linePath = generateSmoothPath(data, width, height);
    const lastY = height;
    return `${linePath} L${width},${lastY} L0,${lastY} Z`;
  };

  // Keep this for Y-axis labels (abbreviated)
  const formatPrice = (val: number) => {
    if (val < 10) {
      return val.toFixed(2);
    } else if (val >= 1000) {
      return `${(val / 1000).toFixed(0)}K`;
    } else {
      return val.toFixed(0);
    }
  };

  // New function for full exact price formatting with decimals and dollar sign
  const formatExactPrice = (val: number) => {
    return val.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + '$';
  };

  // Generate Y-axis labels
  const yTicks = 5;
  const yLabels = [];
  if (prices.length > 0) {
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    for (let i = 0; i <= yTicks; i++) {
      const val = minPrice + ((maxPrice - minPrice) / yTicks) * i;
      yLabels.push(val);
    }
  }

  // Generate X-axis labels for last 7 days
  const xLabels: string[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  for (let i = 6; i >= 0; i--) {
    const dayDate = new Date(now);
    dayDate.setDate(now.getDate() - i);

    const dayStr = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = dayDate.getDate();
    xLabels.push(`${dayStr}\n${dayNum}`);
  }

  const handleTouch = (event: GestureResponderEvent) => {
    if (prices.length === 0) return;

    const { locationX } = event.nativeEvent;
    const step = width / (prices.length - 1);
    let idx = Math.round(locationX / step);
    idx = Math.min(Math.max(idx, 0), prices.length - 1);
    setSelectedIndex(idx);
  };

  if (loading) return <View style={[styles.container, { width, height }]} />;

  return (
    <View style={[styles.wrapper, { width: width + 40, height: height + 40 }]}>
      {/* Y-axis labels */}
      <View style={[styles.yAxis, { height }]}>
        {yLabels.slice().reverse().map((label, idx) => (
          <Text key={idx} style={styles.yLabel}>
            {formatPrice(label)}
          </Text>
        ))}
      </View>

      {/* Chart and X-axis */}
      <View style={{ flex: 1, position: 'relative' }}>
        <View
          style={{ width, height }}
          onStartShouldSetResponder={() => true}
          onResponderGrant={handleTouch}
          onResponderMove={handleTouch}
          onResponderRelease={() => setSelectedIndex(null)}
        >
          <Svg width={width} height={height} {...props}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <Stop offset="100%" stopColor="#3F3C3B" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            {areaPathData && <Path d={areaPathData} fill="url(#grad)" />}
            {pathData && (
              <Path
                d={pathData}
                stroke="#5E4EDA"
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Vertical indicator line at selected point */}
            {selectedIndex !== null && (
              <Path
                d={`M${selectedIndex * (width / (prices.length - 1))},0 L${selectedIndex * (width / (prices.length - 1))},${height}`}
                stroke="#FF6347"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            )}
          </Svg>
        </View>

        {/* Tooltip showing price and date at selected point */}
        {selectedIndex !== null && (
          <View
            style={{
              position: 'absolute',
              left: Math.min(Math.max(selectedIndex * (width / (prices.length - 1)) - 60, 0), width - 120),
              top: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
              maxWidth: 120,
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              Price: {formatExactPrice(prices[selectedIndex])}
            </Text>
            <Text style={{ color: 'white', fontSize: 10 }}>
              Date:{' '}
              {timestamps[selectedIndex]
                ? new Date(timestamps[selectedIndex]).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'N/A'}
            </Text>
          </View>
        )}

        {/* X-axis labels */}
        <View style={styles.xAxis}>
          {xLabels.map((label, idx) => (
            <Text key={idx} style={styles.xLabel}>
              {label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  yLabel: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 5,
  },
  xLabel: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default LiveChartDetails;
