import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedCard from './AnimatedCard';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: string;
}

/**
 * Composant pour afficher un état vide quand aucune donnée
 * n'est disponible dans le portefeuille
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Aucune crypto trouvée",
  subtitle = "Votre portefeuille est vide. Commencez par ajouter des cryptomonnaies.",
  icon = "💰"
}) => {
  return (
    <AnimatedCard
      index={0}
      style={styles.emptyContainer}
      animation="fadeIn"
      delay={200}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default EmptyState;