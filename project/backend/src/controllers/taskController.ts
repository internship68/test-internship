import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { createTaskSchema, updateTaskSchema } from '../validation/taskValidation';
import { z } from 'zod';

// GET /api/tasks - Get all tasks
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
    });
  }
};

// POST /api/tasks - Create a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createTaskSchema.parse(req.body);
    const task = new Task(validatedData);
    await task.save();
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      let message = 'Validation error';
      if (firstError.path.includes('title')) {
        if (firstError.code === 'invalid_type' || firstError.code === 'too_small') {
          message = 'Title is required';
        } else if (firstError.code === 'too_big') {
          message = 'Title must be less than 200 characters';
        } else {
          message = firstError.message;
        }
      }
      res.status(400).json({
        success: false,
        message,
      });
      return;
    }
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
    });
  }
};

// PUT /api/tasks/:id - Update a task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = updateTaskSchema.parse(req.body);
    if (Object.keys(validatedData).length === 0) {
      res.status(400).json({
        success: false,
        message: 'No valid updates provided',
      });
      return;
    }
    const task = await Task.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
      return;
    }
    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors[0].message,
      });
      return;
    }
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
    });
  }
};

// DELETE /api/tasks/:id - Delete a task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
      return;
    }
    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
    });
  }
};