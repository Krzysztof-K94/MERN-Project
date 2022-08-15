import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';
import connectDB from './db/connect.js';
import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
import authienticateUser from './middleware/auth.js';

const app = express();
dotenv.config();

if(process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({msg: "WWelcome"});
})


app.get('/api/v1', (req, res) => {
  res.json({msg: "Welcome"})
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs',authienticateUser, jobsRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

