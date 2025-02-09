// models/db.js
const path = require('path');
const { Low, JSONFile } = require('lowdb');

const adapter = new JSONFile(path.join(__dirname, '../db.json'));
const db = new Low(adapter);

async function initDB() {
  await db.read();
  db.data ||= { tickets: [], users: [] };
  // Seed default admin user if none exists
  if (db.data.users.length === 0) {
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.data.users.push({ id: '1', username: 'admin', password: hashedPassword, role: 'admin' });
  }
  await db.write();
}

initDB();

module.exports = db;
