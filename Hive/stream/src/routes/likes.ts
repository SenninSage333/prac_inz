import express, { Request, Response } from 'express';
import { Video, VideoDoc } from '../models/video';
import { requireAuth } from '@tjhive/common';
import { likeAuth } from '../middlewares/like-auth';

const router = express.Router();

router.post(
  '/api/likes/:id',
  requireAuth,
  likeAuth,
  async (req: Request, res: Response) => {
    const video = (await Video.findOne({ _id: req.params.id })) as VideoDoc;
    if (!video) {
      return res.status(404).send({});
    }
    const { email } = req.body;
    var like = false;
    video.likes.map((user: string) => {
      if (user === email) {
        like = true;
      }
    });
    if (like) {
      video.likes = video.likes.filter((user: string) => user != email);
    } else {
      video.likes.push(email);
    }
    await video.save();
    res.status(201).send({});
  }
);

export { router as likeVideoRouter };
