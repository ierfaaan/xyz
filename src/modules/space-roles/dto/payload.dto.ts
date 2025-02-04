import { TUserIdFromToken } from 'src/common/types/userId';

export class SpaceRolesPayloadDto {
  spaceId: string;
  roleId?: string;
  userId: TUserIdFromToken;
}
