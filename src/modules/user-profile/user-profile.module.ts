import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { PrismaService } from 'src/common/services';
import { UserSpaceService } from '../user-space/space.service';

@Module({
  controllers: [UserProfileController],
  providers: [PrismaService, UserProfileService, UserSpaceService],
})
export class UserProfileModule {}
