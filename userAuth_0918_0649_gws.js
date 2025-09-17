// 代码生成时间: 2025-09-18 06:49:41
// Import necessary dependencies
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { NextResponse } = require('next/server');

// MongoDB connection URL (replace with your actual MongoDB connection string)
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'yourDatabase';

// Function to connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db(DB_NAME);
  return db;
}

// Function to verify user credentials
async function authenticateUser(username, password) {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Find user by username
    const user = await usersCollection.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided password with the stored hash
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new Error('Invalid password');
    }

    return {
      success: true,
      message: 'User authenticated successfully',
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      message: error.message,
    };
  }
}

// Next.js API route handler for user login
export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return new NextResponse('Username and password are required', { status: 400 });
    }

    const authResult = await authenticateUser(username, password);
    if (!authResult.success) {
      return new NextResponse(authResult.message, { status: 401 });
    }

    // Return a success response
    return new NextResponse(authResult.message, { status: 200 });
  } catch (error)
  {
    return new NextResponse('Internal server error', { status: 500 });
  }
}
