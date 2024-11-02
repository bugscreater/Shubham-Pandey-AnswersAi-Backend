const express = require('express');
const { askQuestion, getQuestionById, getUserQuestions } = require('../controllers/questionController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, askQuestion);
router.get('/:questionId', auth, getQuestionById);
router.get('/users/:userId/questions', auth, getUserQuestions);

module.exports = router;
