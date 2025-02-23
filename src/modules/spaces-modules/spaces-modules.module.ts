import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { SpacesModulesController } from './spaces-modules.controller';
import { SpacesModulesService } from './services/spaces-modules.service';

@Module({
  controllers: [SpacesModulesController],
  providers: [SpacesModulesService, PrismaService],
})
export class SpacesModulesModule {}
