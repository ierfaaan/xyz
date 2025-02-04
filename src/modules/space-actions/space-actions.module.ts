import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { SpaceActionsController } from './space-actions.controller';
import { SpaceActionsService } from './space-actions.service';

@Module({
  controllers: [SpaceActionsController],
  providers: [PrismaService, SpaceActionsService],
})
export class SpaceActionsModule {}
