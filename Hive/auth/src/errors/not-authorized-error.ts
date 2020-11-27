import { response } from 'express';
import { CustomError } from '../errors/custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeError() {
    return [{ message: 'Not authorized' }];
  }
}
