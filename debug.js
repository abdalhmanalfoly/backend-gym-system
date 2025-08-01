// backend/debug.js
const db = require('./db/db');

db.serialize(() => {
  console.log('📋 Available tables:');
  db.each(`SELECT name FROM sqlite_master WHERE type='table'`, (err, row) => {
    console.log(`- ${row.name}`);
  });

});
