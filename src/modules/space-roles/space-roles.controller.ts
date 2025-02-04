import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';
import { SpaceRolesService } from './space-roles.service';
import { Operation } from 'src/common/utils/opration';
import { SpaceRolesDto } from './dto';

@Controller('/spaces/:spaceId/roles')
@UseGuards(JwtAuthGuard)
export class TeamRolesController {
  constructor(private readonly spaceRolesService: SpaceRolesService) {}

  @Get(':roleId')
  async findSpaceRole(
    @UserIdFromToken() userId: SpaceRolesDto['SpaceRolePayload']['userId'],
    @Param('spaceId') spaceId: SpaceRolesDto['SpaceRolePayload']['spaceId'],
    @Param('roleId') roleId: SpaceRolesDto['SpaceRolePayload']['roleId'],
  ) {
    return Operation.processor(
      await this.spaceRolesService.findSpaceRole({
        userId,
        roleId,
        spaceId,
      }),
    );
  }

  @Get()
  async getTeamRoles(
    @UserIdFromToken() userId: SpaceRolesDto['SpaceRolePayload']['userId'],
    @Param('spaceId') spaceId: SpaceRolesDto['SpaceRolePayload']['spaceId'],
  ) {
    return Operation.processor(
      await this.spaceRolesService.findAllSpaceRoles({
        userId,
        spaceId,
      }),
    );
  }

  @Post()
  async createTeamRoles(
    @UserIdFromToken() userId: SpaceRolesDto['SpaceRolePayload']['userId'],
    @Param('spaceId') spaceId: SpaceRolesDto['SpaceRolePayload']['spaceId'],
    @Body() body: SpaceRolesDto['CreateSpaceRoleBody'],
  ) {
    return Operation.processor(
      await this.spaceRolesService.createSpaceRole({ spaceId, userId }, body),
    );
  }
}
