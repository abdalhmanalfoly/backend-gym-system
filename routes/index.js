const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET /api/users
router.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

// routes/index.js

// POST /api/users
router.post('/users', (req, res) => {
  const { name, email } = req.body;

  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.run(sql, [name, email], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email });
  });
});



module.exports = router;
