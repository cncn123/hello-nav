import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// 根据环境加载不同的配置文件
const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
