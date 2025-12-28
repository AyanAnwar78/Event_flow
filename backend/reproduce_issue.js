const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/event_management';
    console.log('Attempting to connect to:', uri.replace(/:([^:@]{1,})@/, ':****@')); // Hide password in logs

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of default 30s
        });
        console.log('MongoDB Connected successfully!');

        // Try a simple operation
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        process.exit(0);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

connectDB();
