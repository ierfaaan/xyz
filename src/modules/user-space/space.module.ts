import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { UserSpaceController } from './space.controller';
import { UserSpaceService } from './space.service';

@Module({
  controllers: [UserSpaceController],
  imports: [],
  providers: [PrismaService, UserSpaceService],
})
export class UserSpaceModule {}
