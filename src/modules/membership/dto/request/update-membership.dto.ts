import { PartialType } from '@nestjs/mapped-types';
import { AddMembershipBodyDto } from './add-membership.dto';

export class UpdateMembershipBodyDto extends PartialType(
  AddMembershipBodyDto,
) {}
