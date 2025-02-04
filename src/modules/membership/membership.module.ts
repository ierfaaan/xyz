import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { UserSpaceService } from '../user-space/space.service';

@Module({
  controllers: [MembershipController],
  imports: [],
  providers: [PrismaService, UserSpaceService, MembershipService],
})
export class MembershipModule {}
