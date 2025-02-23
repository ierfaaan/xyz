import { $Enums } from '@prisma/client';

export interface CreateSpacesModulePropsType {
  title: string;
  spaceId: number;
  userId: number;
  moduleType: $Enums.ModuleType;
}

export interface FindAllSpacesModulesPropsType {
  spaceId: number;
  userId: number;
}
