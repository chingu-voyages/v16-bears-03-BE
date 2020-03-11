const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    default: null,
  },
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },
  ],
});

// Serialize the user in the router so the password isn't passed through
UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
  };
};

// This will hash the password
UserSchema.statics.hashPassword = password => {
  return bcrypt.hash(password, 10);
};

// This will compare the login password against the hashed password stored in the db
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = User = mongoose.model('user', UserSchema);
