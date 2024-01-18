const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    userId: { type: String },
    title: { type: String, required: true },
    questions: [{
      questionText: { type: String, required: true },
      options: [{
        optionText: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
      }]
    }],
    filiere: { type: String, required: true }
  }, { timestamps: true });
  

module.exports = mongoose.model('Quiz', QuizSchema);
