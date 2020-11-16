import mongoose from 'mongoose';
import { app } from './app';

const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://stream-mongo-srv:30002/videos', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  app.listen(3002, () => {
    console.log('Auth is listening on port 3002!');
  });
};

startUp();
