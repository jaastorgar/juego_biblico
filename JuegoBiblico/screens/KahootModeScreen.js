import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const questions = [
  { question: '¿Quién dividió el Mar Rojo?', answer: 'Moisés' },
  { question: '¿Cuántos discípulos tenía Jesús?', answer: '12' },
  { question: '¿Cuál es el último libro del Nuevo Testamento?', answer: 'Apocalipsis' },
];

const KahootModeScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10 segundos para responder cada pregunta

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      handleTimeOut();
    }
  }, [timeLeft]);

  const handleTimeOut = () => {
    alert('¡Tiempo agotado! Pasando a la siguiente pregunta.');
    goToNextQuestion();
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      alert('¡Correcto!');
      setScore(score + timeLeft * 10); // Más puntos por responder más rápido
    } else {
      alert('Incorrecto, intenta de nuevo.');
    }
    setUserAnswer(''); // Reiniciar el campo de respuesta
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10); // Reiniciar el tiempo para la siguiente pregunta
    } else {
      alert(`¡Felicidades! Has completado el modo Kahoot con una puntuación de ${score} puntos.`);
      navigation.navigate('CharactersScreen', { score: score }); // Navegar a la pantalla de personajes
      setCurrentQuestionIndex(0); // Reiniciar el juego
      setScore(0);
      setTimeLeft(10);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      <Text style={styles.timer}>Tiempo restante: {timeLeft} segundos</Text>
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
  timer: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
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

export default KahootModeScreen;