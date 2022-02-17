import { json } from 'body-parser';
import { Response } from 'express';
import RequestWithRawBody from '../interfaces/request-with-raw-body.interface';

function rawBodyMiddleware() {
  return json({
    verify: (
      request: RequestWithRawBody,
      response: Response,
      buffer: Buffer,
    ) => {
      if (
        request.url === '/payments/stripe/webhooks' &&
        Buffer.isBuffer(buffer)
      ) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}

export default rawBodyMiddleware;
