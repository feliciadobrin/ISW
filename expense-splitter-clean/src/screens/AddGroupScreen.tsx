import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddGroupScreen = () => {
  const [groupName, setGroupName] = useState('');
  const navigation = useNavigation();

  const handleCreateGroup = async () => {
    try {
      if (!groupName) {
        Alert.alert('Eroare', 'Introduceți un nume pentru grup!');
        return;
      }

      const res = await axios.post<{ id: number }>('http://localhost:8088/groups', {
        name: groupName,
      });

      const groupId = res.data.id;

      if (groupId) {
        navigation.navigate('CompleteGroup', { groupId } as never);
      } else {
        throw new Error('Eroare la creare grup.');
      }
    } catch (error: any) {
      console.error('Eroare creare grup:', error?.response?.data || error.message);
      Alert.alert('Eroare', error?.response?.data || 'Eroare necunoscută.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creează un nou grup</Text>
      <TextInput
        placeholder="Nume grup"
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
        placeholderTextColor="#666"
      />
      <View style={styles.buttonContainer}>
        <Button title="CREEAZĂ GRUP" color="#007bff" onPress={handleCreateGroup} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80ded9', 
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

export default AddGroupScreen;
