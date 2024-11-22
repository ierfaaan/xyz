import { Module } from '@nestjs/common';
import { UserTeamProjectController } from './userTeamProject.controller';
import { UserTeamProjectService } from './userTeamProject.service';
import { PrismaService } from 'src/common/services';

@Module({
  controllers: [UserTeamProjectController],
  imports: [],
  providers: [PrismaService, UserTeamProjectService],
})
export class UserTeamProjectModule {}
