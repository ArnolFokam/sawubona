import mongoose from 'mongoose';

export default async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};