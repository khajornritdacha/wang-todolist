// Set up mongoose connection
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

import mongoose from 'mongoose';

const dbURL = process.env.DB_URL || '';
mongoose.set('strictQuery', true);
mongoose.connect(dbURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log('Connected To database');
