const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

// CHECKING TO MAKE SURE THE ENVIRONMENT IS IN TESTING MODE, NOT DEVELOPMENT
test("should set db environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

describe('auth-router testing', () => {
  describe('POST register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    test(`RETURNS MESSAGE WITH USER'S INFO`, () => {
      return request(server)
      .post('/api/auth/register')
      .send({
        username: 'username',
        password: 'password'
      })
      .then(response => {
        expect(response.status).toEqual(201)
        console.log('REGISTER MESSAGE', response.body.user)
        expect(response.body.user.username).toBe('username')
      })
    })

    test('receive 400 for not having username', () => {
      return request(server)
      .post('/api/auth/register')
      .send({
        username: '',
        password: 'password'
      })
      .then(response => {
        expect(response.status).toEqual(400)
      })
    })
  })

  describe('POST login', () => {
    test('return error message when wrong username and password are given', () => {
      return request(server)
      .post('/api/auth/login')
      .send({
        username: 'wrongusername',
        password: 'wrongpassword'
      })
      .then(response => {
        expect(response.status).toEqual(401)
        console.log('LOGIN ERROR MESSAGE', response.body)
        expect(response.body).toEqual({ message: 'Invalid credentials. Try again later.' })
      })
    })

    test('receive 400 for not having username', () => {
      return request(server)
      .post('/api/auth/login')
      .send({
        username: '',
        password: 'password'
      })
      .then(response => {
        expect(response.status).toEqual(400)
      })
    })
  })
});

describe('jokes-router testing', () => {
  describe('GET jokes', () => {
    test('receive 401 for not providing proper auth', () => {
      return request(server)
      .get('/api/jokes')
      .set('Authorization', 'token')
      .then((response) => {
        expect(response.status).toEqual(401)
      })
    })

    test('receive 400 for not providing any credentials', () => {
      return request(server)
      .get('/api/jokes')
      .then((response) => {
        expect(response.status).toEqual(400)
      })
    })
  })
})