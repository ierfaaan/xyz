import { $Enums } from '@prisma/client';

export class CreateSpacesModuleDto {
  title: string;
  moduleType: $Enums.ModuleType;
}
