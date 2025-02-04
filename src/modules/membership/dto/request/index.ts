import { AddMembershipBodyDto } from './add-membership.dto';
import { MembershipPayloadDto } from './payload.dto';
import { UpdateMembershipBodyDto } from './update-membership.dto';

export interface RequestDto {
  AddMembershipBody: AddMembershipBodyDto;
  UpdateMembershipBody: UpdateMembershipBodyDto;
  Payload: MembershipPayloadDto;
}
