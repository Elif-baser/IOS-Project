import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = () => {
    // Yeni kullanıcıyı kaydetmek için gerekli işlemler burada gerçekleştirilebilir
    // Örneğin, bir API'ye yeni kullanıcı bilgilerini gönderebilirsiniz
    Alert.alert('Başarılı', 'Üyelik oluşturuldu');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: 'purple' }]}>Üye Ol</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Üye Ol" onPress={handleSignup}  color="purple"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5B2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
});

export default SignupScreen;