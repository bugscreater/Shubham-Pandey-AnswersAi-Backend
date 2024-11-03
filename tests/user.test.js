const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'newuser', password: 'Password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.username).toBe('newuser');
  });

  it('should retrieve a user profile by ID', async () => {
    const user = await User.create({ username: 'profileuser', password: 'Password123' });
    const res = await request(app).get(`/api/users/${user._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('username', 'profileuser');
  });
});
