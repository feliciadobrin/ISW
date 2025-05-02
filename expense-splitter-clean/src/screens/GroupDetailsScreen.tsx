import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { User } from '../types';

interface Expense {
  id: number;
  description: string;
  amount: number;
}

const GroupDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { groupId } = route.params as { groupId: number };

  const [users, setUsers] = useState<User[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, expensesRes] = await Promise.all([
          axios.get<User[]>(`http://localhost:8088/groups/${groupId}/users`),
          axios.get<Expense[]>(`http://localhost:8088/groups/${groupId}/expenses`)
        ]);
        setUsers(usersRes.data);
        setExpenses(expensesRes.data);
      } catch (error) {
        console.error('Eroare la fetch:', error);
        Alert.alert('Eroare', 'Nu s-au putut încărca detaliile grupului.');
      }
    };

    fetchData();
  }, [groupId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8088/groups/${groupId}`);
      navigation.navigate('Home' as never);
    } catch (error) {
      console.error('Eroare la ștergere:', error);
      Alert.alert('Eroare', 'Nu s-a putut șterge grupul.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Membrii Grupului</Text>
      {users.map((user, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.cardText}>{user.name} ({user.email})</Text>
        </View>
      ))}

      <Text style={styles.title}>Cheltuieli</Text>
      {expenses.length === 0 ? (
        <Text style={styles.cardText}>Nu există cheltuieli în acest grup.</Text>
      ) : (
        expenses.map((expense, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.cardText}>{expense.description}</Text>
            <Text style={styles.amount}>{expense.amount.toFixed(2)} RON</Text>
          </View>
        ))
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="ȘTERGE GRUPUL" color="red" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#de70ff', // fundal general
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  card: {
    backgroundColor: '#52a2a9', // fundal card
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
});

export default GroupDetailsScreen;
