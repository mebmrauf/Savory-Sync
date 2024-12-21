import ShoppingList from '../models/ShoppingList.js';

export const getShoppingList = async (req, res) => {
    const { userId } = req.user;
    try {
        const shoppingList = await ShoppingList.findOne({ userId });
        if (!shoppingList) {
            return res.status(404).json({ message: 'Shopping list not found' });
        }
        res.json(shoppingList);
    } catch (error) {
        console.error('Error fetching shopping list:', error);
        res.status(500).json({ message: 'Error fetching shopping list', error: error.message });
    }
};

export const addMultipleItems = async (req, res) => {
    const { userId } = req.user;  // Ensure req.user is populated from authMiddleware
    const { items } = req.body;

    try {
        // Validate the items array
        if (!Array.isArray(items) || items.some(item => !item.name || !item.quantity)) {
            return res.status(400).json({ message: 'Invalid items format' });
        }

        let shoppingList = await ShoppingList.findOne({ userId });

        if (shoppingList) {
            // Existing shopping list, add items
            items.forEach(item => {
                const existingItem = shoppingList.items.find(i => i.name === item.name);
                if (!existingItem) {
                    shoppingList.items.push(item);
                } else {
                    existingItem.quantity += item.quantity;
                }
            });
            await shoppingList.save();
        } else {
            // New shopping list
            shoppingList = new ShoppingList({
                userId,  // Ensure this is correctly set
                items
            });
            await shoppingList.save();
        }

        res.status(201).json(shoppingList);  // Respond with 201 when a new shopping list is created
    } catch (error) {
        console.error('Error adding multiple items:', error);
        res.status(500).json({ message: 'Error adding multiple items', error: error.message });
    }
};

export const updateItem = async (req, res) => {
    const { userId } = req.user;
    const { itemId } = req.params;
    const { quantity } = req.body;

    try {
        // Ensure valid quantity
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than zero' });
        }

        const shoppingList = await ShoppingList.findOneAndUpdate(
            { userId, 'items._id': itemId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        );

        if (!shoppingList) {
            return res.status(404).json({ message: 'Shopping list or item not found' });
        }

        res.status(200).json(shoppingList);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
};

export const deleteMultipleItems = async (req, res) => {
    const { userId } = req.user;
    const { itemIds } = req.body;

    try {
        // Ensure itemIds is an array and contains values
        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return res.status(400).json({ message: 'Item IDs must be an array and cannot be empty' });
        }

        const shoppingList = await ShoppingList.findOneAndUpdate(
            { userId },
            { $pull: { items: { _id: { $in: itemIds } } } },
            { new: true }
        );

        if (!shoppingList) {
            return res.status(404).json({ message: 'Shopping list not found' });
        }

        res.status(200).json(shoppingList);
    } catch (error) {
        console.error('Error deleting multiple items:', error);
        res.status(500).json({ message: 'Error deleting multiple items', error: error.message });
    }
};