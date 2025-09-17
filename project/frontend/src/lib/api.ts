import axios from 'axios';
import { z } from 'zod';
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://task-manager-backend.onrender.com/api';

// Validation schemas
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .optional(),
  completed: z.boolean().optional(),
});

// API client setup
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'An error occurred');
  }
);

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
}

export interface UpdateTaskRequest {
  title?: string;
  completed?: boolean;
}

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await apiClient.get('/tasks');
    return response.data.data;
  },

  async createTask(title: string): Promise<Task> {
    const validatedData = createTaskSchema.parse({ title });
    const response = await apiClient.post('/tasks', validatedData);
    return response.data.data;
  },

  async updateTask(id: string, updates: UpdateTaskRequest): Promise<Task> {
    const validatedData = updateTaskSchema.parse(updates);
    const response = await apiClient.put(`/tasks/${id}`, validatedData);
    return response.data.data;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },
};
