const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initializeDb() {
  await db.read();
  db.data = db.data || { usuarios: [] }; // Set default data if db.json is empty
  await db.write();
}

initializeDb();

module.exports = db;