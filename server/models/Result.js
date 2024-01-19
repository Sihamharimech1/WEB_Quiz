const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Quiz' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    score: { type: Number, required: true },
    filliere: { type: String, required: true },
    nomuser: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Result = mongoose.model('results', ResultSchema);
module.exports = Result;
