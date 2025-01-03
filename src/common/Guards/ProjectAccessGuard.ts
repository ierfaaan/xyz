import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../services';

@Injectable()
export class ProjectAccessGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(_context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // const userId = request.userId;
    // const requiredRole = request.operationName;

    // const userAccess = await this.prismaService.projectMembership.findFirst({
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
