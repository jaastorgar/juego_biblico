import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

const GameScreen = () => {
  const [question, setQuestion] = useState('¿Cuál es el primer libro de la Biblia?');
  const [answer, setAnswer] = useState('');

  const handleAnswerSubmit = () => {
    // Lógica para validar la respuesta y pasar a la siguiente pregunta
    if (answer.toLowerCase() === 'génesis') {
      alert('¡Correcto!');
    } else {
      alert('Incorrecto, intenta de nuevo.');
    }
    setAnswer(''); // Reiniciar el campo de respuesta
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu respuesta"
        value={answer}
        onChangeText={setAnswer}
      />
      <Button title="Enviar respuesta" onPress={handleAnswerSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default GameScreen;