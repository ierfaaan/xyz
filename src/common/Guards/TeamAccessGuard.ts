import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../services';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TeamAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const requiredRole = this.reflector.get<string>(
      'operationName',
      context.getHandler(),
    );
    if (!requiredRole) {
      return true;
    }
    // const userAccess = await this.prismaService.teamMembership.findFirst({
    //   where: { userId: Number(userId) },
    // });
    // if (!userAccess || !userAccess.accessList.includes(requiredRole)) {
    //   throw new ForbiddenExceptionApp({
    //     message: 'User does not have the required role!',
    //   });
    // }

    return true;
  }
}
