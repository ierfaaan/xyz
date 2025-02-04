import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { SpaceRolesService } from './space-roles.service';
import { TeamRolesController } from './space-roles.controller';
import { UserSpaceService } from '../user-space/space.service';

@Module({
  controllers: [TeamRolesController],
  imports: [],
  providers: [PrismaService, UserSpaceService, SpaceRolesService],
})
export class SpaceRolesModule {}
