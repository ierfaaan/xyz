import { Module } from '@nestjs/common';
import { UserTeamController } from './userTeam.controller';
import { UserTeamService } from './userTeam.service';
import { PrismaService } from 'src/common/services';

@Module({
  controllers: [UserTeamController],
  imports: [],
  providers: [PrismaService, UserTeamService],
})
export class UserTeamModule {}
