import express, { Request, Response } from 'express';
import { Video } from '../models/video';
import { requireAuth } from '@tjhive/common';

const router = express.Router();

router.get('/api/videos', requireAuth, async (req: Request, res: Response) => {
  const allVideos = await Video.find({});
  res.status(200).send({ allVideos });
});

export { router as getVideosRouter };
