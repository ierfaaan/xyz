import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';

@Module({
  controllers: [MembershipController],
  imports: [],
  providers: [PrismaService, MembershipService],
})
export class MembershipModule {}
