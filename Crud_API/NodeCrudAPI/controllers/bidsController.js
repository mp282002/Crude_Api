const { getConnection } = require('../db');

async function getAllBidsForItem(itemId) {
  const connection = getConnection();

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM bids WHERE item_id = ?', [itemId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function placeBid(itemId, userId, bidAmount) {
  const connection = getConnection();

  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO bids (item_id, user_id, bid_amount) VALUES (?, ?, ?)',
      [itemId, userId, bidAmount],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          connection.query(
            'UPDATE items SET current_price = ? WHERE id = ? AND current_price < ?',
            [bidAmount, itemId, bidAmount],
            (updateError) => {
              if (updateError) {
                reject(updateError);
              } else {
                resolve(results.insertId);
              }
            }
          );
        }
      }
    );
  });
}

module.exports = { getAllBidsForItem, placeBid };
