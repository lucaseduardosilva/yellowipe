import mongoose from 'mongoose';

beforeAll(async () => {
  const mongoUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/yellowipe_test';
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error('Erro ao conectar com MongoDB de teste:', error);
    throw error;
  }
});

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
