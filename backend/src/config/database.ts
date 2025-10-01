import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yellowipe';
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('error', (error) => {
  console.error('❌ Erro na conexão MongoDB:', error);
});

mongoose.connection.on('disconnected', () => {
});
