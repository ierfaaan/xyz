import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { getUserIdFromToken } from '../utils/extractJwt';
import { UnauthorizedExceptionApp } from '../exceptions/UnauthorizedException';
import { TUserIdFromToken } from '../types/userId';

export const UserIdFromToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TUserIdFromToken => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const userId = getUserIdFromToken(request);
    if (!userId) {
      throw new UnauthorizedExceptionApp({
        message: 'Invalid token',
      });
    }
    return userId;
  },
);
