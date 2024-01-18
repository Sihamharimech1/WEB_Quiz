const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Professor'
  },
  professionalId: {
    type: String,
    default: null,
    required: function () {
      return this.role === 'Professor';
    },
  }
}, { timestamps: true });

const Profs = mongoose.model('profs', UserSchema);
module.exports = Profs;
