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
import { UserSubTeamService } from './userSubTeam.service';
import { OperationName } from 'src/common/decorators/operation.decorator';
import { TeamAccessGuard } from 'src/common/Guards/TeamAccessGuard';
import { TeamOperations } from 'src/common/constants/operations';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';
import { CommonUserSubTeamPayloadDto } from './dto/common';
import { Operation } from 'src/common/utils/opration';
import { CreateOrEditSubTeamPayloadDto } from './dto/createOrEditSubteam.dto';

@Controller('teams/:parentTeamId/subTeams')
export class UserSubTeamController {
  constructor(private readonly userSubTeamService: UserSubTeamService) {}

  @Get(':subTeamId')
  @OperationName(TeamOperations.READ_SUBTEAM)
  @UseGuards(TeamAccessGuard)
  async getUserSubTeam(
    @UserIdFromToken() userId: CommonUserSubTeamPayloadDto['userId'],
    @Param('subTeamId') subTeamId: CommonUserSubTeamPayloadDto['subTeamId'],
    @Param('parentTeamId')
    parentTeamId: CommonUserSubTeamPayloadDto['parentTeamId'],
  ) {
    return Operation.processor(
      await this.userSubTeamService.getUserSubTeam({
        subTeamId,
        userId,
        parentTeamId,
      }),
    );
  }

  @Get()
  @OperationName(TeamOperations.READ_SUBTEAM)
  @UseGuards(TeamAccessGuard)
  async getUserSubTeams(
    @UserIdFromToken() userId: CommonUserSubTeamPayloadDto['userId'],
    @Param('parentTeamId')
    parentTeamId: CommonUserSubTeamPayloadDto['parentTeamId'],
  ) {
    return Operation.processor(
      await this.userSubTeamService.getUserSubTeams({ parentTeamId, userId }),
    );
  }

  @Post()
  @OperationName(TeamOperations.READ_TEAM_MEMBER)
  @UseGuards(TeamAccessGuard)
  async createUserSubTeam(
    @UserIdFromToken() userId: CommonUserSubTeamPayloadDto['userId'],
    @Param('parentTeamId')
    parentTeamId: CommonUserSubTeamPayloadDto['parentTeamId'],
    @Body() createSubteamBody: CreateOrEditSubTeamPayloadDto,
  ) {
    return Operation.processor(
      await this.userSubTeamService.createUserSubTeam(
        { parentTeamId, userId },
        createSubteamBody,
      ),
    );
  }

  @Put(':subTeamId')
  @OperationName(TeamOperations.READ_TEAM_MEMBER)
  @UseGuards(TeamAccessGuard)
  async editUserSubTeam(
    @UserIdFromToken() userId: CommonUserSubTeamPayloadDto['userId'],
    @Param('subTeamId') subTeamId: CommonUserSubTeamPayloadDto['subTeamId'],
    @Param('parentTeamId')
    parentTeamId: CommonUserSubTeamPayloadDto['parentTeamId'],
    @Body() editSubteamBody: CreateOrEditSubTeamPayloadDto,
  ) {
    return Operation.processor(
      await this.userSubTeamService.editUserSubTeam(
        {
          subTeamId,
          userId,
          parentTeamId,
        },
        editSubteamBody,
      ),
    );
  }

  @Delete(':subTeamId')
  @OperationName(TeamOperations.READ_TEAM_MEMBER)
  @UseGuards(TeamAccessGuard)
  async deleteUserSubTeam(
    @UserIdFromToken() userId: CommonUserSubTeamPayloadDto['userId'],
    @Param('subTeamId') subTeamId: CommonUserSubTeamPayloadDto['subTeamId'],
    @Param('parentTeamId')
    parentTeamId: CommonUserSubTeamPayloadDto['parentTeamId'],
  ) {
    return Operation.processor(
      await this.userSubTeamService.deleteUserSubTeam({
        subTeamId,
        userId,
        parentTeamId,
      }),
    );
  }
}
