import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, 'Please provide name'], 
    minlength: 3, 
    maxlength: 20, 
    trim: true
  },
  email: {
    type: String,
    required:[true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide email',
    },
    unique: true,
  },
  password: {
    type: String,
    required:[true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxlength: 20, 
    trim: true,
    default: 'lastName',
  },
  location: {
    type: String,
    maxlength: 20, 
    trim: true,
    default: 'myCity',
  },
});

UserSchema.pre('save', async function() {
  if(!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function(){
  return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparPassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);
export default User;