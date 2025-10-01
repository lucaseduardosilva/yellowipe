import axios, { AxiosResponse } from 'axios';
import { AuthResponse, User, Post, ApiResponse, LoginCredentials, RegisterCredentials, UpdateProfileData } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', credentials);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response: AxiosResponse<User> = await api.get('/auth/profile');
    return response.data;
  },
};

export const userService = {
  updateProfile: async (data: UpdateProfileData): Promise<{ message: string; user: User }> => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response: AxiosResponse<User> = await api.get(`/users/${id}`);
    return response.data;
  },
};

export const postService = {
  getPosts: async (page = 1, limit = 10): Promise<{ posts: Post[]; pagination: any }> => {
    const response: AxiosResponse<ApiResponse<Post>> = await api.get(`/posts?page=${page}&limit=${limit}`);
    return {
      posts: response.data.posts || [],
      pagination: response.data.pagination
    };
  },

  getPostById: async (id: string): Promise<Post> => {
    const response: AxiosResponse<{ post: Post }> = await api.get(`/posts/${id}`);
    return response.data.post;
  },

  createPost: async (content: string): Promise<{ message: string; post: Post }> => {
    const response = await api.post('/posts', { content });
    return response.data;
  },

  likePost: async (id: string): Promise<{ message: string; post: Post }> => {
    const response = await api.put(`/posts/${id}/like`);
    return response.data;
  },

  addComment: async (postId: string, content: string): Promise<{ message: string; post: Post }> => {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  },

  deletePost: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};

export default api;