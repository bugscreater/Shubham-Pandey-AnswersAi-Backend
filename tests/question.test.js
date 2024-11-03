const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Question = require('../models/Question');

describe('Question Endpoints', () => {
  let user;

  beforeAll(async () => {
    user = await User.create({ username: 'questionuser', password: 'Password123' });
  });

  it('should create a question and return an AI-generated answer', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({ userId: user._id, question: 'What is AI?' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('question');
    expect(res.body).toHaveProperty('answer');
  });

  it('should retrieve a question by ID', async () => {
    const question = await Question.create({
      userId: user._id,
      question: 'What is Node.js?',
      answer: 'Node.js is a runtime environment.',
    });

    const res = await request(app).get(`/api/questions/${question._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.question).toBe('What is Node.js?');
  });
});
