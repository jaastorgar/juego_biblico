import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import uuid from 'react-native-uuid';

const HostSetupScreen = ({ navigation }) => {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createSession = async () => {
      const newSessionId = uuid.v4();
      setSessionId(newSessionId);

      try {
        await setDoc(doc(db, 'gameSessions', newSessionId), {
          hostId: newSessionId,
          players: [],
          gameStarted: false,
        });
        setLoading(false);
        console.log('Sesión creada con ID:', newSessionId); // Log para verificar
      } catch (error) {
        console.error('Error creando la sesión:', error); // Error log
      }
    };

    createSession();
  }, []);

  const handleGoToConfig = () => {
    if (sessionId) {
      navigation.navigate('HostConfigScreen', { sessionId });
    } else {
      console.error('No se pudo obtener el ID de la sesión.'); // Log de error
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.title}>ID de la Sala: {sessionId}</Text>
          <TouchableOpacity style={styles.button} onPress={handleGoToConfig}>
            <Text style={styles.buttonText}>Ir a Configuración</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, marginVertical: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default HostSetupScreen;