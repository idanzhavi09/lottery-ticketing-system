// models/db.js
import path from 'path';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';

// In ESM, __dirname isn’t available; so create it manually:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adapter = new JSONFile(path.join(__dirname, '../db.json'));
const db = new Low(adapter);

// Initialize the DB
await db.read();
db.data ||= { tickets: [], users: [] };

// Seed a default admin user if none exists
if (db.data.users.length === 0) {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  db.data.users.push({ id: '1', username: 'admin', password: hashedPassword, role: 'admin' });
}
await db.write();

export default db;
