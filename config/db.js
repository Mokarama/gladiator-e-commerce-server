const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn(`WARNING: Running in disconnected mode. Data fetching will fail until MongoDB is started.`);
    // process.exit(1); removed to prevent server crash
  }
};

module.exports = connectDB;
