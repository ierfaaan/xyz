import { TeamOperations } from './operations';

export const TEAM_OWNER = Object.values(TeamOperations);

export const DEFAULT_TEAM_ROLE = {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER',
};

export const DEFAULT_RPOJECT_ROLE = {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER',
};

export const DEFAULT_TEAM_ROLL_ACCESS = {
  [DEFAULT_TEAM_ROLE.OWNER]: TEAM_OWNER,
};

export const DEFAULT_PROJECT_ROLL_ACCESS = {
  [DEFAULT_RPOJECT_ROLE.OWNER]: [],
};

export const DEFAULT_ROLES_ID = {
  members: -2,
  founder: -1,
};
