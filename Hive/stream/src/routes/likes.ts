import express, { Request, Response } from 'express';
import { Video } from '../models/video';
import { requireAuth } from '@tjhive/common';
import { likeAuth } from '../middlewares/like-auth';

const router = express.Router();

router.post(
  '/api/likes/:id',
  requireAuth,
  likeAuth,
  async (req: Request, res: Response) => {
    const video = await Video.findOne({ _id: req.params.id });
    if (!video) {
      return res.status(404).send({});
    }
    const { like, email } = req.body;
    console.log(like + ' ' + email);
    if (like) {
      video.likes.push(email);
    } else {
      video.likes = video.likes.filter((user) => user != email);
    }
    console.log(video.likes);
    await video.save();
    res.status(201).send({});
  }
);

export { router as likeVideoRouter };
