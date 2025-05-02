import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

type Group = {
  id: number;
  name: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

export default function HomeScreen() {
  const [groups, setGroups] = useState<Group[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchGroups = async () => {
        try {
          const email = await AsyncStorage.getItem('userEmail');
          if (!email) return;

          const allGroupsRes = await axios.get<Group[]>('http://localhost:8088/groups');
          const allGroups = allGroupsRes.data;

          const userGroups: Group[] = [];

          for (const group of allGroups) {
            if (!group.id) continue;
            const usersRes = await axios.get<User[]>(`http://localhost:8088/groups/${group.id}/users`);
            const users = usersRes.data;
            const isMember = users.some(u => u.email === email);
            if (isMember) {
              userGroups.push(group);
            }
          }

          setGroups(userGroups);
        } catch (error: any) {
          console.error('Eroare la încărcare grupuri:', error?.response?.data || error.message);
        }
      };

      fetchGroups();
    }, [])
  );

  const renderItem = ({ item }: { item: Group }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('GroupDetails' as never, { groupId: item.id } as never)}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {groups.length === 0 ? (
        <Text style={styles.noGroups}>Nu ai grupuri încă.</Text>
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddGroup' as never)}
      >
        <Text style={styles.buttonText}>CREEAZĂ GRUP NOU</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#80ded9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#de70ff',
    padding: 18,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  noGroups: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 40,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
