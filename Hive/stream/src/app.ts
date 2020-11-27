import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@tjhive/common';
import { getVideosRouter } from './routes/get-videos';
import { getVideoRouter } from './routes/get-video';
import { streamVideoRouter } from './routes/stream-video';
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

app.use(getVideosRouter);
app.use(getVideoRouter);
app.use(streamVideoRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
