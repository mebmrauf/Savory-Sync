import mongoose from 'mongoose';

const orderlistSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    totalCost: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    notes: {
        type: String
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});

const Orderlist = mongoose.model('Orderlist', orderlistSchema);

export default Orderlist;