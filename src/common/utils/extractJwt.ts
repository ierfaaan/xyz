import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

export function getUserIdFromToken(req: Request): string {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return null;
  }
  const decoded: any = jwt.verify(token, process.env.JWT_KEY);
  return decoded.id;
}
