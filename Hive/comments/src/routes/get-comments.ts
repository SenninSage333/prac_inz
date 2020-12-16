import express from 'express';
import { requireAuth } from '@tjhive/common';
import { Comment } from '../models/comment';

const router = express.Router();

router.get('/api/comments/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  const comments = await Comment.find({ videoid: id });
  res.status(200).send(comments);
});

export { router as getVideoCommentsRouter };
