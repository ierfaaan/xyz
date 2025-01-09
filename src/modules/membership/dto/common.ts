import {
  ProjectOperations,
  TeamOperations,
} from 'src/common/constants/operations';
import { TUserIdFromToken } from 'src/common/types/userId';

export class CommonMembershipPayloadDto {
  userId: TUserIdFromToken;
  teamId: string;
}

export class CommonAddOrEditMembershipPayloadDto<IsTeam extends boolean> {
  managerUsername?: string;
  username: string;
  roleName: string;
  accessList: IsTeam extends true
    ? (typeof TeamOperations)[]
    : ProjectOperations[];
}
