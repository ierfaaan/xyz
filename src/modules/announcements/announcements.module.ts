import { Module } from '@nestjs/common';
import { AnnouncementsService } from './service/announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaService } from 'src/common/services';

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService, PrismaService],
})
export class AnnouncementsModule {}
