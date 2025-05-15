import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Settings from '@/assets/images/Settings';
import ButtonStyle from '@/components/ButtonStyle';

export default function Account() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
          <Settings />
        </View>

        <View style={styles.profileSection}>
          <Image
            source={require('@/assets/images/profil.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileEmail}>alex.johnson@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Personal Info</Text>
            <Text style={styles.rowValue}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Security</Text>
            <Text style={styles.rowValue}>2FA Enabled</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Notifications</Text>
            <Text style={styles.rowValue}>Push & Email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Language</Text>
            <Text style={styles.rowValue}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Theme</Text>
            <Text style={styles.rowValue}>Dark</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonWrapper}>
          <ButtonStyle
            type="Transparent"
            label="Logout"
            onPress={() => console.log('Logout pressed')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scroll: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  profileName: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  profileEmail: {
    color: '#6C757D',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  rowLabel: {
    color: '#B9C1D9',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  rowValue: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
