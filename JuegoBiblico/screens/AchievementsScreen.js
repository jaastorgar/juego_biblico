import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const achievements = [
  { id: 1, title: 'Principiante', description: 'Responde correctamente a 5 preguntas.', condition: 5, unlocked: false },
  { id: 2, title: 'Experto', description: 'Responde correctamente a 10 preguntas.', condition: 10, unlocked: false },
  { id: 3, title: 'Maestro', description: 'Desbloquea todos los personajes.', condition: 'all_characters', unlocked: false },
];

const AchievementsScreen = ({ route }) => {
  const { score = 0, charactersUnlocked = 0 } = route.params || {}; // Maneja la puntuación y personajes desbloqueados de manera segura
  const [achievementList, setAchievementList] = useState([]);

  useEffect(() => {
    // Actualiza el estado de los logros basado en las condiciones
    const updatedAchievements = achievements.map(achievement => ({
      ...achievement,
      unlocked: achievement.condition === 'all_characters'
        ? charactersUnlocked >= 3 // Suponiendo que hay 3 personajes por desbloquear
        : score >= achievement.condition,
    }));
    setAchievementList(updatedAchievements);
  }, [score, charactersUnlocked]);

  const renderAchievementItem = ({ item }) => (
    <View style={[styles.achievementContainer, item.unlocked ? styles.unlocked : styles.locked]}>
      <Ionicons 
        name={item.unlocked ? 'trophy' : 'lock-closed'} 
        size={50} 
        color={item.unlocked ? '#4CAF50' : '#FF5722'} 
        style={styles.achievementIcon} 
      />
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{item.title}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
        <Text style={styles.unlockStatus}>{item.unlocked ? 'Desbloqueado' : 'Bloqueado'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logros</Text>
      <FlatList
        data={achievementList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderAchievementItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Aún no tienes logros desbloqueados.</Text>}
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
    backgroundColor: '#f0f0f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  achievementContainer: {
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
  unlocked: {
    backgroundColor: '#E0F7FA',
  },
  locked: {
    backgroundColor: '#FFEBEE',
  },
  achievementIcon: {
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  unlockStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
  },
});

export default AchievementsScreen;