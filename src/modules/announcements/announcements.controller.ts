import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AnnouncementsService } from './service/announcements.service';
import { CreateAnnouncementBodyDto } from './dto/create-announcement.dto';
import { AnnouncementUrlParams } from './dto/announcementPayload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';
import { TUserIdFromToken } from 'src/common/types/userId';

@Controller('spaces/:spaceId/announcements')
@UseGuards(JwtAuthGuard)
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  createSpaceAnnouncement(
    @UserIdFromToken() userId: TUserIdFromToken,
    @Param('spaceId') spaceId: AnnouncementUrlParams['spaceId'],
    @Body() createAnnouncementDto: CreateAnnouncementBodyDto,
  ) {
    return this.announcementsService.createSpaceAnnouncement({
      spaceId: spaceId,
      userId,
      ...createAnnouncementDto,
    });
  }

  @Get()
  findAllSpaceAnnouncement(
    @UserIdFromToken() userId: TUserIdFromToken,
    @Param('spaceId') spaceId: AnnouncementUrlParams['spaceId'],
  ) {
    return this.announcementsService.findAllSpaceAnnouncement({
      spaceId,
      userId,
    });
  }

  @Delete(':announcementId')
  removeAnnouncement(
    @Param('announcementId')
    announcementId: AnnouncementUrlParams['announcementId'],
  ) {
    return this.announcementsService.removeAnnouncement({ announcementId });
  }
}
