import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRoutes from './src/routes/taskRoutes';
import { errorHandler, notFound } from './src/middleware/errorHandler';

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Root
app.get('/', (req, res) => {
  res.send('🚀 API server is running');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api', taskRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
