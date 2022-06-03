/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Creating the structure of our user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  lastname: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'lastname',
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'location',
  },
});

UserSchema.pre('save', async () => {
  // console.log(this.password);

  // Hashing the password
  // const salt = await bcrypt.genSalt(10);
  // this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return (
    jwt.sign(
      { userId: this._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME },
    ));
};

// If passwords match we can send back the token
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
// Exporting the User collection
export default mongoose.model('User', UserSchema);
