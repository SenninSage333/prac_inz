import express, { Request, Response } from 'express';
import { Video } from '../models/video';
import { requireAuth } from '@tjhive/common';

const router = express.Router();

router.post(
  '/api/likes/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const video = (await Video.find({ _id: req.params.id }))[0];
    const { like, id } = req.body;
    console.log(like + ' ' + id);
    if (like) {
      video.likes.push(id);
    } else {
      video.likes = video.likes.filter((user) => user != id);
    }
    console.log(video.likes);
    res.status(201).send({});
  }
);

export { router as likeVideoRouter };
