const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const bcrypt = require('bcrypt');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Existing Data Cleared.');

    // Seed Users
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('demo1234', salt);
    const userPassword = await bcrypt.hash('demo1234', salt);

    const createdUsers = await User.insertMany([
      { name: 'Admin User', email: 'admin@gladiator.com', password: adminPassword, role: 'Admin' },
      { name: 'Regular User', email: 'user@gladiator.com', password: userPassword, role: 'User' }
    ]);
    
    const adminId = createdUsers[0]._id;

    // Seed Products
    const products = [
      {
        user: adminId,
        title: 'Premium Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        brand: 'AudioTech',
        category: 'Electronics',
        description: 'High-fidelity audio with active noise cancellation.',
        price: 299.99,
        countInStock: 15,
        rating: 4.8,
        numReviews: 12
      },
      {
        user: adminId,
        title: 'Smart Fitness Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        brand: 'FitPro',
        category: 'Electronics',
        description: 'Track your health, workouts, and stay connected.',
        price: 199.50,
        countInStock: 25,
        rating: 4.6,
        numReviews: 8
      },
      {
        user: adminId,
        title: 'Ultra-thin Laptop',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
        brand: 'ComputeX',
        category: 'Electronics',
        description: 'Powerful performance in a sleek, lightweight design.',
        price: 1299.00,
        countInStock: 5,
        rating: 4.9,
        numReviews: 15
      },
      {
        user: adminId,
        title: 'Running Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
        brand: 'Stride',
        category: 'Sports',
        description: 'Comfortable and durable running shoes for everyday use.',
        price: 89.99,
        countInStock: 40,
        rating: 4.5,
        numReviews: 24
      },
      {
        user: adminId,
        title: 'Designer T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
        brand: 'Vogue',
        category: 'Fashion',
        description: 'Premium cotton t-shirt with a modern fit.',
        price: 34.99,
        countInStock: 50,
        rating: 4.2,
        numReviews: 5
      },
      {
        user: adminId,
        title: 'Smart Home Speaker',
        image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80',
        brand: 'HomeTech',
        category: 'Home & Living',
        description: 'Control your smart home with your voice.',
        price: 149.99,
        countInStock: 10,
        rating: 4.7,
        numReviews: 18
      }
    ];

    await Product.insertMany(products);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with Seeder: ${error.message}`);
    process.exit(1);
  }
};

seedData();
