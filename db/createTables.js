// backend/createTables.js
const db = require('./db');

function createTables() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      )
    `);
    console.log('Tables created (if not exist).');
  });
}

module.exports = createTables;
