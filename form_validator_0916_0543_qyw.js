// 代码生成时间: 2025-09-16 05:43:38
// Form Validator using JS and NEXT.js framework
// This module provides a validator function to check form data
// against a set of rules.

const { NextResponse } = require('next/server');
const validate = (data, rules) => {
  // Check if data and rules are valid objects
  if (typeof data !== 'object' || typeof rules !== 'object') {
    return { valid: false, error: 'Invalid input data or rules' };
  }

  // Iterate over rules and validate each field
  for (const field in rules) {
    if (rules.hasOwnProperty(field)) {
      const rule = rules[field];
      const value = data[field];

      // Check if the field exists in data
      if (!value && value !== 0) { // 0 is considered a valid value
        return { valid: false, error: `Missing value for field: ${field}` };
      }

      // Check if the rule is a string (assumed to be a function name)
      if (typeof rule === 'string' && typeof this[rule] === 'function') {
        const result = this[rule](value);
        if (!result) {
          return { valid: false, error: `Validation failed for field: ${field}` };
        }
      }
    }
  }

  // If all checks pass, the data is valid
  return { valid: true, error: null };
};

// Example of custom validation rules
const validators = {
  required: (value) => value !== undefined && value !== null && value !== '',
  email: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
  min: (min) => (value) => value.length >= min,
  max: (max) => (value) => value.length <= max,
};

// Export the validator function
module.exports = {
  validate,
  validators,
};
