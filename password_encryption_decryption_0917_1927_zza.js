// 代码生成时间: 2025-09-17 19:27:15
const { createHash } = require('crypto');

// 密码加密解密工具
class PasswordUtil {
  // 生成密码的哈希值
  static hashPassword(password) {
    if (!password) {
      throw new Error('Password is required');
    }
    return createHash('sha256').update(password).digest('hex');
  }

  // 验证密码是否匹配哈希值
  static verifyPassword(password, hashedPassword) {
    if (!password || !hashedPassword) {
      throw new Error('Password and hashed password are required');
    }
    const hashed = this.hashPassword(password);
    return hashed === hashedPassword;
  }
}

// 导出模块
module.exports = PasswordUtil;