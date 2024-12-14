import express from 'express';
import {
    getOrderList,
    addOrderItem,
    updateOrderItemQuantity
} from '../controllers/orderListController.js';

const router = express.Router();

// Route to get all orders
router.get('/', getOrderList);

// Route to add an item to the order list
router.post('/', addOrderItem);

// Route to update item quantity
router.put('/:id', updateOrderItemQuantity);

export default router;