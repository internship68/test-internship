import { z } from 'zod';

// Schema สำหรับสร้าง task
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .trim(),
});

// Schema สำหรับอัปเดต task
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .trim()
    .optional(),
  completed: z.boolean().optional(),
});

// Schema สำหรับตรวจสอบ task ID
export const taskIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID');