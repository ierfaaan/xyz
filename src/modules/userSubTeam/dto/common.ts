import { TUserIdFromToken } from 'src/common/types/userId';

export class CommonUserSubTeamPayloadDto {
  userId: TUserIdFromToken;
  parentTeamId: string;
  subTeamId: string;
}
