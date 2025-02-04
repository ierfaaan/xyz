import { TUserIdFromToken } from 'src/common/types/userId';

export class UserProfilePayloadDto {
  userId: TUserIdFromToken;
  spaceId?: number;
}
