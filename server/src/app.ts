const express = require("express")
import cors from 'cors';

// Route imports
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import cartRoutes from './routes/cartRoutes';
import { errorHandler } from './middlewares/errorHandler';


// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Global error handler 
app.use(errorHandler);

export default app;
