import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const characters = [
  { id: 1, name: 'Moisés', image: require('../assets/moises.png'), unlockScore: 5, unlocked: false },
  { id: 2, name: 'David', image: require('../assets/david.png'), unlockScore: 10, unlocked: false },
  { id: 3, name: 'Jesús', image: require('../assets/jesus.png'), unlockScore: 15, unlocked: false },
];

const CharactersScreen = ({ route }) => {
  const { score } = route.params; // Recibe la puntuación desde la pantalla del juego
  const [characterList, setCharacterList] = useState(
    characters.map(character => ({
      ...character,
      unlocked: score >= character.unlockScore,
    }))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personajes Desbloqueables</Text>
      <FlatList
        data={characterList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.characterContainer, item.unlocked ? styles.unlocked : styles.locked]}>
            <Image source={item.image} style={styles.characterImage} />
            <View style={styles.characterInfo}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Text style={styles.unlockStatus}>
                {item.unlocked ? 'Desbloqueado' : `Se desbloquea con ${item.unlockScore} puntos`}
              </Text>
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
  characterContainer: {
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
  characterImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  unlockStatus: {
    fontSize: 14,
    color: '#555',
  },
});

export default CharactersScreen;