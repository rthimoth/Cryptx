import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ChartComponent = () => {
  const detailedData = [
    2, 2.3, 2.1, 2.5,
    2.5, 2.6, 2.4, 2.3,
    2.2, 2.5, 2.7, 2.6,
    3, 3.2, 3.3, 3.1,
    4, 4.3, 4.2, 4.1,
    6, 6.5, 6.2, 6.8,
    7.5, 8, 7.9, 7.8,
    9, 8.7, 9.3, 9.5
  ];

  const labels = ['', '', '', '', '', '', '', ''];
  const labelDates = ['15', '16', '17', '18', '19', '20', '21', '22'];

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: labels.map((label, index) => `${label}\n${labelDates[index]}\n`),
          datasets: [{ data: detailedData }],
        }}
        width={screenWidth - 20}
        height={250}
        yAxisSuffix="k"
        fromZero={true}
        chartConfig={{
          backgroundColor: '#070707',
          backgroundGradientFrom: '#070707',
          backgroundGradientTo: '#070707',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(101, 82, 254, ${opacity})`,
          labelColor: () => '#fff',
          formatXLabel: label => label,
          fillShadowGradient: '#FEF0EE',
          fillShadowGradientOpacity: 0.24,
          propsForBackgroundLines: {
            stroke: '#333',
          },
          propsForDots: {
            r: '0',
          },
        }}
        bezier
        withDots={false}
        withShadow={true}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  chart: {
    borderRadius: 5,
  },
  label: {
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
    maxWidth: 30,
  }  
});

export default ChartComponent;
