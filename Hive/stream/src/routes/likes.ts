import express, { Request, Response } from 'express';
import { Video } from '../models/video';
import { requireAuth } from '@tjhive/common';

const router = express.Router();

router.post(
  '/api/likes/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const video = await Video.findOne({ _id: req.params.id });
    if (!video) {
      return res.status(404).send({});
    }
    const { like, id } = req.body;
    console.log(like + ' ' + id);
    if (like) {
      video.likes.push(id);
    } else {
      video.likes = video.likes.filter((user) => user != id);
    }
    console.log(video.likes);
    await video.save();
    res.status(201).send({});
  }
);

export { router as likeVideoRouter };
