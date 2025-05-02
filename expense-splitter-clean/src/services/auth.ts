import API from './api';

export const login = (email: string, password: string) => {
  return API.post('/users/login', { email, password });
};

export const register = (name: string, email: string, password: string) => {
  return API.post('/users/register', { name, email, password });
};
