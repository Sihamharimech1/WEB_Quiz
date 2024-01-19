const User = require('../models/User.js');
const Prof = require('../models/Prof.js');
const Quiz = require('../models/Quiz.js');
const Result = require('../models/Result.js');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth.js');
const mongoose = require('mongoose');
const { constants } = require('crypto');
const Add_User=async (req, res) => {
    if (req.body) {
        
        const newData = req.body;
       try {
         // Hash the password
         const hashedPassword = await bcrypt.hash(newData.password, 10);
         newData.password = hashedPassword;
   
         // Create a new user instance with the hashed password
         const newUser = new User(newData);
   
         // Save the user to the database
         await newUser.save();
   
         console.log('User registered successfully');
       
       } catch (error) {
         console.error('Error during registration:', error.message);
         res.send('error');
       }
    } else {
        res.send('sorry');
    }
   }
   //////////////////////////////ADD PROF
   const Add_Prof=async (req, res) => {
    if (req.body) {
        
        const newData = req.body;
       try {
         // Hash the password
         const hashedPassword = await bcrypt.hash(newData.password, 10);
         newData.password = hashedPassword;
   
         // Create a new Prof instance with the hashed password
         const newProf = new Prof(newData);
   
         // Save the Prof to the database
         await newProf.save();
   
         console.log('Prof registered successfully');
       
       } catch (error) {
         console.error('Error during registration:', error.message);
         res.send('error');
       }
    } else {
        res.send('sorry');
    }
   }
/////////////////////////////////////////// LoginUser
const Login_User= async (req, res) => {
  const { email, password } = req.body;

  const authenticationResult = await auth.VerifyUser(email, password);

  if (authenticationResult.success) {
    req.session.user = authenticationResult.user;
    console.log(req.session.user);
    res.json({ success: true, user: authenticationResult.user });
  } else {
    res.status(401).json({ success: false, message: authenticationResult.message });
  }
};
//////////////////////////LoginProf
const Login_Prof= async (req, res) => {
  const { professionalId, password } = req.body;

  const authenticationResult = await auth.VerifyProf(professionalId, password);

  if (authenticationResult.success) {
    req.session.user = authenticationResult.user;
   

    console.log(req.session.user);
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: authenticationResult.message });
  }
};
//////////////////////////////////////
const LogOut = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying the session:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    } else {
      res.status(200).json({ success: true, message: "Logout successful" });
    }
  });
};
const AddQuiz = async (req, res) => {
  const { title, questions, filliere } = req.body;
  const userId = req.session.id;

  // Validate user authentication
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const newQuiz = new Quiz({ title, questions,filiere: filliere});
    const savedQuiz = await newQuiz.save();
    res.json(savedQuiz);
    console.log(`User ${userId} added a new quiz: ${title}`);
  }catch (error) {
    console.error('Error adding quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const getQuizzesByFilliere = async (req, res) => {
  const { filliere } = req.query;

  try {
    // Fetch quizzes from the database based on the 'filliere' parameter
    const quizzes = await Quiz.find({ filiere: filliere });

    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//////////////////get quiz by filliere 

//////////////////get quiz by filliere 
const GetQuizByFiliere= async (req, res) => {
  const { filliere } = req.params;

  try {
    const qcms = await Quiz.find({ filiere:filliere });
    res.json(qcms);
  } catch (error) {
    console.error('Error fetching QCMs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
////////////////////////////////////////////
/*const submitAnswers = async (req, res) => {
  const { userId, answers } = req.body;

  try {
    // Fetch the user based on the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch quizzes based on user's filiere
    const quizzes = await Quiz.find({ filiere: user.filiere });

    let score = 0;
    quizzes.forEach((quiz) => {
      quiz.questions.forEach(question => {
        // Get the user's answer for this question
        const userAnswer = answers[question._id];
        if (userAnswer) {
          // Find the correct option for this question
          const correctOption = question.options.find(option => option.isCorrect);
          // Compare user's answer with the correct answer
          if (correctOption && userAnswer === correctOption.optionText) {
            score += 1;
          }
        }
      });
    });

    res.json({ score });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
*/
const SubmitQuiz = async (req, res) => {
  try {
    const { QId, QUser, Qtitle, Qscore, filliere } = req.body;

    // Validate the data
    if (!QId || !QUser || !Qtitle || Qscore === undefined || !filliere) {
      return res.status(400).send('Missing required quiz information');
    }

    // Create and save the quiz submission
    const submission = new Result({
      quizId: QId,
      userId: QUser,
      title: Qtitle,
      score: Qscore,
      filliere: filliere
    });

    await submission.save();

    res.status(201).json({ message: 'Quiz submitted successfully', submission });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error: error.message });
  }
};

const getQuizResults = async (req, res) => {
  try {
    const { filliere } = req.params;

       // Fetch results filtered by the specified filliere
       const results = await Result.find({ filliere })
                                   .populate('quizId', 'title')
                                   .populate('userId', 'name');

       // Transform the data as needed
       const transformedResults = results.map(result => ({
           filliere: result.filliere,
           quizTitle: result.quizId.title, // Assuming 'title' field in the 'Quiz' model
           user: result.userId.name, // Assuming 'name' field in the 'User' model
           score: result.score,
           submittedAt: result.submittedAt
       }));

      res.json(transformedResults);
  } catch (error) {
      console.error('Error fetching quiz results:', error);
      res.status(500).json({ message: 'Error fetching quiz results' });
  }
};

   module.exports = {
    Add_User, 
    Login_User,
    LogOut,
    AddQuiz,
    Add_Prof,
    Login_Prof,
    GetQuizByFiliere,
    getQuizzesByFilliere,
    SubmitQuiz,
    getQuizResults
  }


