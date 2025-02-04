import { TUserIdFromToken } from 'src/common/types/userId';
import { AnnouncementUrlParams } from '../dto/announcementPayload.dto';
import { CreateAnnouncementBodyDto } from '../dto/create-announcement.dto';

export type CreateSpaceAnnouncementPropsType = CreateAnnouncementBodyDto &
  Omit<AnnouncementUrlParams, 'announcementId'> & {
    userId: TUserIdFromToken;
  };

export type FindAllSpaceAnnouncementPropsType = Omit<
  AnnouncementUrlParams,
  'announcementId'
> & {
  userId: TUserIdFromToken;
};

export type RemoveAnnouncementPropsType = Omit<
  AnnouncementUrlParams,
  'spaceId'
>;
