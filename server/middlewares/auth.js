
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Prof = require('../models/Prof');
const VerifyUser = async (email, password) => {
  try {
    // Check if the user exists in the database
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      // User found, now check the password
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (passwordMatch) {
        return {
          success: true,
          user: {
            id: existingUser._id,
            email: existingUser.email,
            nom: existingUser.nom,
            role:existingUser.role,
            filliere:existingUser.filliere,
          },
        };
      } else {
        // Passwords do not match
        return { 
          result:
          {success: false, message: 'Incorrect password' }
        };
      }
    } else {
      // User not found
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    console.error('Error during authentication:', error.message);
    return { success: false, message: 'Error during authentication' };
  }
};
/////////////////////verify prof
const VerifyProf = async (professionalId, password) => {
  try {
    // Check if the user exists in the database
    const existingUser = await Prof.findOne({ professionalId: professionalId });

    if (existingUser) {
      // User found, now check the password
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
        
      if (passwordMatch) {
       
        return {
          success: true,
          user: {
            id: existingUser._id,
            email: existingUser.email,
            nom: existingUser.nom,
            role:existingUser.role,
         
          },
        };
      } else {
        // Passwords do not match
        return { 
          result:
          {success: false, message: 'Incorrect password' }
        };
      }
    } else {
      // User not found
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    console.error('Error during authentication:', error.message);
    return { success: false, message: 'Error during authentication' };
  }
};
module.exports = { VerifyUser,VerifyProf};
