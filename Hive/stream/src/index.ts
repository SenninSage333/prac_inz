import mongoose from 'mongoose';
import { app } from './app';
import { Video, VideoAttrs } from './models/video';
import fs from 'fs';

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
  const videos = await Video.find({});
  if (videos.length == 0) {
    console.log('No videos in database');
    const videosData = JSON.parse(
      fs.readFileSync('./src/videos_data.json').toString('utf-8')
    ) as VideoAttrs[];
    videosData.map(async (video) => {
      const videoToSave = Video.build(video);
      await videoToSave.save();
    });
  }

  app.listen(3002, () => {
    console.log('Auth is listening on port 3002!');
  });
};

startUp();
