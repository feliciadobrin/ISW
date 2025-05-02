// src/services/user.ts
import api from './api';
import { User } from '../types';

export const getUserByEmail = async (email: string): Promise<User> => {
  const res = await api.get<User[]>(`/users`);
  const user = res.data.find((u) => u.email === email);
  if (!user) throw new Error('Utilizatorul nu a fost găsit');
  return user;
};