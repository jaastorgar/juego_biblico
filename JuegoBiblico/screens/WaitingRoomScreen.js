import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const WaitingRoomScreen = ({ route, navigation }) => {
  const { sessionId } = route.params;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const sessionRef = doc(db, 'gameSessions', sessionId);

    const unsubscribe = onSnapshot(sessionRef, (doc) => {
      if (doc.exists()) {
        setPlayers(doc.data().players || []);
        console.log('Jugadores conectados:', doc.data().players); // Log para verificar
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sala de Espera</Text>
      <Text style={styles.subtitle}>ID de la Sala: {sessionId}</Text>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.playerName}>{item.name}</Text>}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameScreen', { sessionId })}>
        <Text style={styles.buttonText}>Unirse al Juego</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  subtitle: { fontSize: 18, color: '#555', marginBottom: 10 },
  button: { backgroundColor: '#28a745', padding: 15, margin: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 18 },
  playerName: { fontSize: 16, color: '#333', marginVertical: 5 },
});

export default WaitingRoomScreen;