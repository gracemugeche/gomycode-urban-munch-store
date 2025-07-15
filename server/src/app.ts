const express = require("express")
import cors from 'cors';

// Route imports
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import cartRoutes from './routes/cartRoutes';
import userRoutes from './routes/userRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import authRoutes from './routes/authRoutes';
// import stripeRoutes from './routes/stripeRoutes';
import { errorHandler } from './middlewares/errorHandler';



// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/stripe', stripeRoutes);

// Global error handler 
app.use(errorHandler);

export default app;
