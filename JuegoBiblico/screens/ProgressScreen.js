import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const ProgressScreen = () => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'userProgress', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProgressData(docSnap.data());
          } else {
            Alert.alert('No se encontraron datos', 'Parece que aún no tienes ningún progreso guardado.');
          }
        } else {
          Alert.alert('Error', 'Por favor, inicia sesión para ver tu progreso.');
        }
      } catch (error) {
        console.error('Error al recuperar el progreso:', error);
        Alert.alert('Error', 'Hubo un problema al recuperar tu progreso.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Cargando progreso...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Progreso</Text>
      {progressData ? (
        <View style={styles.progressContainer}>
          <Text style={styles.label}>Puntuación más reciente: {progressData.score} puntos</Text>
          <Text style={styles.label}>Última vez jugado: {new Date(progressData.lastPlayed.seconds * 1000).toLocaleDateString()}</Text>
        </View>
      ) : (
        <Text style={styles.noDataText}>No hay datos de progreso disponibles.</Text>
      )}
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
  progressContainer: {
    backgroundColor: '#e0ffe0',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: '90%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressScreen;