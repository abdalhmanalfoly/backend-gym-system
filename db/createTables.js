// backend/createTables.js
const db = require('./db');

function createTables() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        membership_number TEXT UNIQUE,
        gender TEXT,
        phone_number TEXT,
        registration_date DATE,
        address TEXT,
        weight REAL,
        renewal_date DATE,
        monthly_plan TEXT,
        selected_service TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        payer_name TEXT,
        payment_date DATE,
        next_payment_date DATE,
        selected_services TEXT,
        amount REAL,
        month TEXT,
        monthly_plan TEXT,
        member_id INTEGER,
        FOREIGN KEY (member_id) REFERENCES members(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS gym_services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service_name TEXT,
        service_price REAL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS member_services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        member_id INTEGER,
        service_id INTEGER,
        FOREIGN KEY (member_id) REFERENCES members(id),
        FOREIGN KEY (service_id) REFERENCES gym_services(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS staff (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        gender TEXT,
        role TEXT,
        address TEXT,
        phone_number TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS gym_equipment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        equipment_name TEXT,
        equipment_description TEXT,
        purchase_date DATE,
        condition TEXT,
        quantity INTEGER,
        staff_id INTEGER,
        FOREIGN KEY (staff_id) REFERENCES staff(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS gym (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        address TEXT,
        email TEXT,
        phone_number TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        expense_name TEXT,
        expense_amount REAL,
        responsible_person TEXT,
        description TEXT
      )
    `);
    console.log('Tables created (if not exist).');
  });
}

module.exports = createTables;
