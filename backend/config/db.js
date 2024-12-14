import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB... ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB... ${error.message}`);
        process.exit(1); // proccess code 1 means exit with failure, 0 means success
    }
};