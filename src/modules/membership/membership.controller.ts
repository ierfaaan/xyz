import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';

import { MembershipService } from './membership.service';
import { OperationName } from 'src/common/decorators/operation.decorator';
import { TeamOperations } from 'src/common/constants/operations';
import { TeamAccessGuard } from 'src/common/Guards/TeamAccessGuard';
import { Operation } from 'src/common/utils/opration';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RequestDto } from './dto/request';

@Controller('membership/spaces/:spaceId')
@UseGuards(JwtAuthGuard)
export class MembershipController {
  constructor(private readonly memebershipService: MembershipService) {}

  @Get('members')
  @OperationName(TeamOperations.READ_TEAM_MEMBER)
  @UseGuards(TeamAccessGuard)
  async getSpaceMemebers(
    @UserIdFromToken() userId: RequestDto['Payload']['userId'],
    @Param('spaceId') spaceId: RequestDto['Payload']['spaceId'],
  ) {
    return Operation.processor(
      await this.memebershipService.getSpaceMemebers({ spaceId, userId }),
    );
  }

  @Post('members')
  @OperationName(TeamOperations.ADD_TEAM_MEMBER)
  @UseGuards(TeamAccessGuard)
  async addMemberToSpace(
    @UserIdFromToken() userId: RequestDto['Payload']['userId'],
    @Param('spaceId') spaceId: RequestDto['Payload']['spaceId'],
    @Body() addTeamMemberBody: RequestDto['AddMembershipBody'],
  ) {
    return Operation.processor(
      await this.memebershipService.addMemberToSpace(addTeamMemberBody, {
        spaceId,
        userId,
      }),
    );
  }
}
