const express = require('express');
const router = express.Router();
const { getQuizQuestions, createQuizQuestion } = require('../controllers/quizController');

router.get('/quiz-questions', getQuizQuestions);
router.post('/quiz-questions', createQuizQuestion);

module.exports = router;
