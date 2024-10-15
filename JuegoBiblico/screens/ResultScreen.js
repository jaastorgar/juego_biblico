import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResultScreen = ({ route, navigation }) => {
  const { score, totalQuestions, mode } = route.params;

  const getMotivationalMessage = () => {
    if (score >= totalQuestions * 0.8) {
      return '¡Excelente trabajo! ¡Eres un verdadero experto bíblico!';
    } else if (score >= totalQuestions * 0.5) {
      return '¡Buen esfuerzo! ¡Sigue practicando para ser aún mejor!';
    } else {
      return 'No te preocupes, sigue intentándolo y mejorarás cada vez más.';
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="trophy" size={80} color="#FFD700" style={styles.icon} />
      <Text style={styles.title}>Resultados</Text>
      <Text style={styles.scoreText}>Puntuación: {score} / {totalQuestions}</Text>
      <Text style={styles.message}>{getMotivationalMessage()}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.buttonText}>Volver al Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('KahootModeScreen')}
      >
        <Text style={styles.buttonText}>Reintentar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => {/* lógica para compartir puntaje en redes sociales */}}
      >
        <Ionicons name="share-social-outline" size={24} color="#fff" />
        <Text style={styles.shareButtonText}>Compartir Puntaje</Text>
      </TouchableOpacity>
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
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 22,
    color: '#007bff',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ResultScreen;