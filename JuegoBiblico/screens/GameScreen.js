import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const questions = [
  { question: '¿Cuál es el primer libro de la Biblia?', answer: 'Génesis' },
  { question: '¿Quién construyó el arca?', answer: 'Noé' },
  { question: '¿Dónde nació Jesús?', answer: 'Belén' },
];

const GameScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      Alert.alert('¡Correcto!');
      setScore(score + 1);
      goToNextQuestion();
    } else {
      Alert.alert('Incorrecto, intenta de nuevo.');
    }
    setUserAnswer(''); // Reiniciar el campo de respuesta
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      saveProgressToFirestore(score);
      Alert.alert(`¡Felicidades! Has completado el juego con una puntuación de ${score} puntos.`);
      navigation.navigate('CharactersScreen', { score: score }); // Navegar a la pantalla de personajes
      setCurrentQuestionIndex(0); // Reiniciar el juego
      setScore(0);
    }
  };

  const saveProgressToFirestore = async (score) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'userProgress', user.uid), {
          score: score,
          lastPlayed: new Date(),
        });
        console.log('Progreso guardado exitosamente en Firestore.');
      } else {
        Alert.alert('Error', 'Por favor, inicia sesión para guardar tu progreso.');
      }
    } catch (error) {
      console.error('Error al guardar el progreso en Firestore:', error);
      Alert.alert('Error', 'No se pudo guardar el progreso. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu respuesta"
        value={userAnswer}
        onChangeText={setUserAnswer}
      />
      <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit}>
        <Text style={styles.buttonText}>Enviar Respuesta</Text>
      </TouchableOpacity>
      <Text style={styles.score}>Puntuación: {score}</Text>
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
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  score: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GameScreen;