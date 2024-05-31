const { getConnection } = require('../db');

async function getAllItems() {
  const connection = getConnection();

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM items', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function getItemById(id) {
  const connection = getConnection();

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM items WHERE id = ?', [id], (error, results) => {
      if (error || results.length === 0) {
        reject(new Error('Item not found'));
      } else {
        resolve(results[0]);
      }
    });
  });
}

async function createItem(name, description, startingPrice, endTime, imageUrl) {
  const connection = getConnection();

  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO items (name, description, starting_price, current_price, end_time, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, startingPrice, startingPrice, endTime, imageUrl],
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

async function updateItem(id, name, description, startingPrice, endTime, imageUrl) {
  const connection = getConnection();

  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE items SET name = ?, description = ?, starting_price = ?, end_time = ?, image_url = ? WHERE id = ?',
      [name, description, startingPrice, endTime, imageUrl, id],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

async function deleteItem(id) {
  const connection = getConnection();

  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM items WHERE id = ?', [id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
