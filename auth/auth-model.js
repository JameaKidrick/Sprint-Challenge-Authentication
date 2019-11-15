const db = require('../database/dbConfig');

module.exports = {
  find,
  findBy,
  add
}

function find() {
  return db('users')
}

function findBy(info) {
  return db('users')
    .where(info)
    .first()
}

function add(newUser) {
  return db('users')
    .insert(newUser)
}