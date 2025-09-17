// 代码生成时间: 2025-09-17 15:13:53
// random_number_generator.js
// This file contains a simple random number generator service using Next.js

const { NextResponse } = require('next/server');

// Function to generate a random number between min and max
function generateRandomNumber(min, max) {
  // Ensure min is less than max
  if (min > max) {
    throw new Error('Minimum value must be less than maximum value.');
  }
  // Generate a random number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// API route handler for generating a random number
async function handler(req) {
  // Parse query parameters
  const { min, max } = req.nextUrl.searchParams;

  // Check if min and max are provided and are numbers
  if (!min || !max || isNaN(Number(min)) || isNaN(Number(max))) {
    return NextResponse.json({
      error: 'Please provide both min and max as numerical values.'
    }, { status: 400 });
  }

  try {
    // Generate a random number
    const randomNumber = generateRandomNumber(Number(min), Number(max));
    // Return the random number
    return NextResponse.json({ randomNumber }, { status: 200 });
  } catch (error) {
    // Return an error message if something goes wrong
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Export the API route handler
export function GET() {
  return handler;
}

// Uncomment this line to test the API route in development
// export const config = { matcher: '/generate-random-number' };
