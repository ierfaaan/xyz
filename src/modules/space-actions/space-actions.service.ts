import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { Operation } from 'src/common/utils/opration';

@Injectable()
export class SpaceActionsService {
  constructor(private prismaService: PrismaService) {}
  async getSpaceActions() {
    const teamActions = await this.prismaService.spaceActions.findMany({
      select: {
        id: true,
        action: true,
      },
    });

    return Operation.success({
      result: teamActions,
    });
  }
}
