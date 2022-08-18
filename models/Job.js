import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';

const JobSchema = new mongoose.Schema({
  position: {
    type: String,
    required: ['Please provide position'],
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  company: {
    type: String,
    required: [true,'Please provide compoany name'],
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  jobLocation: {
    type: String,
    default: 'my city',
    required: true,
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'remote', 'internship'],
    default: 'full-time'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Pleave provide user'],
  }
},  {timestamps: true}
);

const Job = mongoose.model('Job', JobSchema);
export default Job;