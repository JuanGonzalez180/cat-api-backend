import cors from 'cors';

const corsOptions = {
  origin: function (origin: any, callback: any) {
    // Allow all origins in development
    const allowedOrigins = ['http://localhost', 'http://localhost:80', 'http://localhost:3000', 'http://localhost:4200', 'http://localhost:8080'];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const corsMiddleware = cors(corsOptions);
