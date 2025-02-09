// models/User.js
import db from './db.js';

async function findUserByUsername(username) {
  await db.read();
  return db.data.users.find(user => user.username === username);
}

async function findUserById(id) {
  await db.read();
  return db.data.users.find(user => user.id === id);
}

export { findUserByUsername, findUserById };
