import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const InviteFriendScreen = () => {
  const inviteLink = 'https://juegobiblico.com/invite?gameId=12345'; // Reemplaza con el enlace real del juego

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invita a tus amigos</Text>
      <Text style={styles.description}>Escanea este código QR para unirte al juego:</Text>
      <QRCode value={inviteLink} size={200} />
      <Button title="Compartir Enlace" onPress={() => handleShareLink(inviteLink)} />
    </View>
  );
};

const handleShareLink = (link) => {
  // Aquí podrías agregar la lógica para compartir el enlace mediante otras aplicaciones como WhatsApp
  alert(`Enlace de invitación: ${link}`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default InviteFriendScreen;