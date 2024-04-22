import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Model } from './image.dto';

@Injectable()
export class ImageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { model } = req.query
    function isValidModel(modelString: string): modelString is Model {
      return Object.values(Model).includes(modelString as Model);
    }    
    if (isValidModel(model as string)) return next();
    throw new HttpException({
      msg: "invalid model"
    }, HttpStatus.BAD_REQUEST)
  }
}
