import { NotAuthorizedError } from '@tjhive/common';
import { Request, Response, NextFunction } from 'express';

export const likeAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  if (req.currentUser && email && email != req.currentUser.email) {
    throw NotAuthorizedError;
  }
  next();
};
