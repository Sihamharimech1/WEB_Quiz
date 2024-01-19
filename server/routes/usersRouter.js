const express = require('express');
const UserController = require('../controllers/UserController.js');

const router = express.Router();
router.post('/register', UserController.Add_User);
router.post('/login', UserController.Login_User);
router.get('/logout', UserController.LogOut);
router.post('/addQuiz', UserController.AddQuiz);
router.post('/registerProf', UserController.Add_Prof);
router.post('/loginProf', UserController.Login_Prof);
router.get('/quizzes', UserController.getQuizzesByFilliere);
router.get('/quizzes/:filliere', UserController.GetQuizByFiliere);
router.post('/submit-answers', UserController.submitAnswers);
module.exports = router;