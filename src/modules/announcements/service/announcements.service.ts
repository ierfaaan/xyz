import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { Operation } from 'src/common/utils/opration';
import {
  CreateSpaceAnnouncementPropsType,
  FindAllSpaceAnnouncementPropsType,
  RemoveAnnouncementPropsType,
} from './announcements.type';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly prismaService: PrismaService) {}
  async createSpaceAnnouncement({
    expirationDate,
    title,
    spaceId,
    content,
  }: CreateSpaceAnnouncementPropsType) {
    await this.prismaService.announcements.create({
      data: {
        spaceId: Number(spaceId),
        title,
        expirationDate: expirationDate,
        content: content,
      },
    });
    return Operation.success({
      message: 'Space announcement has been created successfully!',
    });
  }

  async findAllSpaceAnnouncement({
    spaceId,
  }: FindAllSpaceAnnouncementPropsType) {
    const result = await this.prismaService.announcements.findMany({
      where: {
        spaceId: Number(spaceId),
      },
    });

    if (!result)
      return Operation.notFoundError({
        message: 'Space Announcement not found!',
      });

    return Operation.success({
      result,
      message: 'Space announcement has been received successfully!',
    });
  }

  async removeAnnouncement({ announcementId }: RemoveAnnouncementPropsType) {
    await this.prismaService.announcements.delete({
      where: {
        id: Number(announcementId),
      },
    });
    return Operation.success({
      message: 'Space announcement has been deleted successfully!',
    });
  }
}
