import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { register } from '../services/auth';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const res = await register(name, email, password);
      Alert.alert('Succes', res.data as string);
      navigation.navigate('Login' as never);
    } catch (err: any) {
      Alert.alert('Eroare', err?.response?.data || 'Eroare necunoscută');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Înregistrare</Text>

      <TextInput
        style={styles.input}
        placeholder="Nume"
        value={name}
        onChangeText={setName}
      />
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

      <Button title="ÎNREGISTRARE" onPress={handleRegister} />

      <Text style={styles.register} onPress={() => navigation.navigate('Login' as never)}>
        Ai deja cont? Autentifică-te
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#80ded9',
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

export default RegisterScreen;
