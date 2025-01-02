import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/config';
import navRoutes from './routes/nav';

// Load environment variables
dotenv.config();

// 连接数据库
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API 路由
app.use('/api/nav', navRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
