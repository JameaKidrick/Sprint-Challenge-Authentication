const request = require('supertest');
const server = require('../api/server');

// CHECKING TO MAKE SURE THE ENVIRONMENT IS IN TESTING MODE, NOT DEVELOPMENT
test("should set db environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

describe('auth-router testing', () => {
  describe('POST register', () => {

  })

  describe('GET login', () => {
    
  })
})

describe('jokes-router testing', () => {
  test('GET jokes', async () => {
    const response = await request(server).get('/api/jokes')
    .auth('username', 'password')
    .set('Accept', 'application/json')
    .expect(200);
    expect(response.status).toEqual(200)
  })
})