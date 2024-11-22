import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SingleProjectPayloadDto } from './dto/common';
import { UserTeamProjectService } from './userTeamProject.service';
import { Operation } from 'src/common/utils/opration';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateOrEditUserProjectPayloadDto } from './dto/createOrEditUserProject.dto';
import { OperationName } from 'src/common/decorators/operation.decorator';
import { TeamOperations } from 'src/common/constants/operations';
import { TeamAccessGuard } from 'src/common/Guards/TeamAccessGuard';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class UserTeamProjectController {
  constructor(
    private readonly userTeamProjectService: UserTeamProjectService,
  ) {}

  @Get(':teamId/projects/:projectId')
  @OperationName(TeamOperations.READ_PROJECT_DETAILS)
  @UseGuards(TeamAccessGuard)
  async getUserTeamProject(
    @UserIdFromToken() userId: SingleProjectPayloadDto['userId'],
    @Param('teamId') teamId: SingleProjectPayloadDto['teamId'],
    @Param('projectId') projectId: SingleProjectPayloadDto['projectId'],
  ) {
    return Operation.processor(
      await this.userTeamProjectService.getUserTeamProject({
        projectId,
        userId,
        teamId,
      }),
    );
  }

  @Get(':teamId/projects')
  @OperationName(TeamOperations.READ_PROJECT)
  @UseGuards(TeamAccessGuard)
  async getUserTeamProjects(
    @UserIdFromToken() userId: SingleProjectPayloadDto['userId'],
    @Param('teamId') _teamId: SingleProjectPayloadDto['teamId'],
  ) {
    return Operation.processor(
      await this.userTeamProjectService.getUserTeamProjects(userId),
    );
  }

  @Post(':teamId/projects')
  @OperationName(TeamOperations.CREATE_PROJECT)
  @UseGuards(TeamAccessGuard)
  async createUserTeamProject(
    @UserIdFromToken() userId: SingleProjectPayloadDto['userId'],
    @Param('teamId') teamId: SingleProjectPayloadDto['teamId'],
    @Body() createUserBody: CreateOrEditUserProjectPayloadDto,
  ) {
    return Operation.processor(
      await this.userTeamProjectService.createUserTeamProject(
        { teamId, userId },
        createUserBody,
      ),
    );
  }

  @Put(':teamId/projects/:projectId')
  @OperationName(TeamOperations.EDIT_PROJECT)
  @UseGuards(TeamAccessGuard)
  async editUserTeamProject(
    @UserIdFromToken() userId: SingleProjectPayloadDto['userId'],
    @Param('projectId') projectId: SingleProjectPayloadDto['projectId'],
    @Param('teamId') teamId: SingleProjectPayloadDto['teamId'],
    @Body() editUserBody: CreateOrEditUserProjectPayloadDto,
  ) {
    return Operation.processor(
      await this.userTeamProjectService.editUserTeamProject(
        { projectId, userId, teamId },
        editUserBody,
      ),
    );
  }

  @Delete(':teamId/projects/:projectId')
  @OperationName(TeamOperations.DELETE_PROJECT)
  @UseGuards(TeamAccessGuard)
  async deleteUserTeamProject(
    @UserIdFromToken() userId: SingleProjectPayloadDto['userId'],
    @Param('teamId') teamId: SingleProjectPayloadDto['teamId'],
    @Param('projectId') projectId: SingleProjectPayloadDto['projectId'],
  ) {
    return Operation.processor(
      await this.userTeamProjectService.deleteUserTeamProject({
        projectId,
        userId,
        teamId,
      }),
    );
  }
}
