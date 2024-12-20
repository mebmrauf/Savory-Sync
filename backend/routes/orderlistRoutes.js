import express from 'express';
import { getOrderList, addOrderItem, updateOrderItemQuantity, deleteOrderItem } from '../controllers/orderListController.js';

const router = express.Router();

// Route to get all orders
router.get('/', getOrderList);

// Route to add an item to the order list
router.post('/', addOrderItem);

// Route to update item quantity
router.put('/:id', updateOrderItemQuantity);

// Route to delete an item from the order list
router.delete('/:id', deleteOrderItem);

export default router;