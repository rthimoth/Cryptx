import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';

const CryptoTabs = ({ coins = ['BTC', 'ETH', 'LTC', 'XRP', 'EOS'] }) => {
  const [selected, setSelected] = useState(coins[0]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {coins.map((coin, index) => {
          const isActive = coin === selected;
          return (
            <Pressable key={index} onPress={() => setSelected(coin)}>
              <View style={styles.tab}>
                <Text style={[styles.text, isActive && styles.activeText]}>
                  {coin}
                </Text>
                <View
                  style={[
                    styles.activeBar,
                    isActive ? styles.visibleActiveBar : null,
                  ]}
                />
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    height: 60,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    paddingHorizontal: 20,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  activeText: {
    fontFamily: 'Poppins-SemiBold',
  },
  activeBar: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#6D4AFF',
    borderRadius: 1,
    opacity: 0,
  },
  visibleActiveBar: {
    opacity: 1,
  },
});

export default CryptoTabs;
