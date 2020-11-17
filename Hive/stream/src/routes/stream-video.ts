import { requireAuth } from '@tjhive/common';
import express from 'express';
import fs from 'fs';
import { Video } from '../models/video';
import { VideoNotFoundError } from '../errors/video-not-found-error';

const router = express.Router();

router.get('/api/videos/:id/stream', requireAuth, async (req, res) => {
  const id = req.params.id;
  const video = await Video.findOne({ _id: id });
  if (!video) {
    throw new VideoNotFoundError();
  }
  const path = video.path;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

export { router as streamVideoRouter };
