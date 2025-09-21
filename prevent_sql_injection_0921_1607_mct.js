// 代码生成时间: 2025-09-21 16:07:40
const { Pool } = require('pg'); // 使用pg模块，一个Node.js PostgreSQL客户端

// 设置数据库连接池
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// 异步函数，防止SQL注入
// 查询参数使用参数化查询
async function getUserData(userName) {
  try {
    // 使用参数化查询防止SQL注入
    const res = await pool.query('SELECT * FROM users WHERE username = $1', [userName]);
    return res.rows;
  } catch (err) {
    // 错误处理
    console.error('Database query error:', err);
    throw err;
  } finally {
    // 关闭数据库连接
    await pool.end();
  }
}

// 函数用于插入用户数据，防止SQL注入
async function createUser(userData) {
  try {
    // 使用参数化查询防止SQL注入
    const res = await pool.query('INSERT INTO users (username, age) VALUES ($1, $2)', [userData.username, userData.age]);
    return res;
  } catch (err) {
    // 错误处理
    console.error('Database insert error:', err);
    throw err;
  } finally {
    // 关闭数据库连接
    await pool.end();
  }
}

// 导出函数以在其他文件中使用
module.exports = {
  getUserData,
  createUser,
};

// 注意：
// 1. 确保在实际部署时，数据库连接参数（如用户名、密码等）不要硬编码在代码中
// 2. 使用环境变量来管理敏感信息
// 3. 确保数据库连接池在项目停止时被正确关闭
// 4. 错误处理应该更加详细，可以根据不同的错误类型进行不同的处理
// 5. 代码示例中只展示了基本的防止SQL注入的方法，实际应用中可能需要更复杂的安全措施