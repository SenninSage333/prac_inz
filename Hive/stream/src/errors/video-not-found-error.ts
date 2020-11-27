import { CustomError } from '@tjhive/common';

class VideoNotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super('Video not found');
    Object.setPrototypeOf(this, VideoNotFoundError.prototype);
  }
  serializeError() {
    return [{ message: 'Cannot find video with given id!' }];
  }
}

export { VideoNotFoundError };
