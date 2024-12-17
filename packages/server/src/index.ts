import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Example API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'hello-nav-server',
    version: '1.0.0',
    description: 'Backend server for hello-nav'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
