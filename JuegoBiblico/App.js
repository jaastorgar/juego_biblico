import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import KahootModeScreen from './screens/KahootModeScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'Registrarse' }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Menú Principal' }} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Modo Clásico' }} />
        <Stack.Screen name="KahootModeScreen" component={KahootModeScreen} options={{ title: 'Modo Kahoot' }} />
      </Stack.Navigator>
      <View style={styles.footerContainer}>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});