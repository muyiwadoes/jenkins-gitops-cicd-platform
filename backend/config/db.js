import mongoose from 'mongoose';
import { MONGODB_URI } from './utils.js';
export default function connectDB() {
  try {
    mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.error('Database connection failed.');
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once('open', () => {
    console.log('Database connected successfully.');
  });

  dbConnection.on('error', (err) => {
    console.error('Database connection failed.');
  });
  return;
}
