import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
  showAction?: boolean;
}

/**
 * En-tête de section réutilisable avec titre et action optionnelle
 * 
 * @param props.title - Titre de la section
 * @param props.actionText - Texte du bouton d'action (défaut: "See All")
 * @param props.onActionPress - Fonction de callback pour l'action
 * @param props.showAction - Si l'action doit être affichée (défaut: true)
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText = "See All",
  onActionPress = () => {},
  showAction = true
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showAction && (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionText: {
    fontSize: 16,
    color: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  }
});

export default SectionHeader; 