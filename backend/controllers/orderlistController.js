import mongoose from 'mongoose';
import Orderlist from '../models/orderlistModel.js';

// Get all orders
export const getOrderList = async (req, res) => {
    try {
        const orders = await Orderlist.find()
            // .populate('user', 'name email'); // Populate user details
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

// Add an item to the order list
export const addOrderItem = async (req, res) => {
    const { orderID, user, name, quantity, price, image } = req.body;

    if (!orderID || !user || !name || !quantity || !price || !image) {
        return res.status(400).json({ success: false, message: 'All the fields are required' });
    }

    // Convert user to ObjectId
    const userId = new mongoose.Types.ObjectId(user);

    try {
        const newOrderItem = new Orderlist({ orderId: orderID, user: userId, name,quantity,price,image });

        const savedOrder = await newOrderItem.save();
        return res.status(201).json({ success: true, data: savedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add order item', error: error.message });
    }
};

// Update item quantity in the order list
export const updateOrderItemQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid quantity' });
    }

    try {
        const orderItem = await Orderlist.findById(id);

        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        orderItem.quantity = quantity; // Only update the quantity; totalCost is calculated dynamically
        const updatedOrderItem = await orderItem.save();

        res.status(200).json({ success: true, data: updatedOrderItem });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update quantity', error: error.message });
    }
};

// Delete an order item
export const deleteOrderItem = async (req, res) => {
    const { id } = req.params;

    try {
        const orderItem = await Orderlist.findById(id);

        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        await orderItem.deleteOne();
        res.status(200).json({ success: true, message: 'Order item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order item', error: error.message });
    }
};