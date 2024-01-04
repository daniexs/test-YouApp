// auth.middleware.ts
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const decoded: any = jwt.verify(authHeader, process.env.SCREET_KEY);
        console.log(decoded)
        req['userId'] = decoded.sub;
        next();
      } catch (error) {
        res.status(HttpStatus.UNAUTHORIZED).json({message: "invalid token"})
      }
    }else {
      res.status(HttpStatus.UNAUTHORIZED).json({message: "Token is required"})
    }

  }
}
