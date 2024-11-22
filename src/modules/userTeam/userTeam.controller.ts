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
import { SingleTeamPayloadDto } from './dto/common';
import { UserTeamService } from './userTeam.service';
import { Operation } from 'src/common/utils/opration';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateOrEditUserTeamPayloadDto } from './dto/createOrEditUserTeam.dto';
import { OperationName } from 'src/common/decorators/operation.decorator';
import { TeamOperations } from 'src/common/constants/operations';
import { TeamAccessGuard } from 'src/common/Guards/TeamAccessGuard';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class UserTeamController {
  constructor(private readonly userTeamService: UserTeamService) {}
  @Get(':teamId')
  async getUserTeam(
    @UserIdFromToken() userId: SingleTeamPayloadDto['userId'],
    @Param('teamId') teamId: SingleTeamPayloadDto['teamId'],
  ) {
    return Operation.processor(
      await this.userTeamService.getUserTeam({
        teamId,
        userId,
      }),
    );
  }

  @Get()
  async getUserTeams(
    @UserIdFromToken() userId: SingleTeamPayloadDto['userId'],
  ) {
    return Operation.processor(await this.userTeamService.getUserTeams(userId));
  }

  @Post()
  async createUserTeam(
    @UserIdFromToken() userId: SingleTeamPayloadDto['userId'],
    @Body() createUserBody: CreateOrEditUserTeamPayloadDto,
  ) {
    return Operation.processor(
      await this.userTeamService.createUserTeam(userId, createUserBody),
    );
  }

  @Put(':teamId')
  @OperationName(TeamOperations.EDIT_TEAM)
  @UseGuards(TeamAccessGuard)
  async editUserTeam(
    @UserIdFromToken() userId: SingleTeamPayloadDto['userId'],
    @Param('teamId') teamId: SingleTeamPayloadDto['teamId'],
    @Body() editUserBody: CreateOrEditUserTeamPayloadDto,
  ) {
    return Operation.processor(
      await this.userTeamService.editUserTeam({ teamId, userId }, editUserBody),
    );
  }

  @Delete(':teamId')
  @OperationName(TeamOperations.DELETE_TEAM)
  @UseGuards(TeamAccessGuard)
  async deleteUserTeam(
    @UserIdFromToken() userId: SingleTeamPayloadDto['userId'],
    @Param('teamId') teamId: SingleTeamPayloadDto['teamId'],
  ) {
    return Operation.processor(
      await this.userTeamService.deleteUserTeam({ teamId, userId }),
    );
  }
}
