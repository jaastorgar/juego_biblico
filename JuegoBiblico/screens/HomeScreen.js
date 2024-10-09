import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    { title: 'Modo Clásico', screen: 'GameScreen', icon: 'game-controller-outline' },
    { title: 'Modo Kahoot', screen: 'KahootModeScreen', icon: 'podium-outline' },
  ];

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
});

export default HomeScreen;