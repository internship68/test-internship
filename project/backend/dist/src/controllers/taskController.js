"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const Task_1 = require("../models/Task");
const taskValidation_1 = require("../validation/taskValidation");
const zod_1 = require("zod");
// GET /api/tasks - Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task_1.Task.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: tasks,
        });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tasks',
        });
    }
};
exports.getAllTasks = getAllTasks;
// POST /api/tasks - Create a new task
const createTask = async (req, res) => {
    try {
        const validatedData = taskValidation_1.createTaskSchema.parse(req.body);
        const task = new Task_1.Task(validatedData);
        await task.save();
        res.status(201).json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const firstError = error.errors[0];
            let message = 'Validation error';
            if (firstError.path.includes('title')) {
                if (firstError.code === 'invalid_type' || firstError.code === 'too_small') {
                    message = 'Title is required';
                }
                else if (firstError.code === 'too_big') {
                    message = 'Title must be less than 200 characters';
                }
                else {
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
exports.createTask = createTask;
// PUT /api/tasks/:id - Update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = taskValidation_1.updateTaskSchema.parse(req.body);
        if (Object.keys(validatedData).length === 0) {
            res.status(400).json({
                success: false,
                message: 'No valid updates provided',
            });
            return;
        }
        const task = await Task_1.Task.findByIdAndUpdate(id, validatedData, {
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
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
exports.updateTask = updateTask;
// DELETE /api/tasks/:id - Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task_1.Task.findByIdAndDelete(id);
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
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete task',
        });
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map