const express = require('express');
const UserController = require('../controllers/UserController.js');

const router = express.Router();
router.post('/register', UserController.Add_User);
router.post('/login', UserController.Login_User);
router.get('/logout', UserController.LogOut);
router.post('/addQuiz', UserController.AddQuiz);
router.get('/quizzes', UserController.getQuizzesByFilliere);
router.post('/registerProf', UserController.Add_Prof);
router.post('/loginProf', UserController.Login_Prof);
module.exports = router;