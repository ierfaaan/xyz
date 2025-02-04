import { Controller, Get, Param } from '@nestjs/common';
import { Operation } from 'src/common/utils/opration';
import { UserProfileService } from './user-profile.service';
import { UserProfilePayloadDto } from './dto/paylod.dto';

@Controller('users')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Get(':userId')
  async findUserProfile(@Param() { userId }: UserProfilePayloadDto) {
    //TODO: who can use this service
    return Operation.processor(
      await this.userProfileService.findUserProfile({ userId }),
    );
  }

  @Get(':userId/teams/:spaceId')
  async findUserTeams(@Param() { userId, spaceId }: UserProfilePayloadDto) {
    return Operation.processor(
      await this.userProfileService.findUserTeams({ userId, spaceId }),
    );
  }
}
