/* eslint-disable import/extensions */
import { readFile } from 'fs/promises';

import dotenv from 'dotenv';

import connectDB from './db/connect.js';

import Job from './models/Job.js';
// Loads environment variables from .env file
dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL); // Connect to MongoDB
    await Job.deleteMany(); // Delete all jobs to start from scratch
    const jsonProducts = JSON.parse(await readFile(new URL('./mock-data.json', import.meta.url))); // Read the JSON file
    await Job.create(jsonProducts); // Create the jobs
    console.log('Successfully populated the database');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();

dotenv.config();
