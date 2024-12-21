import mongoose from 'mongoose';

const shoppingListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            },
            unit: {
                type: String,
                default: 'pcs'
            },
        },
    ],
}, {
    timestamps: true
});

// Ensure that a user cannot have duplicate items in their shopping list by enforcing a compound index
shoppingListSchema.index({ userId: 1, 'items.name': 1 }, { unique: true });

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

export default ShoppingList;