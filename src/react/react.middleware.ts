import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ReactMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    type ReatType = 'like' | 'love' | 'dislike'
    const { type }: { type: ReatType } = req.body
    if (type == "like" || type == "love" || type == "dislike") return next();
    res.status(400).send("Invalid react type")
  }
}
