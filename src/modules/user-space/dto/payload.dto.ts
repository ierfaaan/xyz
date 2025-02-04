import { TUserIdFromToken } from 'src/common/types/userId';

export interface UserSpacePayloadDto {
  spaceId: string;
  userId: TUserIdFromToken;
}

export interface UserSpaceQueryParams {
  usersTeamsOnly: boolean;
}
