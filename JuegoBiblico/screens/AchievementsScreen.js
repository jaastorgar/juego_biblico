import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const achievements = [
  { id: 1, title: 'Principiante', description: 'Responde correctamente a 5 preguntas.', condition: 5, unlocked: false },
  { id: 2, title: 'Experto', description: 'Responde correctamente a 10 preguntas.', condition: 10, unlocked: false },
  { id: 3, title: 'Maestro', description: 'Desbloquea todos los personajes.', condition: 'all_characters', unlocked: false },
];

const AchievementsScreen = ({ route }) => {
  const { score, charactersUnlocked } = route.params; // Recibe la puntuación y personajes desbloqueados desde otras pantallas
  const [achievementList, setAchievementList] = useState(
    achievements.map(achievement => ({
      ...achievement,
      unlocked: achievement.condition === 'all_characters' 
        ? charactersUnlocked === 3 // Suponiendo que hay 3 personajes
        : score >= achievement.condition,
    }))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logros</Text>
      <FlatList
        data={achievementList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.achievementContainer, item.unlocked ? styles.unlocked : styles.locked]}>
            <Image source={require('../assets/logro.png')} style={styles.achievementImage} />
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{item.title}</Text>
              <Text style={styles.achievementDescription}>{item.description}</Text>
              <Text style={styles.unlockStatus}>{item.unlocked ? 'Desbloqueado' : 'Bloqueado'}</Text>
            </View>
          </View>
        )}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  unlocked: {
    backgroundColor: '#e0ffe0',
  },
  locked: {
    backgroundColor: '#ffe0e0',
  },
  achievementImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#555',
  },
  unlockStatus: {
    fontSize: 14,
    color: '#888',
  },
});

export default AchievementsScreen;