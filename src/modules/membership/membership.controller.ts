import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';
import {
  CommonAddOrEditMembershipPayloadDto,
  CommonMembershipPayloadDto,
} from './dto/common';
import { MembershipService } from './membership.service';
import { OperationName } from 'src/common/decorators/operation.decorator';
import {
  ProjectOperations,
  TeamOperations,
} from 'src/common/constants/operations';
import { TeamAccessGuard } from 'src/common/Guards/TeamAccessGuard';
import { Operation } from 'src/common/utils/opration';
import { ProjectAccessGuard } from 'src/common/Guards/ProjectAccessGuard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('membership/teams/:teamId')
@UseGuards(JwtAuthGuard)
export class MembershipController {
  constructor(private readonly memebershipService: MembershipService) {}

  @Get('members')
  @OperationName(TeamOperations.READ_TEAM_MEMBER)
  @UseGuards(TeamAccessGuard)
  async getTeamMember(
    @UserIdFromToken() userId: CommonMembershipPayloadDto['userId'],
    @Param('teamId') teamId: CommonMembershipPayloadDto['teamId'],
  ) {
    return Operation.processor(
      await this.memebershipService.getTeamMember({ teamId, userId }),
    );
  }

  @Post('members/:memberId')
  @OperationName(TeamOperations.ADD_TEAM_MEMBER)
  @UseGuards(TeamAccessGuard)
  async addTeamMember(
    @UserIdFromToken() userId: CommonMembershipPayloadDto['userId'],
    @Body() addTeamMemberBody: CommonAddOrEditMembershipPayloadDto<true>,
    @Param('teamId') teamId: CommonMembershipPayloadDto['teamId'],
    @Param('memberId') memberId: CommonMembershipPayloadDto['teamId'],
  ) {
    return Operation.processor(
      await this.memebershipService.addTeamMember(addTeamMemberBody, {
        memberId,
        teamId,
        userId,
      }),
    );
  }

  @Delete('members/:memberId')
  @OperationName(TeamOperations.DELETE_TEAM_MEMBER)
  @UseGuards(TeamAccessGuard)
  async deleteTeamMember(
    @UserIdFromToken() userId: CommonMembershipPayloadDto['userId'],
    @Param('teamId') teamId: CommonMembershipPayloadDto['teamId'],
    @Param('memberId') memberId: CommonMembershipPayloadDto['teamId'],
  ) {
    return Operation.processor(
      await this.memebershipService.deleteTeamMember({
        memberId,
        teamId,
        userId,
      }),
    );
  }

  @Get('projects/:projectId/members')
  @OperationName(ProjectOperations.READ_PROJECT_MEMBER)
  @UseGuards(ProjectAccessGuard)
  async getProjectMembership(
    @UserIdFromToken() userId: CommonMembershipPayloadDto['userId'],
    @Param('teamId') teamId: CommonMembershipPayloadDto['teamId'],
    @Param('projectId') projectId: CommonMembershipPayloadDto['projectId'],
  ) {
    return Operation.processor(
      await this.memebershipService.getProjectMembership({
        userId,
        projectId,
        teamId,
      }),
    );
  }

  @Post('projects/:projectId/members/:memberId')
  @OperationName(ProjectOperations.ADD_PROJECT_MEMBER)
  @UseGuards(ProjectAccessGuard)
  async addProjectMember(
    @UserIdFromToken() userId: CommonMembershipPayloadDto['userId'],
    @Body() addProjectMemberBody: CommonAddOrEditMembershipPayloadDto<false>,
    @Param('teamId') teamId: CommonMembershipPayloadDto['teamId'],
    @Param('projectId') projectId: CommonMembershipPayloadDto['projectId'],
    @Param('memberId') memberId: CommonMembershipPayloadDto['memberId'],
  ) {
    return Operation.processor(
      await this.memebershipService.addProjectMember(addProjectMemberBody, {
        memberId,
        userId,
        projectId,
        teamId,
      }),
    );
  }

  @Delete('projects/:projectId/members/:memberId')
  @OperationName(ProjectOperations.DELETE_PROJECT_MEMBER)
  @UseGuards(ProjectAccessGuard)
  async deleteProjectMember(
    @UserIdFromToken() userId: CommonMembershipPayloadDto['userId'],
    @Param('teamId') teamId: CommonMembershipPayloadDto['teamId'],
    @Param('projectId') projectId: CommonMembershipPayloadDto['projectId'],
    @Param('memberId') memberId: CommonMembershipPayloadDto['memberId'],
  ) {
    return Operation.processor(
      await this.memebershipService.deleteProjectMember({
        memberId,
        userId,
        projectId,
        teamId,
      }),
    );
  }
}
