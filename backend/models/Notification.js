import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, enum: ['order', 'system', 'alert'], default: 'order' }, // Optional
    actionUrl: { type: String, required: false }, // Optional
    title: { type: String, required: false }, // Optional
});

notificationSchema.index({ userId: 1, read: 1 }); // Optional: For performance

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;