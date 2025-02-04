import { CreateSpaceRoleBodyDto } from './create-space-role.dto';
import { SpaceRolesPayloadDto } from './payload.dto';

export type SpaceRolesDto = {
  CreateSpaceRoleBody: CreateSpaceRoleBodyDto;
  SpaceRolePayload: SpaceRolesPayloadDto;
};
