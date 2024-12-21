import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Retrieve token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token is provided, return an error
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify JWT token
    try {
        // Check if JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: 'JWT_SECRET is not defined in environment variables.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user data to the request object

        next();  // Proceed to the next middleware/route handler
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired. Please log in again.' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        } else if (err.name === 'NotBeforeError') {
            return res.status(401).json({ error: 'Token is not active yet.' });
        }

        // Catch-all for any other JWT errors
        return res.status(401).json({ error: 'Invalid token.' });
    }
};

export default authMiddleware;
