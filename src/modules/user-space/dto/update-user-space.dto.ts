import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSpaceBodyDto } from './create-user-space.dto';

export class UpdateUserSpaceBodyDto extends PartialType(
  CreateUserSpaceBodyDto,
) {}
