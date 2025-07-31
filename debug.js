// backend/debug.js
const db = require('./db/db');

db.serialize(() => {
  console.log('📋 Available tables:');
  db.each(`SELECT name FROM sqlite_master WHERE type='table'`, (err, row) => {
    console.log(`- ${row.name}`);
  });
  db.run('DELETE FROM users', (err) => {
  if (err) console.error(err.message);
  else console.log('All users deleted.');
});


  console.log('\n📦 Data in users:');
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
});
