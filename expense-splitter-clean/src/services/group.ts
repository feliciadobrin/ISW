import api from './api';
import { Group } from '../types';

export const getAllGroups = async (): Promise<Group[]> => {
  const res = await api.get<Group[]>('/groups');
  return res.data;
};

import { Expense, User, Balance } from '../types';

export const getGroupExpenses = async (groupId: number): Promise<Expense[]> => {
  const res = await api.get<Expense[]>(`/${groupId}/expenses`);
  return res.data;
};
export const getGroupUsers = async (groupId: number): Promise<User[]> => {
  const res = await api.get<User[]>(`/groups/${groupId}/users`);
  return res.data;
};

export const getGroupBalance = async (groupId: number): Promise<Balance[]> => {
  const res = await api.get<Balance[]>(`/groups/${groupId}/balance`);
  return res.data;
};

  interface CreateGroupResponse {
    id: number;
    name: string;
  }
  
  export const addUserToGroup = (groupId: number, userId: number) => {
    return api.post('/groups/addUser', { groupId, userId });
  };
  export const createGroup = async (name: string): Promise<CreateGroupResponse> => {
    const res = await api.post<CreateGroupResponse>('/groups', { name });
    return res.data;
  };