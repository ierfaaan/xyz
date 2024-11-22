import { Prisma, Project } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrEditUserProjectPayloadDto
  implements Prisma.ProjectCreateInput
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  logo?: string;

  @IsString()
  banner?: string;

  @IsString()
  manifesto?: string;

  @IsString()
  slogan?: string;
}

export type CreateUserOrEditProjectResponseDto = Project;
