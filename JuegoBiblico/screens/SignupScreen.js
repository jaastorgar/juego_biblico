import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { firebase } from '../firebaseConfig';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Registro exitoso');
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Registrarse" onPress={handleSignup} />
      <Text onPress={() => navigation.navigate('LoginScreen')}>
        ¿Ya tienes una cuenta? Inicia sesión
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default SignupScreen;