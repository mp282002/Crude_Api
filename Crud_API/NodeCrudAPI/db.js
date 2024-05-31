// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost', // e.g., 'localhost'
//   user: 'root',
//   password: 'mpatil@28',
//   database: 'CRUD',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool.promise();

const mysql = require('mysql2');
let connection;

function connectToDatabase() {
  connection = mysql.createConnection({
    host: 'localhost', // e.g., 'localhost'
    user: 'root',
    password: 'mpatil@28',
    database: 'crud'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    }
    console.log('Connected to the database');
  });
}

function getConnection() {
  if (!connection) {
    connectToDatabase();
  }
  return connection;
}

module.exports = { connectToDatabase, getConnection };
