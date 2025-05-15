import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Settings from '@/assets/images/Settings';

interface ProfileHeaderProps {
  profileImage?: any;
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
}

/**
 * En-tête de profil réutilisable avec photo et icône de paramètres
 * 
 * @param props.profileImage - Image de profil (défaut: profil.png)
 * @param props.onProfilePress - Action lors du clic sur la photo de profil
 * @param props.onSettingsPress - Action lors du clic sur l'icône de paramètres
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileImage = require('@/assets/images/profil.png'),
  onProfilePress = () => {},
  onSettingsPress = () => {}
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={profileImage}
          style={styles.profileImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSettingsPress}>
        <Settings style={styles.settings} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 30,
    zIndex: 3,
  },
  profileImage: {
    width: 48,
    height: 48,
  },
  settings: {
    width: 24,
    height: 24,
  },
});

export default ProfileHeader; 