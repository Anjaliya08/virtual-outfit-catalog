const QuizQuestion = require("../models/Quiz");

// GET handler - quiz questions laane ke liye
exports.getQuizQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST handler - naya question add karne ke liye
exports.createQuizQuestion = async (req, res) => {
  try {
    const newQuestion = new QuizQuestion(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
