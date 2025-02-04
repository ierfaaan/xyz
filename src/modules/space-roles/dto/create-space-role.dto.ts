export class CreateSpaceRoleBodyDto {
  name: string;
  spaceActionsId: number[];
  parentRoleId?: number;
  description?: string;
}
