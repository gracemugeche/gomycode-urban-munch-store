import express from 'express';
import cors from 'cors';

import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
// import errorHandler from './middlewares/errorHandler'; // optional for now

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Error handler
// app.use(errorHandler); // optional

export default app;
