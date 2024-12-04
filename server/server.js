import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5174', // Allow requests from the frontend URL
    credentials: true,              // Allow cookies if needed
  }));
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (_req, res) => {
    res.send('Server is running!');
  });
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});