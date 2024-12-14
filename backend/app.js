import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import { connectDB } from './config/db.js';
import orderListRoutes from './routes/orderListRoutes.js'; // Import order list routes

dotenv.config();

const app = express();
const port = process.env.PORT || 2001;

// Middleware
// app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Accept JSON data in request body

// Database Connection
connectDB();

// Routes
app.use('/api/orders', orderListRoutes); // Mount order list routes

// Catch-All Route for Undefined Endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
