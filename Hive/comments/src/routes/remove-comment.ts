import { requireAuth } from '@tjhive/common';
import express from 'express';
import { removeCommentAuth } from '../middlewares/removeCommentAuth';
import { Comment } from '../models/comment';

const router = express.Router();

router.post(
  '/api/comments/remove/:id',
  requireAuth,
  removeCommentAuth,
  async (req, res) => {
    const id = req.params.id;
    await Comment.deleteOne({ _id: id });
    res.status(200).send({});
  }
);

export { router as removeCommentRouter };
