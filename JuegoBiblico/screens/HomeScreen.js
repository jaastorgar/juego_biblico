import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';  // Importa Sentry

const HomeScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    { title: 'Modo Clásico', screen: 'GameScreen', icon: 'game-controller-outline' },
    { title: 'Modo Kahoot', screen: 'KahootModeScreen', icon: 'podium-outline' },
  ];

  const challenges = [
    { id: 1, title: 'Desafío Diario', description: 'Responde correctamente a 3 preguntas hoy.' },
    { id: 2, title: 'Desafío Semanal', description: 'Juega al modo Kahoot 5 veces esta semana.' },
  ];

  const throwError = () => {
    Sentry.captureException(new Error('Test error enviado a Sentry'));
    console.log('Error enviado a Sentry');
  };

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.screen}
      style={styles.menuButton}
      onPress={() => navigation.navigate(item.screen)}
      activeOpacity={0.7}
    >
      <Ionicons name={item.icon} size={40} color="#fff" style={styles.menuIcon} />
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderChallengeItem = ({ item }) => (
    <View style={styles.challengeContainer}>
      <Ionicons name="trophy-outline" size={30} color="#FF5722" style={styles.challengeIcon} />
      <View style={styles.challengeInfo}>
        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengeDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
      <View style={styles.profileButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido al Juego Bíblico</Text>
        <Text style={styles.subtitle}>Selecciona un modo para comenzar:</Text>

        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        <View style={styles.challengesSection}>
          <Text style={styles.challengesTitle}>Desafíos Activos</Text>
          <FlatList
            data={challenges}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderChallengeItem}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay desafíos activos en este momento.</Text>}
          />
        </View>

        {/* Botón para enviar un error de prueba a Sentry */}
        <View style={styles.sentryButtonContainer}>
          <Button title="Enviar error a Sentry" onPress={throwError} color="#FF5722" />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffaa',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#007bff',
    width: 140,
    height: 140,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  challengesSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: '90%',
  },
  challengesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  challengeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeIcon: {
    marginRight: 10,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#777',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
  },
  sentryButtonContainer: {
    marginTop: 20,
    padding: 10,
  },
});

export default HomeScreen;