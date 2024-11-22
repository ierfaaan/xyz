import {
  ProjectOperations,
  TeamOperations,
} from 'src/common/constants/operations';
import { TUserIdFromToken } from 'src/common/types/userId';

export class CommonMembershipPayloadDto {
  userId: TUserIdFromToken;
  memberId: string;
  teamId?: string;
  projectId?: string;
}

export class CommonAddOrEditMembershipPayloadDto<IsTeam extends boolean> {
  role: string;
  accessList: IsTeam extends true ? TeamOperations[] : ProjectOperations[];
}
