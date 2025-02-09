// models/User.js
const db = require('./db');

async function findUserByUsername(username) {
  await db.read();
  return db.data.users.find(user => user.username === username);
}

async function findUserById(id) {
  await db.read();
  return db.data.users.find(user => user.id === id);
}

module.exports = {
  findUserByUsername,
  findUserById
};
