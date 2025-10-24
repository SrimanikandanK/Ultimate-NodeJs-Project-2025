const momgoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async (mongoURI) => {
  try {
    await momgoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;