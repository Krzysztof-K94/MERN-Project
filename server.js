import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';
import connectDB from './db/connect.js';
import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import path from 'path';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
import authienticateUser from './middleware/auth.js';

const app = express();
dotenv.config();

if(process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.static(path.resolve(__dirname, './client/build')))
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authienticateUser,jobsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './clien'));
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    })
  } catch (error) {
    console.log(error)
  }
}

start()

