/* eslint-disable import/extensions */
// import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
// since we're on the server the path is a little different
import authenticateUser from './middleware/auth.js';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

dotenv.config();

// Using CORS package
// app.use(cors())

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

// Making the JSON data available in the controller
app.use(express.json());

// Security packages
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Set up a dummy route
app.get('/', (req, res) => {
  // throw new Error('Error!!!')
  res.json({ msg: 'Welcome!' });
});
app.get('/api/v1', (req, res) => {
  // throw new Error('Error!!!')
  res.json({ msg: 'API!' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/', 'index.html')); // relative path for deployment
});
// Using the middleware to look for all Http methods and Routes.
// If none are found
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// async await to connect to MongoDB
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
