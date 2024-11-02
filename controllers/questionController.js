const axios = require('axios');
const Question = require('../models/Question');

exports.askQuestion = async (req, res) => {
  const { question } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: question,
      max_tokens: 50,
    }, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } });

    const answer = response.data.choices[0].text.trim();
    const newQuestion = await Question.create({ userId: req.user.id, question, answer });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'AI service error', error });
  }
};

exports.getQuestionById = async (req, res) => {
  const question = await Question.findById(req.params.questionId);
  if (!question) return res.status(404).json({ message: 'Question not found' });
  res.json(question);
};

exports.getUserQuestions = async (req, res) => {
  const questions = await Question.find({ userId: req.params.userId });
  res.json(questions);
};
