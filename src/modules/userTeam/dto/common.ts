import { TUserIdFromToken } from 'src/common/types/userId';

export class SingleTeamPayloadDto {
  teamId: string;
  userId: TUserIdFromToken;
}
