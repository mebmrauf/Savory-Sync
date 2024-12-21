import express from 'express';
import {
    createOrder,
    confirmOrder,
    startDelivery,
    completeDelivery,
    cancelOrder,
    generateDeliveryCode,
    provideFeedback
} from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';  // New middleware for role-based access control

const router = express.Router();

// Routes for Order Management
router.post('/create', authMiddleware, createOrder); // Route for placing an order
router.put('/confirm/:orderId', authMiddleware, confirmOrder); // Route for confirming an order (use PUT for updating)
router.put('/start-delivery/:orderId', authMiddleware, roleMiddleware('shopkeeper'), startDelivery); // Only shopkeepers can start delivery
router.put('/complete-delivery/:orderId/:deliveryCode', authMiddleware, roleMiddleware('shopkeeper'), completeDelivery); // Only shopkeepers can complete delivery
router.put('/cancel/:orderId', authMiddleware, cancelOrder); // Route for cancelling an order (use PUT for updating)
router.get('/generate-delivery-code', authMiddleware, generateDeliveryCode); // Route to generate delivery code (for internal use)
router.post('/feedback/:orderId', authMiddleware, provideFeedback); // Route to submit feedback

export default router;