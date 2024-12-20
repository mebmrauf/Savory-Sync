import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import { connectDB } from './config/db.js';
import orderListRoutes from './routes/orderListRoutes.js'; // Import order list routes

dotenv.config();

const server = express();
const port = process.env.PORT || 2001;

// Middleware
// server.use(cors()); // Enable cross-origin requests
server.use(express.json()); // Accept JSON data in request body

// Database Connection
connectDB();

// Routes
server.use('/orders', orderListRoutes); // Mount order list routes

// Catch-All Route for Undefined Endpoints
server.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handling Middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start Server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
