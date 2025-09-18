import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  jest.setTimeout(120000); 
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  try {
    if (mongoose.connection.readyState === 1) { 
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
    await mongoServer.stop();
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
});