import { requireAuth } from '@tjhive/common';
import express, { Request, Response } from 'express';
import { Video } from '../models/video';
import { VideoNotFoundError } from '../errors/video-not-found-error';

const router = express.Router();

router.get(
  '/api/videos/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const video = await Video.findOne({ _id: id });
    if (!video) {
      throw new VideoNotFoundError();
    }
    res.status(200).send(video);
  }
);

export { router as getVideoRouter };
