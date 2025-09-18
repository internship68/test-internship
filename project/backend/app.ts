import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRoutes from './src/routes/taskRoutes';
import { errorHandler, notFound } from './src/middleware/errorHandler';

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ✅ Allowed origins (dev + prod)
const allowedOrigins = [
  'http://localhost:5173',
  'https://task-manager-thinnakorn.netlify.app',
];

// ✅ CORS middleware with logging
app.use(
  cors({
    origin: (origin, callback) => {
      console.log('CORS check, origin:', origin); 
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn('Blocked by CORS:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Root
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 API server is running');
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
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
