import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getGroupExpenses, getGroupUsers, getGroupBalance } from '../services/group';
import { Expense, User, Balance } from '../types';

const GroupScreen = () => {
  const route = useRoute();
  const { groupId } = route.params;

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [balance, setBalance] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const [e, u, b] = await Promise.all([
          getGroupExpenses(groupId),
          getGroupUsers(groupId),
          getGroupBalance(groupId),
        ]);
        setExpenses(e);
        setUsers(u);
        setBalance(b);
      } catch (err) {
        console.log('Eroare:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupData();
  }, [groupId]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Utilizatori</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>- {item.name}</Text>}
      />

      <Text style={styles.title}>💸 Cheltuieli</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            - {item.user.name}: {item.description} - {item.amount} lei
          </Text>
        )}
      />

      <Text style={styles.title}>📊 Balanță</Text>
      <FlatList
        data={balance}
        keyExtractor={(item) => item.userName}
        renderItem={({ item }) => (
          <Text>{item.userName} trebuie să plătească: {item.totalAmount.toFixed(2)} lei</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 8,
  },
});

export default GroupScreen;
