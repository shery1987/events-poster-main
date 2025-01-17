import jwt, { JwtPayload } from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  token?: string | JwtPayload;
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
 const SECRET_KEY: string = process.env.SECRET_KEY as string;
 
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error("Token required");
    }
    
    const decoded = jwt.verify(token, SECRET_KEY);
    
    (req as CustomRequest).token = decoded;
    
    next();
  } catch (error) {
    res.status(401).send("Error:" + error);
  }
};