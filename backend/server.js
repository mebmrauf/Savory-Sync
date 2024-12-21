import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import shoppingListRoutes from './routes/shoppingListRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorMiddleware.js';
import orderRoutes from "./routes/orderRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";


dotenv.config();
connectDB();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/shopping-list', shoppingListRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/notifications', notificationRoutes)
// Error handling middleware
app.use(errorHandler);

// Export the app to be used in tests
export default app;

// Start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}