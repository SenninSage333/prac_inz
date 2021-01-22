import { NotAuthorizedError } from '@tjhive/common';
import { Request, Response, NextFunction } from 'express';

export const addCommentAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser?.email != req.body.useremail) {
    throw new NotAuthorizedError();
  }
  next();
};
