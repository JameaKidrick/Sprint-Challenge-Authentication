const db = require('../database/dbConfig');

module.exports = {
  find,
  findBy,
  add
}

function find() {
  return db('users')
}

function findBy(username) {
  return db('users')
    .where({ 'users.username':username })
    .first()
}

function add(newUser) {
  return db('users')
    .insert(newUser)
}