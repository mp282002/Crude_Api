const bcrypt = require('bcrypt');
const { getConnection } = require('../db');
const { generateToken } = require('../auth');

async function registerUser(username, password, email) {
  const connection = getConnection();
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      }
    );
  });
}

async function loginUser(username, password) {
  const connection = getConnection();

  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (error, results) => {
        if (error || results.length === 0) {
          reject(new Error('Invalid username or password'));
        } else {
          const user = results[0];
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            const token = generateToken(user);
            resolve({ token, userId: user.id, role: user.role });
          } else {
            reject(new Error('Invalid username or password'));
          }
        }
      }
    );
  });
}

async function getUserProfile(userId) {
  const connection = getConnection();

  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [userId],
      (error, results) => {
        if (error || results.length === 0) {
          reject(new Error('User not found'));
        } else {
          resolve(results[0]);
        }
      }
    );
  });
}

module.exports = { registerUser, loginUser, getUserProfile };
