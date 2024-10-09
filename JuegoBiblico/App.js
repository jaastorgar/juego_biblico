import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import KahootModeScreen from './screens/KahootModeScreen';
import CharactersScreen from './screens/CharactersScreen';
import InviteFriendScreen from './screens/InviteFriendScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

// Configuración para manejar notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    // Función para registrar permisos de notificación
    const registerForPushNotificationsAsync = async () => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('No se han concedido permisos para las notificaciones.');
          return;
        }
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'Registrarse' }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Menú Principal' }} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Modo Clásico' }} />
        <Stack.Screen name="KahootModeScreen" component={KahootModeScreen} options={{ title: 'Modo Kahoot' }} />
        <Stack.Screen name="CharactersScreen" component={CharactersScreen} options={{ title: 'Personajes' }} />
        <Stack.Screen name="AchievementsScreen" component={AchievementsScreen} options={{ title: 'Logros' }} />
        <Stack.Screen name="InviteFriendScreen" component={InviteFriendScreen} options={{ title: 'Invitar Amigo' }} />
        <Stack.Screen name="ProgressScreen" component={ProgressScreen} options={{ title: 'Tu Progreso' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
      <View style={styles.footerContainer}>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});