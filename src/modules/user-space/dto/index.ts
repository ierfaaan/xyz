import { CreateUserSpaceBodyDto } from './create-user-space.dto';
import { UserSpacePayloadDto } from './payload.dto';
import { UpdateUserSpaceBodyDto } from './update-user-space.dto';

export type UserSpaceDto = {
  CreateUserSpaceBody: CreateUserSpaceBodyDto;
  UpdateUserSpaceBody: UpdateUserSpaceBodyDto;
  SpacePayload: UserSpacePayloadDto;
};
