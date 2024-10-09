import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Juego Bíblico</Text>
      <Button title="Modo Clásico" onPress={() => navigation.navigate('GameScreen')} />
      <Button title="Modo Kahoot" onPress={() => navigation.navigate('KahootModeScreen')} />
      <Button title="Ver Progreso" onPress={() => navigation.navigate('ProgressScreen')} />
      <Button title="Invitar Amigos" onPress={() => navigation.navigate('InviteFriendScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;