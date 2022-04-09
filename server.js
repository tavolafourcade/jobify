/* eslint-disable import/extensions */
// import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();
dotenv.config();

// Using CORS package
// app.use(cors())
// Making the JSON data available in the controller
app.use(express.json());
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
app.use('/api/v1/jobs', jobsRouter);

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
