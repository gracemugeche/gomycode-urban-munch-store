import express from 'express';
import cors from 'cors';
// import authRoutes from './routes/authRoutes'; // you’ll create this soon
// import errorHandler from './middlewares/errorHandler'; // optional for now
//create app
const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes); // placeholder route

// Error handler
// app.use(errorHandler); // optional

export default app;
