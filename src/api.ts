import axios from 'axios';
import constants from './components/common/constants';
import type { LoginRequest, RegisterRequest, AuthResponse, Courses, Page, CreateCourseRequest } from './types';

const api = axios.create({ baseURL: constants.API_HOST });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginRequest = (data: LoginRequest) =>
  api.post<AuthResponse>('/api/auth/login', data).then(r => r.data);

export const registerRequest = (data: RegisterRequest) =>
  api.post<AuthResponse>('/api/auth/register', data).then(r => r.data);

export const getCourses = (page: number, size: number) =>
  api.get<Page<Courses>>('/api/courses', { params: { page, size } }).then(r => r.data);

export const createCourse = (data: CreateCourseRequest) =>
  api.post<Courses>('/api/courses', data).then(r => r.data);