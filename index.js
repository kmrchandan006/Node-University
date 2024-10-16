const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load the environment variables from the .env file

const app = express();

// Import routes
const servicesRoutes = require('./routes/servicesRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Use the environment variable for MongoDB connection string
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test'; // Default to local MongoDB if not set in .env

// Mongoose connection with enhanced options
const connectWithRetry = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000, // Set timeout to 10 seconds
        serverSelectionTimeoutMS: 5000, // Time for server selection before error
        socketTimeoutMS: 45000, // Closes sockets after 45 seconds of inactivity
    })
    .then(() => {
        console.log('DB Connected.');
    })
    .catch((err) => {
        console.log('DB connection error:', err);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

// Establish initial connection
connectWithRetry();

// Use routes
app.use('/api', servicesRoutes); // Use /api for services and slider routes
app.use('/admin', adminRoutes);  // Use /admin for admin-related routes

// Start the server
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000
app.listen(PORT, () => {
    console.log(`Backend Running At Port ${PORT}`);
});
