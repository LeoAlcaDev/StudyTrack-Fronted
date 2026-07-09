import axios from 'axios';
import constants from './components/common/constants';
import type { LoginRequest, RegisterRequest, AuthResponse } from './types';

const api = axios.create({ baseURL: constants.API_HOST });

export const loginRequest = (data: LoginRequest) =>
  api.post<AuthResponse>('/api/auth/login', data).then(r => r.data);

export const registerRequest = (data: RegisterRequest) =>
  api.post<AuthResponse>('/api/auth/register', data).then(r => r.data);