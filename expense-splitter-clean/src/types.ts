// src/types.ts

  
  export type Group = {
    id: number;
    name: string;
  };
  
  export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
  };
  
  export interface Expense {
    id: number;
    description: string;
    amount: number;
    user: {
      id: number;
      name: string;
    };
  }
  
  export interface LoginResponse {
    id: number;
    email: string;
  }
  
  export interface Balance {
    userName: string;
    totalAmount: number;
  }
  
  export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    AddGroup: undefined;
    AddMembers: { groupId: number };
    Group: { groupId: number };
    AddExpense: { groupId: number };
  };