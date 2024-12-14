import Orderlist from '../models/orderlistModel.js';
import mongoose from 'mongoose';

// Get all orders
export const getOrderList = async (req, res) => {
    try {
        const orders = await Orderlist.find().populate('user', 'name email'); // Populate user details
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

// Add an item to the order list
export const addOrderItem = async (req, res) => {
    const { user, name, quantity, price, image } = req.body;

    if (!user || !name || !quantity || !price || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const totalCost = quantity * price; // Calculate total cost for the item

        const newOrderItem = new Orderlist({
            user,
            name,
            quantity,
            price,
            totalCost,
            image
        });

        const savedOrder = await newOrderItem.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add order item', error: error.message });
    }
};

// Update item quantity in the order list
export const updateOrderItemQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    try {
        const orderItem = await Orderlist.findById(id);

        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        orderItem.quantity = quantity;
        orderItem.totalCost = orderItem.price * quantity; // Update total cost
        const updatedOrderItem = await orderItem.save();

        res.status(200).json(updatedOrderItem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update quantity', error: error.message });
    }
};