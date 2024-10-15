import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const HostConfigScreen = ({ route, navigation }) => {
  const { sessionId } = route.params;
  const [players, setPlayers] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const sessionRef = doc(db, 'gameSessions', sessionId);

    const unsubscribe = onSnapshot(sessionRef, (doc) => {
      if (doc.exists()) {
        setPlayers(doc.data().players || []);
        console.log('Jugadores en la sala:', doc.data().players); // Log para verificar
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  const addQuestion = () => {
    if (newQuestion) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion('');
      console.log('Pregunta añadida:', newQuestion); // Log para verificar
    }
  };

  const handleStartGame = async () => {
    try {
      const sessionRef = doc(db, 'gameSessions', sessionId);
      await updateDoc(sessionRef, { gameStarted: true });
      navigation.navigate('GameScreen', { sessionId });
    } catch (error) {
      console.error('Error al iniciar el juego:', error); // Log de error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración del Juego</Text>
      <Text>ID de la Sala: {sessionId}</Text>

      <Text style={styles.subtitle}>Jugadores Conectados:</Text>
      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.playerName}>{item.name}</Text>}
      />

      <TextInput
        style={styles.input}
        placeholder="Escribe una nueva pregunta"
        value={newQuestion}
        onChangeText={setNewQuestion}
      />

      <TouchableOpacity style={styles.button} onPress={addQuestion}>
        <Text style={styles.buttonText}>Agregar Pregunta</Text>
      </TouchableOpacity>

      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.questionText}>{item}</Text>}
      />

      <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
        <Text style={styles.startButtonText}>Iniciar Juego</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  input: { width: '80%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#007bff', padding: 10, margin: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16 },
  startButton: { backgroundColor: '#28a745', padding: 15, margin: 10, borderRadius: 8 },
  startButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  playerName: { fontSize: 16, marginVertical: 5 },
  questionText: { fontSize: 16, marginVertical: 5, color: '#333' },
});

export default HostConfigScreen;