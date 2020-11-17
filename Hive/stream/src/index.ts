import mongoose from 'mongoose';
import { app } from './app';
import { Video } from './models/video';

const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  const video = Video.build({
    title: 'Leave her Johnny',
    description: "Shant from Assassin's Creed IV Blackflag",
    path: './src/videos/leave_her_johnny.mp4',
  });
  await video.save();

  app.listen(3002, () => {
    console.log('Auth is listening on port 3002!');
  });
};

startUp();
