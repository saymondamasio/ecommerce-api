import { Injectable, NestMiddleware } from '@nestjs/common';
import { json, Response } from 'express';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  public use(req: Request, res: Response<any>, next: () => any): any {
    json({
      verify: (req: any, res, buffer) => {
        if (Buffer.isBuffer(buffer)) {
          const rawBody = Buffer.from(buffer);
          req.rawBody = rawBody;
        }
        return true;
      },
    })(req as any, res as any, next);
  }
}
