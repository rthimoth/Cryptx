import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonStyleProps = {
  type: 'Fill' | 'Transparent';
  label?: string;
  onPress: () => void;
};

const ButtonStyle: React.FC<ButtonStyleProps> = ({ type, label, onPress }) => {
  const isFill = type === 'Fill';

  return (
    <TouchableOpacity
      style={[styles.button, isFill ? styles.selectedFill : styles.selectedTransparent]}
      onPress={onPress}
    >
      <Text style={styles.selectedText}>{label || type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  selectedFill: {
    backgroundColor: '#6D4AFF',
    borderColor: '#6D4AFF',
  },
  selectedTransparent: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default ButtonStyle;
