import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Animated, FlatList } from 'react-native';
import { doc, setDoc, getDoc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

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
  const [timerColor, setTimerColor] = useState(new Animated.Value(0));
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [realTimeScores, setRealTimeScores] = useState([]);

  useEffect(() => {
    // Listener para las puntuaciones en tiempo real
    const scoresDocRef = doc(db, 'gameScores', 'globalScores');
    const unsubscribe = onSnapshot(scoresDocRef, (doc) => {
      if (doc.exists()) {
        setRealTimeScores(doc.data().scores);
      }
    });

    return () => unsubscribe(); // Limpiar listener al desmontar el componente
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        animateTimerColor();
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      handleTimeOut();
    }
  }, [timeLeft]);

  const animateTimerColor = () => {
    Animated.timing(timerColor, {
      toValue: timeLeft > 5 ? 0 : 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const timerBackgroundColor = timerColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['green', 'red'],
  });

  const handleTimeOut = () => {
    setFeedbackMessage('⏰ ¡Tiempo agotado! Pasando a la siguiente pregunta.');
    setTimeout(() => goToNextQuestion(), 1000);
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setFeedbackMessage('✅ ¡Correcto!');
      setScore(score + timeLeft * 10); // Más puntos por responder más rápido
      updateGlobalScores(score + timeLeft * 10);
    } else {
      setFeedbackMessage('❌ Incorrecto, intenta de nuevo.');
    }

    setUserAnswer(''); // Reiniciar el campo de respuesta
    setTimeout(() => goToNextQuestion(), 1500); // Esperar un poco antes de la siguiente pregunta para mostrar feedback
  };

  const goToNextQuestion = () => {
    setFeedbackMessage(''); // Limpiar el mensaje de retroalimentación
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10); // Reiniciar el tiempo para la siguiente pregunta
    } else {
      saveProgressToFirestore(score);
      Alert.alert(`¡Felicidades! Has completado el modo Kahoot con una puntuación de ${score} puntos.`);
      navigation.navigate('CharactersScreen', { score: score }); // Navegar a la pantalla de personajes
      setCurrentQuestionIndex(0); // Reiniciar el juego
      setScore(0);
      setTimeLeft(10);
    }
  };

  const saveProgressToFirestore = async (score) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'userProgress', user.uid), {
          score: score,
          lastPlayed: new Date(),
        }, { merge: true });
        console.log('Progreso guardado exitosamente en Firestore.');
      } else {
        Alert.alert('Error', 'Por favor, inicia sesión para guardar tu progreso.');
      }
    } catch (error) {
      console.error('Error al guardar el progreso en Firestore:', error);
      Alert.alert('Error', 'No se pudo guardar el progreso. Inténtalo de nuevo.');
    }
  };

  const updateGlobalScores = async (newScore) => {
    const scoresDocRef = doc(db, 'gameScores', 'globalScores');
    try {
      // Verificar si el documento existe antes de intentar actualizarlo
      const docSnapshot = await getDoc(scoresDocRef);
      if (!docSnapshot.exists()) {
        // Si el documento no existe, lo creamos con la estructura inicial
        await setDoc(scoresDocRef, { scores: [] });
      }

      // Una vez que estamos seguros de que el documento existe, actualizamos el puntaje
      await updateDoc(scoresDocRef, {
        scores: arrayUnion({ player: auth.currentUser.email, score: newScore }),
      });
    } catch (error) {
      console.error('Error al actualizar la puntuación global:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      <Animated.View style={[styles.timer, { backgroundColor: timerBackgroundColor }]}>
        <Text style={styles.timerText}>Tiempo restante: {timeLeft} segundos</Text>
      </Animated.View>
      <TextInput
        style={styles.input}
        placeholder="Tu respuesta"
        value={userAnswer}
        onChangeText={setUserAnswer}
      />
      <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit}>
        <Text style={styles.buttonText}>Enviar Respuesta</Text>
      </TouchableOpacity>
      <Text style={styles.feedbackMessage}>{feedbackMessage}</Text>
      <Text style={styles.score}>Puntuación: {score}</Text>

      <View style={styles.realTimeScoresContainer}>
        <Text style={styles.realTimeScoresTitle}>Puntuaciones en Tiempo Real</Text>
        <FlatList
          data={realTimeScores}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.playerScore}>
              {item.player}: {item.score} puntos
            </Text>
          )}
        />
      </View>
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
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  timerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  feedbackMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  score: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  realTimeScoresContainer: {
    marginTop: 20,
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 8,
    width: '90%',
  },
  realTimeScoresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  playerScore: {
    fontSize: 16,
    color: '#333',
  },
});

export default KahootModeScreen;