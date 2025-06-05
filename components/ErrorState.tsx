import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AnimatedCard from './AnimatedCard';

interface ErrorStateProps {
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
  retryButtonText?: string;
}

/**
 * Composant pour afficher un état d'erreur quand le chargement
 * des données échoue
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Erreur de chargement",
  subtitle = "Impossible de charger les données. Vérifiez votre connexion internet.",
  onRetry,
  retryButtonText = "Réessayer"
}) => {
  return (
    <AnimatedCard
      index={0}
      style={styles.errorContainer}
      animation="fadeIn"
      delay={200}
    >
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      {onRetry && (
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text style={styles.retryButtonText}>{retryButtonText}</Text>
        </TouchableOpacity>
      )}
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
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
    color: '#FF3B30',
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
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorState;