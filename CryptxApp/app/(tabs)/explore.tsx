import { View, Text } from 'react-native';

export default function Explore() {
  return (
    <View style={{flex: 1, backgroundColor: '#070707'}}>
        <View style={{flex: 1, alignItems: 'flex-start', marginTop: 100, marginLeft: 20}}>
            <Text style={{fontSize: 30, color: '#FFF', fontFamily: 'Poppins-Regular'}}>Trading</Text>
        </View>
    </View>
  );
}