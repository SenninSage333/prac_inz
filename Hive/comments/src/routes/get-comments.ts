import express from 'express';
import { requireAuth } from '@tjhive/common';
import { Comment } from '../models/comment';

const router = express.Router();

router.get('/api/comments/:id', requireAuth, async (req, res) => {
  const comments = await Comment.find({});
  res.status(200).send(comments);
});

export { router as getVideoCommentsRouter };
