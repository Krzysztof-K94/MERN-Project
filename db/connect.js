import mongoose from 'mongoose';

const connectDB = (url) => {
  return mongoose.connect(url, console.log('database is connected'));
};
export default connectDB;


