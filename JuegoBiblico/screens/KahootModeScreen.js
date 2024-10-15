import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { doc, setDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import uuid from 'react-native-uuid';

const KahootModeScreen = ({ navigation }) => {
  const [gameMode, setGameMode] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputSessionId, setInputSessionId] = useState('');
  const [waitingRoomVisible, setWaitingRoomVisible] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Función para iniciar una nueva sesión de juego como anfitrión
  const startGroupSession = async () => {
    const newSessionId = uuid.v4(); // Genera un ID único para la sesión
    setSessionId(newSessionId);
    setIsHost(true); // El usuario que crea la sesión es el anfitrión

    // Guardar la información de la sesión en Firestore
    await setDoc(doc(db, 'gameSessions', newSessionId), {
      hostId: newSessionId, // Utilizamos el sessionId como hostId para identificar al anfitrión
      players: [],
      gameStarted: false, // El juego no ha comenzado hasta que el anfitrión lo indique
    });

    setGameMode('group');
    setWaitingRoomVisible(true); // Mostrar la sala de espera
  };

  const joinGroupSession = () => {
    setModalVisible(true); // Mostrar el modal para que los jugadores puedan ingresar el ID de la sesión
  };

  const handleJoinSession = async () => {
    if (inputSessionId) {
      const sessionRef = doc(db, 'gameSessions', inputSessionId);
      await updateDoc(sessionRef, {
        players: arrayUnion({ id: uuid.v4(), name: 'Nuevo Jugador' }),
      });
      setSessionId(inputSessionId);
      setIsHost(false); // Asegura que este usuario no sea el anfitrión
      setGameMode('group');
      setModalVisible(false);
      setWaitingRoomVisible(true); // Activa la sala de espera para el jugador
    } else {
      Alert.alert('Error', 'Por favor ingresa un ID de sesión válido.');
    }
  };

  const handleStartGame = async () => {
    if (isHost) {
      const sessionRef = doc(db, 'gameSessions', sessionId);
      await updateDoc(sessionRef, { gameStarted: true });
      setWaitingRoomVisible(false); // Oculta la sala de espera y comienza el juego
    }
  };

  return (
    <View style={styles.container}>
      {waitingRoomVisible ? (
        <View>
          {isHost ? (
            <View>
              <Text style={styles.title}>Sala de Configuración del Anfitrión</Text>
              <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text style={styles.playerName}>{item.name}</Text>}
              />
              <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                <Text style={styles.startButtonText}>Iniciar Juego</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.title}>Sala de Espera</Text>
              <Text style={styles.subtitle}>Esperando que el anfitrión inicie el juego...</Text>
              <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text style={styles.playerName}>{item.name}</Text>}
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Modo Kahoot</Text>
          <TouchableOpacity style={styles.button} onPress={startGroupSession}>
            <Text style={styles.buttonText}>Crear Juego en Grupo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={joinGroupSession}>
            <Text style={styles.buttonText}>Unirse a Juego en Grupo</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingresa el ID del grupo</Text>
            <TextInput
              style={styles.input}
              placeholder="ID de sesión"
              value={inputSessionId}
              onChangeText={setInputSessionId}
            />
            <TouchableOpacity style={styles.button} onPress={handleJoinSession}>
              <Text style={styles.buttonText}>Unirse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 10, textAlign: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  button: { backgroundColor: '#007bff', padding: 10, margin: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16 },
  startButton: { backgroundColor: '#28a745', padding: 15, margin: 10, borderRadius: 8 },
  startButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  playerName: { fontSize: 16, color: '#333', marginVertical: 5 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, width: '80%', marginBottom: 10 },
});

export default KahootModeScreen;