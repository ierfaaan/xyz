export const TeamOperations = {
  CREATE_SUBTEAM: 'SUBTEAM_CREATE',
  READ_SUBTEAM: 'READ_SUBTEAM',
  READ_SUBTEAM_DETAILS: 'READ_SUBTEAM_DETAILS',
  EDIT_SUBTEAM: 'EDIT_SUBTEAM',
  DELETE_SUBTEAM: 'DELETE_SUBTEAM',

  EDIT_TEAM: 'EDIT_TEAM',
  DELETE_TEAM: 'DELETE_TEAM',

  DELETE_TEAM_MEMBER: 'DELETE_TEAM_MEMBER',
  READ_TEAM_MEMBER: 'READ_TEAM_MEMBER',
  ADD_TEAM_MEMBER: 'ADD_MEMBER',

  CREATE_PROJECT: 'CREATE_PROJECT',
  EDIT_PROJECT: 'EDIT_PROJECT',
  READ_PROJECT: 'READ_PROJECT',
  READ_PROJECT_DETAILS: 'READ_PROJECT_DETAILS',
  DELETE_PROJECT: 'DELETE_PROJECT',

  ADD_PROJECT_MEMBER: 'ADD_MEMBER_TO_PROJECT',
  DELETE_PROJECT_MEMBER: 'DELETE_PROJECT_MEMBER',
  READ_PROJECT_MEMBER: 'READ_PROJECT_MEMBER',
};

export enum ProjectOperations {
  EDIT_PROJECT = 'EDIT_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',

  DELETE_PROJECT_MEMBER = 'DELETE_PROJECT_MEMBER',
  READ_PROJECT_MEMBER = 'READ_PROJECT_MEMBER',
  ADD_PROJECT_MEMBER = 'ADD_MEMBER',
}
