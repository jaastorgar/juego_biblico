import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const challenges = [
  { id: 1, title: 'Desafío Diario', description: 'Responde correctamente a 3 preguntas hoy.', completed: false },
  { id: 2, title: 'Desafío Semanal', description: 'Juega al modo Kahoot 5 veces esta semana.', completed: false },
  { id: 3, title: 'Desafío de Logros', description: 'Desbloquea 2 logros esta semana.', completed: false },
];

const ChallengesScreen = () => {
  const [challengeList, setChallengeList] = useState(challenges);

  const handleChallengeCompletion = (challengeId) => {
    const updatedChallenges = challengeList.map((challenge) =>
      challenge.id === challengeId ? { ...challenge, completed: true } : challenge
    );
    setChallengeList(updatedChallenges);
    Alert.alert('¡Felicitaciones!', 'Has completado el desafío. ¡Sigue así!');
  };

  const renderChallengeItem = ({ item }) => (
    <View style={[styles.challengeContainer, item.completed ? styles.completed : styles.pending]}>
      <Ionicons 
        name={item.completed ? 'checkmark-circle' : 'time-outline'} 
        size={40} 
        color={item.completed ? '#4CAF50' : '#FF5722'} 
        style={styles.challengeIcon} 
      />
      <View style={styles.challengeInfo}>
        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengeDescription}>{item.description}</Text>
      </View>
      {!item.completed && (
        <TouchableOpacity 
          style={styles.completeButton} 
          onPress={() => handleChallengeCompletion(item.id)}
        >
          <Text style={styles.completeButtonText}>Completar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafíos Activos</Text>
      <FlatList
        data={challengeList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChallengeItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay desafíos activos en este momento.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  challengeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  completed: {
    backgroundColor: '#E0F7FA',
  },
  pending: {
    backgroundColor: '#FFEBEE',
  },
  challengeIcon: {
    marginRight: 15,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  challengeDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  completeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default ChallengesScreen;