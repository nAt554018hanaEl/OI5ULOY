// 代码生成时间: 2025-09-16 11:47:18
 * Features:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 * - Error handling
 *
 * @author Your Name
 * @version 1.0.0
 */

const express = require('express');
const app = express();
app.use(express.json());

// Define a MathToolkit class to encapsulate mathematical operations.
class MathToolkit {
  // Addition method
  add(a, b) {
    return a + b;
  }

  // Subtraction method
  subtract(a, b) {
    return a - b;
  }

  // Multiplication method
  multiply(a, b) {
    return a * b;
  }

  // Division method with error handling
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return a / b;
  }

  // More operations can be added here as needed.
}

// Create an instance of MathToolkit.
const mathToolkit = new MathToolkit();

// Define API routes.
app.post('/add', (req, res) => {
  try {
    const result = mathToolkit.add(req.body.a, req.body.b);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/subtract', (req, res) => {
  try {
    const result = mathToolkit.subtract(req.body.a, req.body.b);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/multiply', (req, res) => {
  try {
    const result = mathToolkit.multiply(req.body.a, req.body.b);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/divide', (req, res) => {
  try {
    const result = mathToolkit.divide(req.body.a, req.body.b);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MathToolkit server is running on port ${PORT}`);
});