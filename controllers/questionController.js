const { GoogleGenerativeAI } = require("@google/generative-ai");
const Question = require("../models/Question");

exports.askQuestion = async (req, res) => {
  const { question } = req.body;
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(question);
    const answerText = result.response?.candidates[0]?.content.parts[0]?.text || "No answer generated";
    const newQuestion = await Question.create({ userId: req.user.id, question, answer: answerText });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "AI service error", error });
  }
};
exports.getQuestionById = async (req, res) => {
  const question = await Question.findById(req.params.questionId);
  if (!question) return res.status(404).json({ message: "Question not found" });
  res.json(question);
};

exports.getUserQuestions = async (req, res) => {
  const questions = await Question.find({ userId: req.params.userId });
  res.json(questions);
};
