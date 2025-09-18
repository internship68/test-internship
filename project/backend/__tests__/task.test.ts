import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server';
import { Task } from '../src/models/Task';
import http from 'http';

let server: http.Server;

beforeAll(async () => {
  server = app.listen(0);
});

afterAll(async () => {
  server.close();
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Task API', () => {
  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await request(app).get('/api/tasks').expect(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it('should return all tasks', async () => {
      // สร้าง Task 1 ก่อน
      await Task.create({ title: 'Task 1', completed: false });
      await new Promise((resolve) => setTimeout(resolve, 10));
      // สร้าง Task 2 หลัง
      await Task.create({ title: 'Task 2', completed: true });

      const response = await request(app).get('/api/tasks').expect(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].title).toBe('Task 2'); 
      expect(response.body.data[1].title).toBe('Task 1');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = { title: 'New Task' };
      const response = await request(app).post('/api/tasks').send(taskData).expect(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(taskData.title);
      expect(response.body.data.completed).toBe(false);
      expect(response.body.data._id).toBeDefined();
    });

    it('should return 400 for empty title', async () => {
      const response = await request(app).post('/api/tasks').send({ title: '' }).expect(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Title is required');
    });

    it('should return 400 for missing title', async () => {
      const response = await request(app).post('/api/tasks').send({}).expect(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Title is required');
    });

    it('should return 400 for title too long', async () => {
      const longTitle = 'a'.repeat(201);
      const response = await request(app).post('/api/tasks').send({ title: longTitle }).expect(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Title must be less than 200 characters');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', async () => {
      const task = await Task.create({ title: 'Original Task', completed: false });
      const updateData = { title: 'Updated Task', completed: true };
      const response = await request(app).put(`/api/tasks/${task._id}`).send(updateData).expect(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.completed).toBe(updateData.completed);
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).put(`/api/tasks/${fakeId}`).send({ title: 'Updated Task' }).expect(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Task not found');
    });

    it('should return 400 for empty updates', async () => {
      const task = await Task.create({ title: 'Test Task', completed: false });
      const response = await request(app).put(`/api/tasks/${task._id}`).send({}).expect(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('No valid updates provided');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const task = await Task.create({ title: 'Task to Delete', completed: false });
      const response = await request(app).delete(`/api/tasks/${task._id}`).expect(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Task deleted successfully');
      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).toBeNull();
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).delete(`/api/tasks/${fakeId}`).expect(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Task not found');
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health').expect(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Server is running');
      expect(response.body.timestamp).toBeDefined();
    });
  });
});