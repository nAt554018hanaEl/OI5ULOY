// 代码生成时间: 2025-10-09 22:22:31
const fs = require('fs');
const path = require('path');

// Function to extract metadata from a file
async function extractMetadata(filePath) {
  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    // Get the file stats
    const stats = fs.statSync(filePath);

    // Extract metadata
    const metadata = {
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      fileSize: stats.size,
      isDirectory: stats.isDirectory(),
      permissions: stats.mode,
    };

    // Return the metadata object
    return metadata;
  } catch (error) {
    console.error('Error extracting metadata:', error.message);
    throw error;
  }
}

// Function to handle file metadata extraction request
async function handleMetadataRequest(req, res) {
  try {
    // Extract the file path from the request query
    const filePath = req.query.filePath;

    // Validate the file path
    if (!filePath) {
      throw new Error('File path is required');
    }

    // Call the extractMetadata function
    const metadata = await extractMetadata(filePath);

    // Send the metadata as a JSON response
    res.status(200).json(metadata);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: error.message });
  }
}

// Export the metadata extraction handler
module.exports = { handleMetadataRequest };
