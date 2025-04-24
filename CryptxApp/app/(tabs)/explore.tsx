import Settings from '@/assets/images/Settings';
import ButtonStyle from '@/components/ButtonStyle';
import { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function Explore() {
  const [selected, setSelected] = useState('Buy');

  return (
    <View style={{flex: 1, backgroundColor: '#070707', alignItems: 'center'}}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 80,
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: '#070707',
            gap: 10,
          }}
        >
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
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  selectedBuy: {
    backgroundColor: '#6D4AFF',
    borderColor: '#6D4AFF',
  },
  selectedSell: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '500',
  },
});