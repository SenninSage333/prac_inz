import express from 'express';
import { requireAuth } from '@tjhive/common';
import { Comment, CommentAttrs } from '../models/comment';

const router = express.Router();

router.post('/api/comments/add', requireAuth, async (req, res) => {
  const comment = req.body as CommentAttrs;
  const commentToSave = Comment.build(comment);
  await commentToSave.save();
  res.status(201).send({});
});

export { router as addVideoCommentRouter };
