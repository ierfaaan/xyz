import { TUserIdFromToken } from 'src/common/types/userId';

export class MembershipPayloadDto {
  userId: TUserIdFromToken;
  spaceId: string;
}
