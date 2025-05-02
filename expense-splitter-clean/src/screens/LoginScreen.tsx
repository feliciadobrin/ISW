import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Eroare', 'Completează toate câmpurile!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8088/api/users/login', {
        email,
        password,
      });

      const responseText = res.data as string;

      if (responseText.startsWith('Login reușit')) {
        // 🔐 Extrage token-ul din răspunsul text
        const tokenLine = responseText.split('Token: ')[1];
        const token = tokenLine?.trim();

        // ✅ Salvează emailul și token-ul în AsyncStorage
        await AsyncStorage.setItem('userEmail', email);
        if (token) {
          await AsyncStorage.setItem('authToken', token);
        }

        Alert.alert('Succes', 'Autentificare reușită!');
        navigation.navigate('Home' as never);
      } else {
        throw new Error('Date greșite');
      }
    } catch (err: any) {
      console.error('Eroare login:', err?.response?.data || err.message);
      Alert.alert('Eroare', err?.response?.data || 'Email sau parolă greșită');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Parolă"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="LOGIN" onPress={handleLogin} />
      <Text style={styles.register} onPress={() => navigation.navigate('Register' as never)}>
        Nu ai cont? Înregistrează-te
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#80ded9',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  register: {
    marginTop: 15,
    color: 'red',
    textAlign: 'center',
  },
});

export default LoginScreen;
