import express from 'express';
import fs from 'fs';
import { requireAuth } from '@tjhive/common';
import { Video } from '../models/video';
import { VideoNotFoundError } from '../errors/video-not-found-error';

const router = express.Router();

router.get('/api/videos/get/logo/logoid/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  const video = await Video.findOne({ _id: id });
  if (!video) {
    throw new VideoNotFoundError();
  }
  const path = video.logo;
  fs.readFile(path, { encoding: 'base64' }, (err, image) => {
    const dataUrl = `data:image/png;base64,${image}`;
    return res.status(200).send(dataUrl);
  });
});

export { router as getLogoRouter };
