const User = require('../models/User.js');
const Prof = require('../models/Prof.js');
const Quiz = require('../models/Quiz.js');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth.js');
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
    res.json({ success: true });
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
   module.exports = {
    Add_User, 
    Login_User,
    LogOut,
    AddQuiz,
    getQuizzesByFilliere,
    Add_Prof,
    Login_Prof
  }