import Order from '../models/Order.js';
import ShoppingList from '../models/ShoppingList.js';
import { createNotification } from '../controllers/notificationController.js';

// Define valid transitions for order statuses
const validTransitions = {
    'Pending': ['Confirmed', 'Cancelled'],
    'Confirmed': ['Out for Delivery'],
    'Out for Delivery': ['Delivered'],
};

// Create Order
export const createOrder = async (req, res) => {
    const { shoppingListId, mobileNumber, address } = req.body;
    const { userId } = req.user;

    try {
        // Find the shopping list associated with the user
        const shoppingList = await ShoppingList.findOne({ userId, _id: shoppingListId });

        if (!shoppingList) {
            return res.status(400).json({ message: 'Shopping list not found' });
        }

        // Calculate total amount by iterating over the items in the shopping list
        const items = shoppingList.items.map(item => ({
            ...item,
            totalPrice: item.quantity * item.unitPrice,  // Calculate total price per item
        }));
        const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);  // Calculate total order amount

        // Create the order in the database
        const order = await Order.create({
            userId,
            shoppingListId,
            items,
            totalAmount,
            mobileNumber,
            address,
            status: 'Pending',  // Initial status is 'Pending'
        });

        // Create a notification for the user that their order was placed
        await createNotification(userId, `Your order has been placed. Total amount: ${totalAmount}`);

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
};

// Confirm Order
export const confirmOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the current status allows transition to 'Confirmed'
        if (!validTransitions[order.status]?.includes('Confirmed')) {
            return res.status(400).json({ message: `Invalid status transition from ${order.status} to Confirmed` });
        }

        // Update the order status to 'Confirmed'
        order.status = 'Confirmed';
        await order.save();

        // Notify the user about the order confirmation
        await createNotification(order.userId, `Your order ${orderId} has been confirmed!`);

        res.status(200).json({ message: 'Order confirmed', order });
    } catch (error) {
        res.status(500).json({ message: 'Error confirming order', error });
    }
};

// Start Delivery
export const startDelivery = async (req, res) => {
    const { orderId } = req.params;

    // Check if the logged-in user is a shopkeeper
    if (req.user.role !== 'shopkeeper') {
        return res.status(403).json({ message: 'Only shopkeepers can start deliveries.' });
    }

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the current status allows transition to 'Out for Delivery'
        if (!validTransitions[order.status]?.includes('Out for Delivery')) {
            return res.status(400).json({ message: `Invalid status transition from ${order.status} to Out for Delivery` });
        }

        // Update the order status to 'Out for Delivery'
        order.status = 'Out for Delivery';
        order.shopkeeperId = req.user.id;  // Assign the shopkeeper handling the delivery
        await order.save();

        // Notify the user about the delivery start
        await createNotification(
            order.userId,
            `Your order is now out for delivery. Shopkeeper: ${req.user.name}, Contact: ${req.user.mobile}`
        );

        res.status(200).json({
            message: 'Delivery started',
            order: {
                ...order.toObject(),
                shopkeeper: {
                    name: req.user.name,
                    mobile: req.user.mobile,  // Assuming the shopkeeper's mobile number is available
                },
                formattedStatus: order.formattedStatus,  // Include the formatted status
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error starting delivery', error });
    }
};

// Complete Delivery
export const completeDelivery = async (req, res) => {
    const { orderId, deliveryCode } = req.params;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the current status allows transition to 'Delivered'
        if (!validTransitions[order.status]?.includes('Delivered')) {
            return res.status(400).json({ message: `Invalid status transition from ${order.status} to Delivered` });
        }

        // Validate the delivery code
        if (order.deliveryCode !== deliveryCode) {
            return res.status(400).json({ message: 'Invalid delivery code' });
        }

        // Update the order status to 'Delivered'
        order.status = 'Delivered';
        await order.save();

        // Notify user and shopkeeper about the successful delivery
        await createNotification(order.userId, `Your order ${orderId} has been successfully delivered. Thank you for shopping!`);
        await createNotification(order.shopkeeperId, `Your delivery of order ${orderId} has been completed.`);

        res.status(200).json({ message: 'Order delivered successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error completing delivery', error });
    }
};

// Cancel Order
export const cancelOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the current status allows transition to 'Cancelled'
        if (!validTransitions[order.status]?.includes('Cancelled')) {
            return res.status(400).json({ message: `Invalid status transition from ${order.status} to Cancelled` });
        }

        // Update the order status to 'Cancelled'
        order.status = 'Cancelled';
        await order.save();

        // Notify user about the cancellation
        await createNotification(order.userId, `Your order ${orderId} has been cancelled.`);

        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling order', error });
    }
};

// Provide Feedback
export const provideFeedback = async (req, res) => {
    const { orderId, rating, comment } = req.body;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Save feedback on the order
        order.feedback = { rating, comment };
        await order.save();

        res.status(200).json({ message: 'Feedback provided', order });
    } catch (error) {
        res.status(500).json({ message: 'Error providing feedback', error });
    }
};