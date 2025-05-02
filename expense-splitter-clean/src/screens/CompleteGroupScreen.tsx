import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const CompleteGroupScreen = () => {
  const [membersText, setMembersText] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { groupId } = route.params as { groupId: number };

  const handleComplete = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (!email) {
        Alert.alert('Eroare', 'Utilizator neautentificat.');
        return;
      }

      const allEmails = [...membersText.split(',').map(e => e.trim()), email];
      const userIds: number[] = [];

      for (const memberEmail of allEmails) {
        const encodedEmail = encodeURIComponent(memberEmail);
        const userRes = await axios.get<{ id: number }>(
          `http://localhost:8088/api/users/email/${encodedEmail}`
        );

        const userId = userRes.data.id;
        if (!userId) {
          throw new Error(`ID-ul utilizatorului ${memberEmail} nu a fost găsit.`);
        }

        userIds.push(userId);

        await axios.post('http://localhost:8088/groups/addUser', {
          groupId,
          userId,
        });
      }

      const sharedAmount = parseFloat(amount) / userIds.length;

      await axios.post('http://localhost:8088/expenses', {
        amount: sharedAmount,
        description,
        groupId,
      });

      Alert.alert('Succes', 'Grupul a fost completat!');
      navigation.navigate('Home' as never);
    } catch (error: any) {
      console.error('Eroare la finalizarea grupului:', error);
      Alert.alert('Eroare', error?.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completează Grupul</Text>

      <TextInput
        placeholder="Emailuri separate prin virgulă"
        placeholderTextColor="#666"
        style={styles.input}
        value={membersText}
        onChangeText={setMembersText}
      />
      <TextInput
        placeholder="Suma totală"
        placeholderTextColor="#666"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Descriere cheltuială"
        placeholderTextColor="#666"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.buttonContainer}>
        <Button title="FINALIZEAZĂ GRUPUL" color="#007bff" onPress={handleComplete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80ded9', // turcoaz
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default CompleteGroupScreen;
