import express from 'express';
import type { Express } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { corsMiddleware } from './middleware/cors.middleware';
import catsRoutes = require('./routes/cats.routes');
import imagesRoutes = require('./routes/images.routes');
import usersRoutes = require('./routes/users.routes');

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Database connection
connectDB().catch((error) => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});

// Routes
app.use('/api/cats', catsRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/auth', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export = app;
