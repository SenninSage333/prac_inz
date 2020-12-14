import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { getVideoCommentsRouter } from './routes/get-comments';
import { currentUser, errorHandler, NotFoundError } from '@tjhive/common';
import { addVideoCommentRouter } from './routes/add-comment';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(getVideoCommentsRouter);
app.use(addVideoCommentRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
