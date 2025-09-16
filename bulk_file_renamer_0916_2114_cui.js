// 代码生成时间: 2025-09-16 21:14:59
const fs = require('fs').promises;
const path = require('path');

// Function to rename files in the specified directory
async function renameFilesInDirectory(directoryPath, matchPattern, replacePattern) {
  try {
    // Read all files in the directory
    const files = await fs.readdir(directoryPath);

    // Construct the full path for each file
    for (const file of files) {
      const filePath = path.join(directoryPath, file);

      // Check if the file matches the pattern
      if (filePath.match(matchPattern)) {
        // Create the new file name based on the replace pattern
        const newFileName = filePath.replace(matchPattern, replacePattern);

        // Rename the file
        await fs.rename(filePath, newFileName);
        console.log(`Renamed ${filePath} to ${newFileName}`);
      }
    }
  } catch (error) {
    console.error('Error renaming files:', error);
  }
}

// Usage example:
// This will rename all files in the 'uploads' directory
// that contain 'oldName' to 'newName'.
// renameFilesInDirectory('uploads', /oldName/g, 'newName');

// Make sure to handle the environment setup and security considerations
// before using this script in a production environment.

module.exports = { renameFilesInDirectory };