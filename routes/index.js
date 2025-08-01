const express = require('express');
const router = express.Router();
const db = require('../db/db');




// memmber routes


// 📌 Get all members done run
router.get('/members', (req, res) => {
  db.all('SELECT * FROM members', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 📌 Get member by ID done
router.get('/members/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM members WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Member not found' });
    res.json(row);
  });
});

// 📌 Create new member done

router.post('/members', (req, res) => {
  const {
    name,
    gender,
    phone_number,
    registration_date,
    address,
    weight,
    renewal_date,
    monthly_plan,
    selected_service
  } = req.body;

  // Step 1: get the max current membership number
  db.get(`SELECT membership_number FROM members ORDER BY id DESC LIMIT 1`, [], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving last membership number' });
    }

    let nextNumber = 1;
    if (row && row.membership_number) {
      const current = parseInt(row.membership_number.replace('GYM', ''));
      nextNumber = current + 1;
    }

    const generatedMembershipNumber = `GYM${String(nextNumber).padStart(3, '0')}`;

    // Step 2: insert the new member
    const insertQuery = `
      INSERT INTO members 
      (name, membership_number, gender, phone_number, registration_date, address, weight, renewal_date, monthly_plan, selected_service)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name,
      generatedMembershipNumber,
      gender,
      phone_number,
      registration_date,
      address,
      weight,
      renewal_date,
      monthly_plan,
      selected_service
    ];

    db.run(insertQuery, values, function (insertErr) {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ message: 'Error inserting new member' });
      }

      res.status(201).json({ message: 'Member created', id: this.lastID, membership_number: generatedMembershipNumber });
    });
  });
});
// 📌 Update member by ID done
router.put('/members/:id', (req, res) => {
  const id = req.params.id;
  const {
    name, membership_number, gender, phone_number,
    registration_date, address, weight,
    renewal_date, monthly_plan, selected_service
  } = req.body;

  const sql = `
    UPDATE members SET
      name = ?, membership_number = ?, gender = ?, phone_number = ?,
      registration_date = ?, address = ?, weight = ?,
      renewal_date = ?, monthly_plan = ?, selected_service = ?
    WHERE id = ?
  `;

  const values = [
    name, membership_number, gender, phone_number,
    registration_date, address, weight,
    renewal_date, monthly_plan, selected_service,
    id
  ];

  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Member not found' });
    res.json({ message: 'Member updated' });
  });
});

// 📌 Delete member by ID done
router.delete('/members/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM members WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Member not found' });
    res.json({ message: 'Member deleted' });
  });
});

// memmber routes






// equipment routes


// Create equipment
router.post('/equipment', (req, res) => {
  const { equipment_name, equipment_description, purchase_date, condition, quantity } = req.body;
  const query = `
    INSERT INTO gym_equipment (equipment_name, equipment_description, purchase_date, condition, quantity)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [equipment_name, equipment_description, purchase_date, condition, quantity], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// Read all equipment
router.get('/equipment', (req, res) => {
  db.all('SELECT * FROM gym_equipment', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Read one equipment by ID
router.get('/equipment/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM gym_equipment WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Equipment not found' });
    res.json(row);
  });
});

// Update equipment
router.put('/equipment/:id', (req, res) => {
  const { id } = req.params;
  const { equipment_name, equipment_description, purchase_date, condition, quantity } = req.body;
  const query = `
    UPDATE gym_equipment
    SET equipment_name = ?, equipment_description = ?, purchase_date = ?, condition = ?, quantity = ?
    WHERE id = ?
  `;
  db.run(query, [equipment_name, equipment_description, purchase_date, condition, quantity, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Equipment not found' });
    res.json({ message: 'Equipment updated successfully' });
  });
});

// Delete equipment
router.delete('/equipment/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM gym_equipment WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Equipment not found' });
    res.json({ message: 'Equipment deleted successfully' });
  });
});





module.exports = router;
