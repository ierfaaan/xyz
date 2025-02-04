import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Operation } from 'src/common/utils/opration';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserSpaceService } from './space.service';
import { UserSpaceDto } from './dto';
import { UserSpaceQueryParams } from './dto/payload.dto';

@Controller('spaces')
@UseGuards(JwtAuthGuard)
export class UserSpaceController {
  constructor(private readonly userTeamService: UserSpaceService) {}
  @Get(':spaceId')
  async findSpace(
    @UserIdFromToken() userId: UserSpaceDto['SpacePayload']['userId'],
    @Param('spaceId') spaceId: UserSpaceDto['SpacePayload']['spaceId'],
  ) {
    return Operation.processor(
      await this.userTeamService.findUserSpace({
        spaceId,
        userId,
      }),
    );
  }

  @Get('/related/:spaceId')
  async findSpaceRelated(
    @UserIdFromToken() userId: UserSpaceDto['SpacePayload']['userId'],
    @Param('spaceId') spaceId: UserSpaceDto['SpacePayload']['spaceId'],
    @Query('usersTeamsOnly', ParseBoolPipe)
    usersTeamsOnly: UserSpaceQueryParams['usersTeamsOnly'],
  ) {
    return Operation.processor(
      await this.userTeamService.findSpaceRelated(
        userId,
        spaceId,
        usersTeamsOnly,
      ),
    );
  }

  @Get('')
  async findAllSpace(
    @UserIdFromToken() userId: UserSpaceDto['SpacePayload']['userId'],
  ) {
    return Operation.processor(await this.userTeamService.findAllSpace(userId));
  }

  @Post()
  async createUserSpace(
    @UserIdFromToken() userId: UserSpaceDto['SpacePayload']['userId'],
    @Body() createUserBody: UserSpaceDto['CreateUserSpaceBody'],
  ) {
    return Operation.processor(
      await this.userTeamService.createUserSpace(userId, createUserBody),
    );
  }

  @Put(':spaceId')
  async updateUserSpace(
    @UserIdFromToken() userId: UserSpaceDto['SpacePayload']['userId'],
    @Param('spaceId') spaceId: UserSpaceDto['SpacePayload']['spaceId'],
    @Body() updateUserBody: UserSpaceDto['UpdateUserSpaceBody'],
  ) {
    return Operation.processor(
      await this.userTeamService.updateUserSpace(
        { spaceId, userId },
        updateUserBody,
      ),
    );
  }

  @Delete(':spaceId')
  async deleteUserSpace(
    @UserIdFromToken() userId: UserSpaceDto['SpacePayload']['userId'],
    @Param('spaceId') spaceId: UserSpaceDto['SpacePayload']['spaceId'],
  ) {
    return Operation.processor(
      await this.userTeamService.deleteUserSpace({ spaceId, userId }),
    );
  }
}
