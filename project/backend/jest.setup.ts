import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  jest.setTimeout(120000); // เพิ่ม timeout เพื่อรองรับการเชื่อมต่อที่อาจช้า
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri); // ลบตัวเลือกที่เลิกใช้แล้ว (useNewUrlParser, useUnifiedTopology)
});

afterAll(async () => {
  try {
    if (mongoose.connection.readyState === 1) { // ตรวจสอบว่าเชื่อมต่ออยู่
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
    await mongoServer.stop();
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
});