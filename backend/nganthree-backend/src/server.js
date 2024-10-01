import express, { json } from 'express';
import morgan from 'morgan'; // Import morgan
import userRoutes from './routes/userRoutes.js';
import queueRoutes from './routes/queueRoutes.js';
import statusRoutes from './routes/statusRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(json());
app.use(cors({
  origin: true
}));
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/queues', queueRoutes);
app.use('/statuses', statusRoutes);

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
