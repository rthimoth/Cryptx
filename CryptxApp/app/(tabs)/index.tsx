import { Image, StyleSheet, View, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Text } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/Group.svg')}
            style={styles.reactLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue sur Cryptx</Text>
          <Text style={styles.text}>
            Votre nouvelle application est prête à être personnalisée.
          </Text>
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
    height: 250,
    backgroundColor: '#000000',
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 32,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  reactLogo: {
    width: windowWidth,
    height: '100%',
    position: 'absolute',
  },
});