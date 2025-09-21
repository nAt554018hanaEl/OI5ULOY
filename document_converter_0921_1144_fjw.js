// 代码生成时间: 2025-09-21 11:44:13
const express = require('express');
const next = require('next');
const fs = require('fs');
const path = require('path');

// Initialize Next.js app
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Define supported formats
const supportedFormats = ['pdf', 'docx', 'txt'];

// Middleware to handle document conversion
app.prepare().then(() => {
  const server = express();
  
  // Serve Next.js app
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  
  // POST endpoint to convert documents
  server.post('/convert', (req, res) => {
    // Check if file is provided
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        error: 'No file uploaded.'
      });
    }
    
    // Get file from request
    const file = req.files.file;
    
    // Check if file format is supported
    const fileExt = path.extname(file.name).toLowerCase().substring(1);
    if (!supportedFormats.includes(fileExt)) {
      return res.status(400).json({
        error: `Unsupported file format: ${fileExt}.`
      });
    }
    
    // Convert document (Dummy implementation for demonstration)
    const outputFilePath = path.join(__dirname, 'output', `${path.basename(file.name, path.extname(file.name))}_converted.${fileExt}`);
    fs.copyFileSync(file.tempFilePath, outputFilePath);
    
    // Respond with converted file path
    res.status(200).json({
      message: 'Document converted successfully.',
      filePath: outputFilePath
    });
  });
  
  // Start server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server listening on http://localhost:3000');
  });
});
