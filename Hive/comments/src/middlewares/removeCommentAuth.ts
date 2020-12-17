import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '@tjhive/common';
import { Comment } from '../models/comment';

export const removeCommentAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const comment = await Comment.findOne({ _id: id });
  if (
    req.currentUser &&
    comment &&
    req.currentUser.email != comment.useremail
  ) {
    throw new NotAuthorizedError();
  }

  next();
};
