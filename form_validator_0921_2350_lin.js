// 代码生成时间: 2025-09-21 23:50:10
const { NextResponse } = require('next/server');

// 表单数据验证器
// 验证表单数据是否符合预设的规则
class FormValidator {
  constructor(rules) {
    this.rules = rules;
  }

  // 验证单个字段
  validateField(field, value) {
    const rule = this.rules[field];
    if (!rule) {
      throw new Error(`No validation rule for field: ${field}`);
    }

    // 检查是否有必需的验证规则
    if (rule.required && value === undefined) {
      return `The ${field} is required.`;
    }

    // 检查是否满足最小长度要求
    if (rule.minLength && value.length < rule.minLength) {
      return `The ${field} must be at least ${rule.minLength} characters long.`;
    }

    // 检查是否满足最大长度要求
    if (rule.maxLength && value.length > rule.maxLength) {
      return `The ${field} must be no more than ${rule.maxLength} characters long.`;
    }

    // 检查是否满足正则表达式匹配要求
    if (rule.pattern && !rule.pattern.test(value)) {
      return `The ${field} is invalid.`;
    }

    return null; // 无错误信息表示验证通过
  }

  // 验证整个表单
  validateFormData(formData) {
    const errors = [];
    for (const field in formData) {
      const error = this.validateField(field, formData[field]);
      if (error) {
        errors.push(error);
      }
    }
    return errors.length ? errors : null;
  }
}

// 使用示例
// 定义表单验证规则
const rules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  password: {
    required: true,
    minLength: 8,
  },
  email: {
    required: true,
    pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,6}$/,
  },
};

// 创建表单验证器实例
const validator = new FormValidator(rules);

// 模拟表单提交数据
const formData = {
  username: 'john_doe',
  password: '123456',
  email: 'john@example.com',
};

// 验证表单数据
const errors = validator.validateFormData(formData);

// 处理验证结果
if (errors) {
  console.error('Validation errors:', errors);
} else {
  console.log('Form data is valid.');
}
