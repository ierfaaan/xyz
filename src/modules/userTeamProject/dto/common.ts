import { TUserIdFromToken } from 'src/common/types/userId';

export class SingleProjectPayloadDto {
  projectId: string;
  userId: TUserIdFromToken;
  teamId: string;
}
