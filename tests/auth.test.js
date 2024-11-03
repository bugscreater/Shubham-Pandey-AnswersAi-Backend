const request = require('supertest');
const app = require('../app'); 
const User = require('../models/User'); 
describe('Auth Endpoints', () => {
  let token;

  beforeAll(async () => {
    await User.create({ username: 'testuser', password: 'Password123' });
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  it('should log in a user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'Password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should log out a user', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logout successful');
  });
});
