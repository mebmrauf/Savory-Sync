import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        shoppingListId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList', required: true },
        items: [{
            name: String,
            quantity: Number,
            unitPrice: Number,
            totalPrice: Number
        }],
        totalAmount: { type: Number, required: true },
        mobileNumber: { type: String, required: true },
        address: { type: String, required: true },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        shopkeeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Shopkeeper handling the delivery
        deliveryCode: { type: String, unique: true }, // For verifying the delivery when it's marked as delivered
        feedback: {
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String }
        }
    },
    { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

// Virtual for user-friendly order status
orderSchema.virtual('formattedStatus').get(function() {
    const statusMap = {
        'Pending': 'Order placed, awaiting confirmation',
        'Confirmed': 'Order confirmed, awaiting delivery',
        'Out for Delivery': 'On the way to you!',
        'Delivered': 'Order delivered successfully',
        'Cancelled': 'Order was cancelled'
    };
    return statusMap[this.status] || 'Unknown status';
});

// Pre-save hook to generate delivery code if not set
orderSchema.pre('save', function(next) {
    if (this.isNew && !this.deliveryCode) {
        // Generate unique delivery code if it's not already set
        this.deliveryCode = uuidv4().slice(0, 4); // Assuming uuid is imported
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
